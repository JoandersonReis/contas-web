import React, { useEffect, useState } from "react";

import type { User, Folder, Entry } from "../types";
import { createContext, useContext } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import { api, ApiError } from "../services/api";
function useAccountsState() {
  const navigate = useNavigate();
  const match = useMatch("/contas/:id");
  const selected = match?.params.id ?? null;
  const setSelected = (id: string | null) =>
    navigate(id ? `/contas/${id}` : "/contas");
  const [user, setUser] = useState<User | null>(null),
    [initial, setInitial] = useState(true),
    [initialError, setInitialError] = useState("");
  const [folders, setFolders] = useState<Folder[]>([]),
    [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [notice, setNotice] = useState("");
  const [modal, setModal] = useState<{
    kind: "folder" | "entry";
    folder?: Folder;
    entry?: Entry;
  } | null>(null);
  const [deletion, setDeletion] = useState<{
      folder: Folder;
      entry?: Entry;
    } | null>(null),
    [busy, setBusy] = useState(false);
  async function restore() {
    setInitial(true);
    setInitialError("");
    try {
      setUser(await api<User>("/auth/me"));
    } catch (e) {
      if (!(e instanceof ApiError && e.status === 401))
        setInitialError((e as Error).message);
    } finally {
      setInitial(false);
    }
  }
  useEffect(() => {
    void restore();
  }, []);
  async function load() {
    setLoading(true);
    try {
      setFolders(await api<Folder[]>("/folders"));
      setError("");
    } catch (e) {
      handleError(e);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (user) void load();
  }, [user?.id]);
  useEffect(() => {
    if (notice) {
      const timer = setTimeout(() => setNotice(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [notice]);
  function handleError(e: unknown) {
    if (e instanceof ApiError && e.status === 401) {
      setUser(null);
      setFolders([]);
      setSelected(null);
      setModal(null);
      setDeletion(null);
    }
    setError((e as Error).message);
  }
  async function logout() {
    setBusy(true);
    try {
      await api("/auth/logout", "POST");
      setUser(null);
      setFolders([]);
      setSelected(null);
    } catch (e) {
      handleError(e);
    } finally {
      setBusy(false);
    }
  }
  const active = folders.find((f) => f.id === selected);
  const budget = folders.reduce((s, f) => s + f.budgetCents, 0),
    spent = folders.reduce((s, f) => s + f.spentCents, 0);
  const filtered = folders.filter((f) =>
    f.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  );
  return {
    user,
    setUser,
    initial,
    initialError,
    restore,
    folders,
    active,
    budget,
    spent,
    filtered,
    search,
    setSearch,
    loading,
    error,
    notice,
    modal,
    setModal,
    deletion,
    setDeletion,
    busy,
    setBusy,
    load,
    logout,
    handleError,
    setSelected,
    setNotice,
  };
}
const AccountsContext = createContext<ReturnType<
  typeof useAccountsState
> | null>(null);
export function AccountsProvider({ children }: { children: React.ReactNode }) {
  const state = useAccountsState();
  return (
    <AccountsContext.Provider value={state}>
      {children}
    </AccountsContext.Provider>
  );
}
export function useAccounts() {
  const state = useContext(AccountsContext);
  if (!state) throw new Error("AccountsProvider ausente");
  return state;
}

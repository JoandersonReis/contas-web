import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronRight,
  FolderOpen,
  LayoutGrid,
  LogOut,
  Plus,
  Search,
  Wallet,
  X,
  Pencil,
  Trash2,
  Leaf,
  ArrowLeft,
} from "lucide-react";
import "./style.css";
import { ThemeToggle } from "./theme";
type User = { id: string; name: string; email: string };
type Entry = {
  id: string;
  description: string;
  amountCents: number;
  date: string;
};
type Folder = {
  id: string;
  name: string;
  budgetCents: number;
  spentCents: number;
  entries: Entry[];
};
const money = (cents: number) =>
  (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const today = () => new Date().toLocaleDateString("en-CA");
class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}
async function api<T>(
  path: string,
  method = "GET",
  body?: unknown,
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(
      `${(import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "")}${path}`,
      {
        method,
        credentials: "include",
        headers: body ? { "Content-Type": "application/json" } : undefined,
        body: body ? JSON.stringify(body) : undefined,
      },
    );
  } catch {
    throw new Error(
      "Não foi possível conectar. Verifique sua conexão e tente novamente.",
    );
  }
  const data = await response.json().catch(() => ({
    message: "O servidor está indisponível. Tente novamente.",
  }));
  if (!response.ok)
    throw new ApiError(
      Array.isArray(data.message)
        ? "Confira os campos informados."
        : data.message || "Não foi possível concluir a operação.",
      response.status,
    );
  return data;
}
function App() {
  const [user, setUser] = useState<User | null>(null),
    [initial, setInitial] = useState(true),
    [initialError, setInitialError] = useState("");
  const [folders, setFolders] = useState<Folder[]>([]),
    [selected, setSelected] = useState<string | null>(null),
    [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false),
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
  if (initial)
    return (
      <div className="splash">
        <Wallet size={40} />
        <p>Organizando seu espaço…</p>
      </div>
    );
  if (initialError)
    return (
      <div className="splash">
        <p role="alert">{initialError}</p>
        <button className="primary" onClick={() => void restore()}>
          Tentar novamente
        </button>
      </div>
    );
  if (!user)
    return (
      <Auth
        onLogin={(u) => {
          setError("");
          setUser(u);
        }}
      />
    );
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a
          href="#"
          className="brand"
          onClick={(e) => {
            e.preventDefault();
            setSelected(null);
          }}
        >
          <span className="brand-icon">
            <Wallet size={23} />
          </span>
          contas<span className="brand-dot">.</span>
        </a>
        <span className="nav-label">SEU ESPAÇO</span>
        <button
          className="nav-item active"
          onClick={() => {
            setSelected(null);
            setSearch("");
          }}
        >
          <LayoutGrid size={19} />
          Minhas contas
          <ChevronRight size={16} />
        </button>
        <div className="sidebar-note">
          <Leaf size={24} />
          <h3>Um passo de cada vez.</h3>
          <p>
            Organizar suas contas é o começo de uma vida financeira mais
            tranquila.
          </p>
        </div>
        <div className="profile">
          <span className="avatar">{user.name.charAt(0).toUpperCase()}</span>
          <div>
            <strong>{user.name}</strong>
            <span>Meu espaço pessoal</span>
          </div>
          <button
            className="icon-btn"
            title="Sair"
            aria-label="Sair"
            disabled={busy}
            onClick={() => void logout()}
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>
      <main>
        <header className="topbar">
          <span>
            Meu espaço <ChevronRight size={13} /> Contas{" "}
            {active && (
              <>
                <ChevronRight size={13} />
                <b>{active.name}</b>
              </>
            )}
          </span>
          <div className="topbar-actions">
            <span className="today">
              {new Date().toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <ThemeToggle />
          </div>
        </header>
        <div className="content">
          <div className="page-heading">
            <div>
              <span className="eyebrow">FINANÇAS COM CLAREZA</span>
              <h1>{active ? active.name : "Suas contas, em ordem."}</h1>
              <p>
                {active
                  ? "Cada gasto tem seu lugar. Acompanhe os detalhes desta conta."
                  : "Uma visão simples do que você planejou e do que já gastou."}
              </p>
            </div>
            <button
              className="primary"
              disabled={loading}
              onClick={() =>
                setModal(
                  active
                    ? { kind: "entry", folder: active }
                    : { kind: "folder" },
                )
              }
            >
              <Plus size={18} />
              {active ? "Novo lançamento" : "Nova pasta"}
            </button>
          </div>
          {error && (
            <div className="error" role="alert">
              {error}
              <button onClick={() => void load()}>Tentar novamente</button>
            </div>
          )}
          <section className="stats" aria-label="Resumo das contas">
            <Stat
              label="Valor previsto"
              value={active?.budgetCents ?? budget}
              icon={<Wallet size={20} />}
              note={
                active
                  ? "Planejamento desta pasta"
                  : `${folders.length} pastas no seu planejamento`
              }
            />
            <Stat
              label="Total lançado"
              value={active?.spentCents ?? spent}
              icon={<ArrowUpRight size={20} />}
              note="Soma dos gastos registrados"
            />
            <Stat
              label="Saldo do planejamento"
              value={
                (active?.budgetCents ?? budget) - (active?.spentCents ?? spent)
              }
              icon={<ArrowDownLeft size={20} />}
              note="Valor previsto menos os lançamentos"
              accent
            />
          </section>
          {active ? (
            <>
              <div className="section-heading">
                <button className="back" onClick={() => setSelected(null)}>
                  <ArrowLeft size={17} />
                  Todas as pastas
                </button>
                <div className="actions">
                  <button
                    className="secondary"
                    onClick={() => setModal({ kind: "folder", folder: active })}
                  >
                    <Pencil size={15} />
                    Editar pasta
                  </button>
                  <button
                    className="icon-btn danger"
                    title="Excluir pasta"
                    aria-label="Excluir pasta"
                    onClick={() => setDeletion({ folder: active })}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <section className="entries">
                <div className="entries-title">
                  <div>
                    <h2>Lançamentos</h2>
                    <p>{active.entries.length} registros nesta pasta</p>
                  </div>
                  <span
                    className={`badge ${active.spentCents > active.budgetCents ? "over" : ""}`}
                  >
                    {active.spentCents > active.budgetCents
                      ? "Acima do previsto"
                      : active.spentCents === active.budgetCents
                        ? "Valor atingido"
                        : "Dentro do previsto"}
                  </span>
                </div>
                <div className="progress wide">
                  <span
                    style={{
                      width: `${Math.min(100, (active.spentCents / active.budgetCents) * 100)}%`,
                    }}
                  />
                </div>
                {active.entries.length ? (
                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr>
                          <th>Descrição</th>
                          <th>Data</th>
                          <th>Valor</th>
                          <th>
                            <span className="sr-only">Ações</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...active.entries]
                          .sort((a, b) => b.date.localeCompare(a.date))
                          .map((entry) => (
                            <tr key={entry.id}>
                              <td>
                                <span className="entry-icon">
                                  <ArrowUpRight size={15} />
                                </span>
                                {entry.description}
                              </td>
                              <td data-label="Data">
                                {new Date(
                                  `${entry.date}T12:00:00`,
                                ).toLocaleDateString("pt-BR")}
                              </td>
                              <td className="amount" data-label="Valor">
                                {money(entry.amountCents)}
                              </td>
                              <td>
                                <div className="actions">
                                  <button
                                    className="icon-btn"
                                    aria-label={`Editar ${entry.description}`}
                                    onClick={() =>
                                      setModal({
                                        kind: "entry",
                                        folder: active,
                                        entry,
                                      })
                                    }
                                  >
                                    <Pencil size={16} />
                                  </button>
                                  <button
                                    className="icon-btn danger"
                                    aria-label={`Excluir ${entry.description}`}
                                    onClick={() =>
                                      setDeletion({ folder: active, entry })
                                    }
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <Empty
                    title="Pronto para o primeiro lançamento"
                    text="Registre cada compra aqui para acompanhar o total desta conta."
                    action="Adicionar lançamento"
                    onClick={() => setModal({ kind: "entry", folder: active })}
                  />
                )}
              </section>
            </>
          ) : (
            <>
              <div className="section-heading">
                <div>
                  <h2>
                    Minhas pastas{" "}
                    <span className="count">{folders.length}</span>
                  </h2>
                  <p>Agrupe seus gastos e acompanhe cada conta.</p>
                </div>
                <label className="search">
                  <Search size={18} />
                  <input
                    aria-label="Buscar pasta"
                    placeholder="Buscar pasta…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </label>
              </div>
              {loading ? (
                <div className="empty" role="status">
                  Carregando suas contas…
                </div>
              ) : filtered.length ? (
                <div className="folder-grid">
                  {filtered.map((folder, index) => (
                    <button
                      className="folder-card"
                      key={folder.id}
                      onClick={() => setSelected(folder.id)}
                    >
                      <div className="folder-top">
                        <span className={`folder-icon color-${index % 4}`}>
                          <FolderOpen size={25} />
                        </span>
                        <ChevronRight size={18} />
                      </div>
                      <h3>{folder.name}</h3>
                      <p>
                        {folder.entries.length}{" "}
                        {folder.entries.length === 1
                          ? "lançamento"
                          : "lançamentos"}
                      </p>
                      <div className="folder-values">
                        <strong>{money(folder.spentCents)}</strong>
                        <span>de {money(folder.budgetCents)}</span>
                      </div>
                      <div
                        className={`progress ${folder.spentCents > folder.budgetCents ? "over" : ""}`}
                      >
                        <span
                          style={{
                            width: `${Math.min(100, (folder.spentCents / folder.budgetCents) * 100)}%`,
                          }}
                        />
                      </div>
                      <div className="folder-foot">
                        <span>
                          {folder.spentCents > folder.budgetCents
                            ? "Acima do previsto"
                            : "Restante"}
                        </span>
                        <b>
                          {money(
                            Math.abs(folder.budgetCents - folder.spentCents),
                          )}
                        </b>
                      </div>
                    </button>
                  ))}
                  <button
                    className="add-card"
                    onClick={() => setModal({ kind: "folder" })}
                  >
                    <span>
                      <Plus size={24} />
                    </span>
                    <strong>Criar uma nova pasta</strong>
                    <p>Um lugar para cada conta</p>
                  </button>
                </div>
              ) : (
                <Empty
                  title={
                    search
                      ? "Nenhuma pasta encontrada"
                      : "Vamos organizar sua primeira conta?"
                  }
                  text={
                    search
                      ? "Experimente buscar por outro nome."
                      : "Crie uma pasta como “Mercado”, defina R$ 600 e registre suas compras aos poucos."
                  }
                  action={
                    search ? "Limpar busca" : "Criar minha primeira pasta"
                  }
                  onClick={() =>
                    search ? setSearch("") : setModal({ kind: "folder" })
                  }
                />
              )}
              <div className="tip">
                <span>
                  <Leaf size={20} />
                </span>
                <p>
                  <strong>Pequenos registros, grandes mudanças.</strong>{" "}
                  Registre seus gastos ao longo do dia e veja seu planejamento
                  ganhar forma.
                </p>
              </div>
            </>
          )}
          <footer>
            Feito para trazer mais tranquilidade às suas finanças.
          </footer>
        </div>
      </main>
      {notice && (
        <div className="toast" role="status">
          {notice}
        </div>
      )}
      {modal && (
        <Editor
          modal={modal}
          close={() => setModal(null)}
          save={async (data) => {
            const path =
              modal.kind === "folder"
                ? `/folders${modal.folder ? `/${modal.folder.id}` : ""}`
                : `/folders/${modal.folder!.id}/entries${modal.entry ? `/${modal.entry.id}` : ""}`;
            await api(
              path,
              (modal.kind === "folder" ? modal.folder : modal.entry)
                ? "PUT"
                : "POST",
              data,
            );
            setModal(null);
            setNotice("Salvo com sucesso.");
            await load();
          }}
        />
      )}
      {deletion && (
        <Modal
          title={deletion.entry ? "Excluir lançamento?" : "Excluir pasta?"}
          close={() => !busy && setDeletion(null)}
        >
          <p className="modal-copy">
            {deletion.entry
              ? `O lançamento “${deletion.entry.description}” será removido.`
              : `A pasta “${deletion.folder.name}” e todos os seus lançamentos serão removidos.`}{" "}
            Essa ação não pode ser desfeita.
          </p>
          <div className="form-actions">
            <button
              className="secondary"
              disabled={busy}
              onClick={() => setDeletion(null)}
            >
              Cancelar
            </button>
            <button
              className="delete-btn"
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                try {
                  await api(
                    `/folders/${deletion.folder.id}${deletion.entry ? `/entries/${deletion.entry.id}` : ""}`,
                    "DELETE",
                  );
                  if (!deletion.entry) setSelected(null);
                  setDeletion(null);
                  setNotice("Excluído com sucesso.");
                  await load();
                } catch (e) {
                  handleError(e);
                  setDeletion(null);
                } finally {
                  setBusy(false);
                }
              }}
            >
              {busy ? "Excluindo…" : "Sim, excluir"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
function Stat({
  label,
  value,
  icon,
  note,
  accent = false,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  note: string;
  accent?: boolean;
}) {
  return (
    <div className={`stat ${accent ? "accent" : ""}`}>
      <div className="stat-label">
        {label}
        {icon}
      </div>
      <strong>{money(value)}</strong>
      <p>{note}</p>
    </div>
  );
}
function Empty({
  title,
  text,
  action,
  onClick,
}: {
  title: string;
  text: string;
  action: string;
  onClick: () => void;
}) {
  return (
    <div className="empty">
      <span className="empty-icon">
        <FolderOpen size={32} />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
      <button className="primary" onClick={onClick}>
        <Plus size={17} />
        {action}
      </button>
    </div>
  );
}
function Modal({
  title,
  close,
  children,
}: {
  title: string;
  close: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current!;
    dialog.showModal();
    return () => dialog.close();
  }, []);
  return (
    <dialog
      ref={ref}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      aria-labelledby="modal-title"
    >
      <div className="modal-heading">
        <h2 id="modal-title">{title}</h2>
        <button className="icon-btn" aria-label="Fechar" onClick={close}>
          <X size={21} />
        </button>
      </div>
      {children}
    </dialog>
  );
}
function Editor({
  modal,
  close,
  save,
}: {
  modal: { kind: "folder" | "entry"; folder?: Folder; entry?: Entry };
  close: () => void;
  save: (data: unknown) => Promise<void>;
}) {
  const folder = modal.kind === "folder";
  const [name, setName] = useState(
    folder ? (modal.folder?.name ?? "") : (modal.entry?.description ?? ""),
  );
  const [amount, setAmount] = useState(
    ((folder ? modal.folder?.budgetCents : modal.entry?.amountCents) ?? 0)
      ? (
          (folder ? modal.folder?.budgetCents : modal.entry?.amountCents)! / 100
        ).toFixed(2)
      : "",
  );
  const [date, setDate] = useState(modal.entry?.date ?? today()),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  return (
    <Modal
      title={`${(folder ? modal.folder : modal.entry) ? "Editar" : folder ? "Nova" : "Novo"} ${folder ? "pasta" : "lançamento"}`}
      close={() => !busy && close()}
    >
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const cents = Math.round(Number(amount.replace(",", ".")) * 100);
          if (!Number.isSafeInteger(cents) || cents < 1 || cents > 1000000000) {
            setError("Informe um valor entre R$ 0,01 e R$ 10.000.000,00.");
            return;
          }
          setBusy(true);
          setError("");
          try {
            await save(
              folder
                ? { name: name.trim(), budgetCents: cents }
                : { description: name.trim(), amountCents: cents, date },
            );
          } catch (e) {
            setError((e as Error).message);
          } finally {
            setBusy(false);
          }
        }}
      >
        <p className="modal-copy">
          {folder
            ? "Dê um nome à sua conta e defina quanto pretende gastar."
            : `Adicione um gasto à pasta ${modal.folder?.name}.`}
        </p>
        <label>
          {folder ? "Nome da pasta" : "Descrição"}
          <input
            autoFocus
            required
            maxLength={folder ? 80 : 160}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={folder ? "Ex.: Mercado" : "Ex.: Compra da semana"}
          />
        </label>
        <label>
          {folder ? "Valor previsto (R$)" : "Valor do gasto (R$)"}
          <input
            required
            type="number"
            min="0.01"
            max="10000000"
            step="0.01"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0,00"
          />
        </label>
        {!folder && (
          <label>
            Data do gasto
            <input
              required
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
        )}
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <div className="form-actions">
          <button
            type="button"
            className="secondary"
            disabled={busy}
            onClick={close}
          >
            Cancelar
          </button>
          <button className="primary" disabled={busy}>
            {busy ? "Salvando…" : "Salvar"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
function Auth({ onLogin }: { onLogin: (user: User) => void }) {
  const [register, setRegister] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  return (
    <div className="auth-page">
      <section className="auth-story">
        <div className="brand">
          <span className="brand-icon">
            <Wallet size={23} />
          </span>
          contas.
        </div>
        <div>
          <span className="eyebrow">MAIS CLAREZA. MAIS TRANQUILIDADE.</span>
          <h1>
            Seu dinheiro.
            <br />
            Cada gasto.
            <br />
            <em>Tudo em seu lugar.</em>
          </h1>
          <p>
            Transforme pequenas anotações em uma visão clara das suas contas.
          </p>
          <div className="example-card">
            <div>
              <span className="folder-icon">
                <FolderOpen size={25} />
              </span>
              <strong>Mercado</strong>
              <span>Seu planejamento</span>
            </div>
            <h2>
              R$ 350,00 <small>/ R$ 600,00</small>
            </h2>
            <div className="progress">
              <span style={{ width: "58.3%" }} />
            </div>
            <p>3 idas ao mercado · R$ 250,00 restantes</p>
          </div>
          <small className="illustration-label">
            Exemplo de como você pode organizar suas contas
          </small>
        </div>
        <p className="auth-foot">
          Organização hoje. Mais possibilidades amanhã.
        </p>
      </section>
      <section className="auth-form">
        <div className="auth-theme">
          <ThemeToggle />
        </div>
        <div>
          <span className="eyebrow">BEM-VINDO AO SEU ESPAÇO</span>
          <h2>
            {register ? "Comece a se organizar." : "Que bom ter você aqui."}
          </h2>
          <p>
            {register
              ? "Crie sua conta para dar o primeiro passo."
              : "Entre para acompanhar suas contas."}
          </p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              setBusy(true);
              setError("");
              try {
                onLogin(
                  await api<User>(
                    `/auth/${register ? "register" : "login"}`,
                    "POST",
                    Object.fromEntries(data),
                  ),
                );
              } catch (e) {
                setError((e as Error).message);
              } finally {
                setBusy(false);
              }
            }}
          >
            {register && (
              <label>
                Seu nome
                <input
                  name="name"
                  required
                  minLength={2}
                  maxLength={80}
                  autoComplete="name"
                  placeholder="Como podemos chamar você?"
                />
              </label>
            )}
            <label>
              E-mail
              <input
                name="email"
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                placeholder="voce@exemplo.com"
              />
            </label>
            <label>
              Senha
              <input
                name="password"
                type="password"
                required
                minLength={10}
                maxLength={128}
                autoComplete={register ? "new-password" : "current-password"}
                placeholder="Pelo menos 10 caracteres"
              />
            </label>
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            <button className="primary auth-submit" disabled={busy}>
              {busy ? "Aguarde…" : register ? "Criar minha conta" : "Entrar"}
              <ArrowUpRight size={18} />
            </button>
          </form>
          <p className="auth-switch">
            {register ? "Já tem uma conta?" : "Ainda não tem uma conta?"}{" "}
            <button
              disabled={busy}
              onClick={() => {
                setRegister(!register);
                setError("");
              }}
            >
              {register ? "Entrar" : "Criar conta"}
            </button>
          </p>
        </div>
      </section>
    </div>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

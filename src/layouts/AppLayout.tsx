import { Button } from "../components/ui/Button";
import { styles } from "./AppLayout.styles";
import { ChevronRight, LayoutGrid, LogOut, Wallet, Leaf } from "lucide-react";
import { today } from "../utils/format";

import { Outlet } from "react-router-dom";
import { ThemeToggle } from "../theme";
import { AccountSummary } from "../components/AccountSummary";
import { AccountDialogs } from "../components/AccountDialogs";
import { useAccounts } from "../contexts/AccountsContext";
export function AppLayout() {
  const { user, active, busy, logout, setSelected, setSearch } = useAccounts();
  if (!user) return null;
  return (
    <div className={styles["app-shell"]}>
      <aside className={styles["sidebar"]}>
        <a
          href="#"
          className={styles["brand"]}
          onClick={(e) => {
            e.preventDefault();
            setSelected(null);
          }}
        >
          <span className={styles["brand-icon"]}>
            <Wallet size={23} />
          </span>
          contas<span className={styles["brand-dot"]}>.</span>
        </a>
        <span className={styles["nav-label"]}>SEU ESPAÇO</span>
        <button
          className={[styles["nav-item"], "active"].join(" ")}
          onClick={() => {
            setSelected(null);
            setSearch("");
          }}
        >
          <LayoutGrid size={19} />
          Minhas contas
          <ChevronRight size={16} />
        </button>
        <div className={styles["sidebar-note"]}>
          <Leaf size={24} />
          <h3>Um passo de cada vez.</h3>
          <p>
            Organizar suas contas é o começo de uma vida financeira mais
            tranquila.
          </p>
        </div>
        <div className={styles["profile"]}>
          <span className={styles["avatar"]}>
            {user.name.charAt(0).toUpperCase()}
          </span>
          <div>
            <strong>{user.name}</strong>
            <span>Meu espaço pessoal</span>
          </div>
          <Button
            variant="icon-btn"
            title="Sair"
            aria-label="Sair"
            disabled={busy}
            onClick={() => void logout()}
          >
            <LogOut size={18} />
          </Button>
        </div>
      </aside>
      <main>
        <header className={styles["topbar"]}>
          <span>
            Meu espaço <ChevronRight size={13} /> Contas{" "}
            {active && (
              <>
                <ChevronRight size={13} />
                <b>{active.name}</b>
              </>
            )}
          </span>
          <div className={styles["topbar-actions"]}>
            <span className={styles["today"]}>
              {new Date().toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <ThemeToggle />
          </div>
        </header>
        <div className={styles["content"]}>
          <AccountSummary />
          <Outlet />
          <footer className={styles["app-footer"]}>
            Feito para trazer mais tranquilidade às suas finanças.
          </footer>
        </div>
      </main>
      <AccountDialogs />
    </div>
  );
}

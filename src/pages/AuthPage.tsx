import { Button } from "../components/ui/Button";
import { Form } from "../components/ui/Form";
import { styles } from "./AuthPage.styles";
import { useState } from "react";
import { ArrowUpRight, FolderOpen, Wallet } from "lucide-react";

import type { User } from "../types";
import { ThemeToggle } from "../theme";
import { api } from "../services/api";
import { useAccounts } from "../contexts/AccountsContext";
import { useNavigate } from "react-router-dom";
export function AuthPage({ register = false }: { register?: boolean }) {
  const { setUser } = useAccounts();
  const navigate = useNavigate();
  const onLogin = (user: User) => {
    setUser(user);
    navigate("/contas", { replace: true });
  };
  const [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  return (
    <div className={styles["auth-page"]}>
      <section className={styles["auth-story"]}>
        <div className={styles["brand"]}>
          <span className={styles["brand-icon"]}>
            <Wallet size={23} />
          </span>
          contas.
        </div>
        <div>
          <span className={styles["eyebrow"]}>
            MAIS CLAREZA. MAIS TRANQUILIDADE.
          </span>
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
          <div className={styles["example-card"]}>
            <div>
              <span className={styles["folder-icon"]}>
                <FolderOpen size={25} />
              </span>
              <strong>Mercado</strong>
              <span>Seu planejamento</span>
            </div>
            <h2>
              R$ 350,00 <small>/ R$ 600,00</small>
            </h2>
            <div className={styles["progress"]}>
              <span style={{ width: "58.3%" }} />
            </div>
            <p>3 idas ao mercado · R$ 250,00 restantes</p>
          </div>
          <small className={styles["illustration-label"]}>
            Exemplo de como você pode organizar suas contas
          </small>
        </div>
        <p className={styles["auth-foot"]}>
          Organização hoje. Mais possibilidades amanhã.
        </p>
      </section>
      <section className={styles["auth-form"]}>
        <div className={["auth-theme"].join(" ")}>
          <ThemeToggle />
        </div>
        <div>
          <span className={styles["eyebrow"]}>BEM-VINDO AO SEU ESPAÇO</span>
          <h2>
            {register ? "Comece a se organizar." : "Que bom ter você aqui."}
          </h2>
          <p>
            {register
              ? "Crie sua conta para dar o primeiro passo."
              : "Entre para acompanhar suas contas."}
          </p>
          <Form
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
              <p className={styles["error"]} role="alert">
                {error}
              </p>
            )}
            <Button
              variant="primary"
              className={styles["auth-submit"]}
              disabled={busy}
            >
              {busy ? "Aguarde…" : register ? "Criar minha conta" : "Entrar"}
              <ArrowUpRight size={18} />
            </Button>
          </Form>
          <p className={styles["auth-switch"]}>
            {register ? "Já tem uma conta?" : "Ainda não tem uma conta?"}{" "}
            <button
              disabled={busy}
              onClick={() => {
                navigate(register ? "/login" : "/cadastro");
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

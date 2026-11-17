import { Button } from "./ui/Button";
import { styles } from "./AccountSummary.styles";
import { ArrowDownLeft, ArrowUpRight, Plus, Wallet } from "lucide-react";

import { useAccounts } from "../contexts/AccountsContext";
import { Stat } from "./Stat";
export function AccountSummary() {
  const { active, loading, setModal, error, load, budget, spent, folders } =
    useAccounts();

  return (
    <>
      <div className={styles["page-heading"]}>
        <div>
          <span className={styles["eyebrow"]}>FINANÇAS COM CLAREZA</span>
          <h1>{active ? active.name : "Suas contas, em ordem."}</h1>
          <p>
            {active
              ? "Cada gasto tem seu lugar. Acompanhe os detalhes desta conta."
              : "Uma visão simples do que você planejou e do que já gastou."}
          </p>
        </div>
        <Button
          variant="primary"
          disabled={loading}
          onClick={() =>
            setModal(
              active ? { kind: "entry", folder: active } : { kind: "folder" },
            )
          }
        >
          <Plus size={18} />
          {active ? "Novo lançamento" : "Nova pasta"}
        </Button>
      </div>

      {error && (
        <div className={styles["error"]} role="alert">
          {error}
          <button onClick={() => void load()}>Tentar novamente</button>
        </div>
      )}
      <section className={styles["stats"]} aria-label="Resumo das contas">
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
    </>
  );
}

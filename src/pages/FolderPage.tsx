import { Button } from "../components/ui/Button";
import { styles } from "./FolderPage.styles";
import { ArrowUpRight, Pencil, Trash2, ArrowLeft } from "lucide-react";
import { money } from "../utils/format";

import { useAccounts } from "../contexts/AccountsContext";
import { Empty } from "../components/Empty";
export function FolderPage() {
  const { active, loading, setSelected, setModal, setDeletion } = useAccounts();
  if (loading) return <p role="status">Carregando conta…</p>;
  if (!active)
    return (
      <Empty
        title="Pasta não encontrada"
        text="A conta não existe ou foi removida."
        action="Voltar às contas"
        onClick={() => setSelected(null)}
      />
    );
  return (
    <>
      <div className={styles["section-heading"]}>
        <button className={styles["back"]} onClick={() => setSelected(null)}>
          <ArrowLeft size={17} />
          Todas as pastas
        </button>
        <div className={styles["actions"]}>
          <Button
            variant="secondary"
            onClick={() => setModal({ kind: "folder", folder: active })}
          >
            <Pencil size={15} />
            Editar pasta
          </Button>
          <Button
            variant="icon-btn"
            className={["danger"].join(" ")}
            title="Excluir pasta"
            aria-label="Excluir pasta"
            onClick={() => setDeletion({ folder: active })}
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>
      <section className={styles["entries"]}>
        <div className={styles["entries-title"]}>
          <div>
            <h2>Lançamentos</h2>
            <p>{active.entries.length} registros nesta pasta</p>
          </div>
          <span
            className={`${styles["badge"]} ${active.spentCents > active.budgetCents ? "over" : ""}`}
          >
            {active.spentCents > active.budgetCents
              ? "Acima do previsto"
              : active.spentCents === active.budgetCents
                ? "Valor atingido"
                : "Dentro do previsto"}
          </span>
        </div>
        <div className={[styles["progress"], "wide"].join(" ")}>
          <span
            style={{
              width: `${Math.min(100, (active.spentCents / active.budgetCents) * 100)}%`,
            }}
          />
        </div>
        {active.entries.length ? (
          <div className={styles["table-wrap"]}>
            <table className={styles["entries-table"]}>
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Data</th>
                  <th>Valor</th>
                  <th>
                    <span className={["sr-only"].join(" ")}>Ações</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...active.entries]
                  .sort((a, b) => b.date.localeCompare(a.date))
                  .map((entry) => (
                    <tr key={entry.id}>
                      <td>
                        <span className={styles["entry-icon"]}>
                          <ArrowUpRight size={15} />
                        </span>
                        {entry.description}
                      </td>
                      <td data-label="Data">
                        {new Date(`${entry.date}T12:00:00`).toLocaleDateString(
                          "pt-BR",
                        )}
                      </td>
                      <td className={styles["amount"]} data-label="Valor">
                        {money(entry.amountCents)}
                      </td>
                      <td>
                        <div className={styles["actions"]}>
                          <Button
                            variant="icon-btn"
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
                          </Button>
                          <Button
                            variant="icon-btn"
                            className={["danger"].join(" ")}
                            aria-label={`Excluir ${entry.description}`}
                            onClick={() =>
                              setDeletion({ folder: active, entry })
                            }
                          >
                            <Trash2 size={16} />
                          </Button>
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
  );
}

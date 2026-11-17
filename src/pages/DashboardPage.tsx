import { styles } from "./DashboardPage.styles";
import { FolderCard } from "../components/FolderCard";

import { Plus, Search, Leaf } from "lucide-react";

import { useAccounts } from "../contexts/AccountsContext";
import { Empty } from "../components/Empty";
export function DashboardPage() {
  const {
    folders,
    search,
    setSearch,
    filtered,
    loading,
    setSelected,
    setModal,
  } = useAccounts();
  return (
    <>
      <div className={styles["section-heading"]}>
        <div>
          <h2>
            Minhas pastas{" "}
            <span className={styles["count"]}>{folders.length}</span>
          </h2>
          <p>Agrupe seus gastos e acompanhe cada conta.</p>
        </div>
        <label className={styles["search"]}>
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
        <div className={styles["empty"]} role="status">
          Carregando suas contas…
        </div>
      ) : filtered.length ? (
        <div className={styles["folder-grid"]}>
          {filtered.map((folder, index) => (
            <FolderCard
              key={folder.id}
              folder={folder}
              index={index}
              onOpen={() => setSelected(folder.id)}
            />
          ))}
          <button
            className={styles["add-card"]}
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
          action={search ? "Limpar busca" : "Criar minha primeira pasta"}
          onClick={() =>
            search ? setSearch("") : setModal({ kind: "folder" })
          }
        />
      )}
      <div className={styles["tip"]}>
        <span>
          <Leaf size={20} />
        </span>
        <p>
          <strong>Pequenos registros, grandes mudanças.</strong> Registre seus
          gastos ao longo do dia e veja seu planejamento ganhar forma.
        </p>
      </div>
    </>
  );
}

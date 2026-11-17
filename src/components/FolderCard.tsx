import { styles } from "./FolderCard.styles";
import { FolderOpen, ChevronRight } from "lucide-react";
import type { Folder } from "../types";
import { money } from "../utils/format";
export function FolderCard({
  folder,
  index,
  onOpen,
}: {
  folder: Folder;
  index: number;
  onOpen: () => void;
}) {
  return (
    <button className={styles["folder-card"]} onClick={onOpen}>
      <div className={styles["folder-top"]}>
        <span className={`${styles["folder-icon"]} color-${index % 4}`}>
          <FolderOpen size={25} />
        </span>
        <ChevronRight size={18} />
      </div>
      <h3>{folder.name}</h3>
      <p>
        {folder.entries.length}{" "}
        {folder.entries.length === 1 ? "lançamento" : "lançamentos"}
      </p>
      <div className={styles["folder-values"]}>
        <strong>{money(folder.spentCents)}</strong>
        <span>de {money(folder.budgetCents)}</span>
      </div>
      <div
        className={`${styles["progress"]} ${folder.spentCents > folder.budgetCents ? "over" : ""}`}
      >
        <span
          style={{
            width: `${Math.min(100, (folder.spentCents / folder.budgetCents) * 100)}%`,
          }}
        />
      </div>
      <div className={styles["folder-foot"]}>
        <span>
          {folder.spentCents > folder.budgetCents
            ? "Acima do previsto"
            : "Restante"}
        </span>
        <b>{money(Math.abs(folder.budgetCents - folder.spentCents))}</b>
      </div>
    </button>
  );
}

import { Button } from "./ui/Button";
import { styles } from "./Empty.styles";
import { FolderOpen, Plus } from "lucide-react";

export function Empty({
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
    <div className={styles["empty"]}>
      <span className={styles["empty-icon"]}>
        <FolderOpen size={32} />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
      <Button variant="primary" onClick={onClick}>
        <Plus size={17} />
        {action}
      </Button>
    </div>
  );
}

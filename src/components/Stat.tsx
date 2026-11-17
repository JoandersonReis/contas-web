import { styles } from "./Stat.styles";
import type React from "react";

import { money } from "../utils/format";

export function Stat({
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
    <div className={`${styles["stat"]} ${accent ? "accent" : ""}`}>
      <div className={styles["stat-label"]}>
        {label}
        {icon}
      </div>
      <strong>{money(value)}</strong>
      <p>{note}</p>
    </div>
  );
}

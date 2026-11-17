import { Button } from "./ui/Button";
import { styles } from "./Modal.styles";
import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

export function Modal({
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
      className={styles["app-modal"]}
      ref={ref}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      aria-labelledby="modal-title"
    >
      <div className={styles["modal-heading"]}>
        <h2 id="modal-title">{title}</h2>
        <Button variant="icon-btn" aria-label="Fechar" onClick={close}>
          <X size={21} />
        </Button>
      </div>
      {children}
    </dialog>
  );
}

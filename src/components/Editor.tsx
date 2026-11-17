import { Button } from "./ui/Button";
import { Form } from "./ui/Form";
import { styles } from "./Editor.styles";
import { useState } from "react";

import { today } from "../utils/format";
import type { Folder, Entry } from "../types";
import { Modal } from "./Modal";
export function Editor({
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
      <Form
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
        <p className={styles["modal-copy"]}>
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
          <p className={styles["error"]} role="alert">
            {error}
          </p>
        )}
        <div className={styles["form-actions"]}>
          <Button
            type="button"
            variant="secondary"
            disabled={busy}
            onClick={close}
          >
            Cancelar
          </Button>
          <Button variant="primary" disabled={busy}>
            {busy ? "Salvando…" : "Salvar"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

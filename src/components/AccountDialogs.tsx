import { Button } from "./ui/Button";
import { styles } from "./AccountDialogs.styles";
import { useAccounts } from "../contexts/AccountsContext";
import { api } from "../services/api";
import { Editor } from "./Editor";
import { Modal } from "./Modal";
export function AccountDialogs() {
  const {
    notice,
    modal,
    setModal,
    deletion,
    setDeletion,
    busy,
    setBusy,
    setNotice,
    setSelected,
    load,
    handleError,
  } = useAccounts();

  return (
    <>
      {notice && (
        <div className={styles["toast"]} role="status">
          {notice}
        </div>
      )}
      {modal && (
        <Editor
          modal={modal}
          close={() => setModal(null)}
          save={async (data) => {
            const path =
              modal.kind === "folder"
                ? `/folders${modal.folder ? `/${modal.folder.id}` : ""}`
                : `/folders/${modal.folder!.id}/entries${modal.entry ? `/${modal.entry.id}` : ""}`;
            await api(
              path,
              (modal.kind === "folder" ? modal.folder : modal.entry)
                ? "PUT"
                : "POST",
              data,
            );
            setModal(null);
            setNotice("Salvo com sucesso.");
            await load();
          }}
        />
      )}
      {deletion && (
        <Modal
          title={deletion.entry ? "Excluir lançamento?" : "Excluir pasta?"}
          close={() => !busy && setDeletion(null)}
        >
          <p className={styles["modal-copy"]}>
            {deletion.entry
              ? `O lançamento “${deletion.entry.description}” será removido.`
              : `A pasta “${deletion.folder.name}” e todos os seus lançamentos serão removidos.`}{" "}
            Essa ação não pode ser desfeita.
          </p>
          <div className={styles["form-actions"]}>
            <Button
              variant="secondary"
              disabled={busy}
              onClick={() => setDeletion(null)}
            >
              Cancelar
            </Button>
            <Button
              variant="delete-btn"
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                try {
                  await api(
                    `/folders/${deletion.folder.id}${deletion.entry ? `/entries/${deletion.entry.id}` : ""}`,
                    "DELETE",
                  );
                  if (!deletion.entry) setSelected(null);
                  setDeletion(null);
                  setNotice("Excluído com sucesso.");
                  await load();
                } catch (e) {
                  handleError(e);
                  setDeletion(null);
                } finally {
                  setBusy(false);
                }
              }}
            >
              {busy ? "Excluindo…" : "Sim, excluir"}
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}

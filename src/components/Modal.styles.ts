export const styles = {
  "app-modal": [
    "app-modal fixed [inset:0] m-auto w-[450px] [max-width:calc(100vw_-_32px)] max-h-[90vh] border",
    "border-border rounded-[24px] p-7 text-text [box-shadow:0_24px_100px_#00000055] bg-surface",
    "[&::backdrop]:[background:#09091b99] [&::backdrop]:[backdrop-filter:blur(8px)]",
  ].join(" "),
  "modal-heading":
    "modal-heading flex justify-between items-center mb-2 [&_h2]:text-[21px] [&_h2]:font-semibold",
};

export const buttonStyles = {
  primary: [
    "primary inline-flex items-center justify-center gap-[9px] [padding:12px_18px] rounded-[12px]",
    "text-[12px] font-semibold whitespace-nowrap bg-[image:var(--gradient)] text-white",
    "[box-shadow:0_6px_18px_#7254d62b] min-h-11 [&:hover]:bg-[image:var(--gradient)]",
    "[&:hover]:[filter:brightness(1.12)] [&:hover]:[transform:translateY(-1px)]",
  ].join(" "),
  secondary: [
    "secondary inline-flex items-center justify-center gap-[9px] [padding:12px_18px] rounded-[12px]",
    "text-[12px] font-semibold whitespace-nowrap bg-surface border border-border text-muted min-h-11",
  ].join(" "),
  "delete-btn": [
    "delete-btn inline-flex items-center justify-center gap-[9px] [padding:12px_18px] rounded-[12px]",
    "text-[12px] font-semibold whitespace-nowrap [background:#b7354c] text-white",
  ].join(" "),
  "icon-btn": [
    "icon-btn p-2 bg-transparent text-muted rounded-[6px] inline-flex items-center justify-center",
    "[&:hover]:bg-soft [&:hover]:text-text [&.danger:hover]:text-danger [&.danger]:text-danger",
  ].join(" "),
};

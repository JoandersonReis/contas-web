export const styles = {
  "folder-card": [
    "folder-card p-6 [background:linear-gradient(145deg,_var(--surface),_var(--surface-end))] border",
    "border-border rounded-[20px] text-left [color:inherit] shadow-(--shadow) [&:hover]:border-brand",
    "[&:hover]:[transform:translateY(-4px)] [&:hover]:[box-shadow:0_12px_35px_#7157c21a]",
    "[&_h3]:text-[18px] [&_h3]:font-semibold [&_h3]:mb-[6px] [&_h3]:[overflow-wrap:anywhere]",
    "[&_>_p]:text-[11px] [&_>_p]:text-muted max-[760px]:[padding:18px_15px]",
  ].join(" "),
  "folder-top":
    "folder-top flex justify-between items-center text-muted mb-[18px]",
  "folder-icon": [
    "folder-icon w-[47px] h-[47px] inline-grid place-items-center rounded-[15px] bg-soft text-brand",
    "[&.color-1]:bg-warning-bg [&.color-1]:text-warning [&.color-2]:bg-cyan-bg [&.color-2]:text-cyan",
    "[&.color-3]:bg-pink-bg [&.color-3]:text-pink",
  ].join(" "),
  "folder-values": [
    "folder-values flex items-baseline justify-between gap-[5px] [margin:24px_0_11px]",
    "[&_strong]:text-[20px] [&_strong]:tracking-[-0.5px] [&_strong]:font-semibold [&_span]:text-[10px]",
    "[&_span]:text-muted max-[760px]:block max-[760px]:[&_strong]:block max-[760px]:[&_strong]:text-[19px]",
    "max-[760px]:[&_strong]:mb-[5px] max-[760px]:[&_strong]:[overflow-wrap:anywhere]",
  ].join(" "),
  progress: [
    "progress bg-soft h-[7px] rounded-[8px] overflow-hidden [&_>_span]:block [&_>_span]:h-full",
    "[&_>_span]:rounded-[8px] [&_>_span]:bg-[image:var(--gradient)]",
    "[&_>_span]:[transition:width_250ms_ease] [&.over_>_span]:bg-warning [&.wide]:[margin:22px_0]",
  ].join(" "),
  "folder-foot":
    "folder-foot flex justify-between mt-[13px] text-[10px] text-muted [&_b]:text-brand [&_b]:font-medium max-[760px]:text-[9px]",
};

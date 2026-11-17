export const styles = {
  "section-heading": [
    "section-heading [&_p]:text-[12px] [&_p]:text-muted [&_p]:leading-[1.7] flex items-center",
    "justify-between gap-[15px] [margin:24px_0_22px] [&_h2]:text-[17px] [&_h2]:font-semibold",
    "[&_h2]:mb-[6px] [&_h2]:flex [&_h2]:items-center [&_h2]:gap-[10px] max-[760px]:flex-wrap",
  ].join(" "),
  back: "back flex gap-[9px] items-center [background:none] text-muted text-[12px]",
  actions: "actions flex items-center gap-[6px]",
  entries: [
    "entries [&_h2]:text-[17px] [&_h2]:font-semibold [&_h2]:mb-[6px] [&_h2]:flex [&_h2]:items-center",
    "[&_h2]:gap-[10px] bg-surface border border-border rounded-[22px] p-[25px] shadow-(--shadow)",
    "[&_.empty]:border-0 max-[760px]:[padding:18px_12px]",
  ].join(" "),
  "entries-title":
    "entries-title flex items-center justify-between gap-[10px] [&_p]:text-[11px] [&_p]:text-muted max-[760px]:items-start max-[760px]:flex-wrap",
  badge:
    "badge text-[10px] rounded-[20px] bg-soft text-brand [padding:7px_12px] [&.over]:bg-warning-bg [&.over]:text-warning max-[760px]:text-[9px]",
  progress: [
    "progress bg-soft h-[7px] rounded-[8px] overflow-hidden [&_>_span]:block [&_>_span]:h-full",
    "[&_>_span]:rounded-[8px] [&_>_span]:bg-[image:var(--gradient)]",
    "[&_>_span]:[transition:width_250ms_ease] [&.over_>_span]:bg-warning [&.wide]:[margin:22px_0]",
  ].join(" "),
  "table-wrap": [
    "table-wrap overflow-auto max-[760px]:overflow-visible max-[760px]:[&_table]:block",
    "max-[760px]:[&_table]:whitespace-normal max-[760px]:[&_tbody]:block",
    "max-[760px]:[&_tbody]:whitespace-normal max-[760px]:[&_thead]:absolute max-[760px]:[&_thead]:w-[1px]",
    "max-[760px]:[&_thead]:h-[1px] max-[760px]:[&_thead]:overflow-hidden",
    "max-[760px]:[&_thead]:[clip-path:inset(50%)] max-[760px]:[&_tr]:grid",
    "max-[760px]:[&_tr]:[grid-template-columns:minmax(0,_1fr)_auto] max-[760px]:[&_tr]:[gap:8px_12px]",
    "max-[760px]:[&_tr]:p-4 max-[760px]:[&_tr]:mt-3 max-[760px]:[&_tr]:border",
    "max-[760px]:[&_tr]:border-border max-[760px]:[&_tr]:rounded-[16px] max-[760px]:[&_tr]:bg-input",
    "max-[760px]:[&_td]:block max-[760px]:[&_td]:p-0 max-[760px]:[&_td]:border-0",
    "max-[760px]:[&_td]:min-w-0 max-[760px]:[&_td:first-child]:[grid-column:1_/_-1]",
    "max-[760px]:[&_td:first-child]:[overflow-wrap:anywhere] max-[760px]:[&_td:first-child]:text-[14px]",
    "max-[760px]:[&_td:first-child]:mb-2 max-[760px]:[&_td[data-label]::before]:[content:attr(data-label)]",
    "max-[760px]:[&_td[data-label]::before]:block max-[760px]:[&_td[data-label]::before]:text-[10px]",
    "max-[760px]:[&_td[data-label]::before]:text-muted max-[760px]:[&_td[data-label]::before]:mb-[5px]",
    "max-[760px]:[&_td[data-label]::before]:font-normal max-[760px]:[&_td:last-child]:[grid-column:1_/_-1]",
    "max-[760px]:[&_.actions]:justify-end max-[760px]:[&_.icon-btn]:w-[42px]",
    "max-[760px]:[&_.icon-btn]:h-[42px] max-[760px]:[&_.icon-btn]:bg-surface",
    "max-[760px]:[&_.icon-btn]:border max-[760px]:[&_.icon-btn]:border-border",
    "max-[760px]:[&_.icon-btn]:rounded-[10px]",
  ].join(" "),
  "entries-table": [
    "entries-table w-full border-collapse whitespace-nowrap text-left [&_th]:text-[10px]",
    "[&_th]:tracking-[0.6px] [&_th]:uppercase [&_th]:font-medium [&_th]:text-muted",
    "[&_th]:[padding:12px_8px] [&_th]:[border-bottom:1px_solid_var(--border)] [&_td]:[padding:17px_8px]",
    "[&_td]:text-[12px] [&_td]:[border-bottom:1px_solid_var(--border)] [&_td]:text-muted",
    "[&_td:first-child]:text-text [&_td:first-child]:font-medium [&_tr:last-child_td]:border-0",
  ].join(" "),
  "entry-icon":
    "entry-icon inline-flex p-[7px] bg-soft rounded-[7px] align-middle mr-3 text-muted",
  amount: "amount tabular-nums font-semibold text-text",
};

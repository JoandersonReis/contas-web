export const styles = {
  "section-heading": [
    "section-heading [&_p]:text-[12px] [&_p]:text-muted [&_p]:leading-[1.7] flex items-center",
    "justify-between gap-[15px] [margin:24px_0_22px] [&_h2]:text-[17px] [&_h2]:font-semibold",
    "[&_h2]:mb-[6px] [&_h2]:flex [&_h2]:items-center [&_h2]:gap-[10px] max-[760px]:flex-wrap",
  ].join(" "),
  count: "count bg-soft rounded-[5px] text-muted text-[11px] [padding:3px_7px]",
  search: [
    "search border border-border rounded-[12px] bg-input flex items-center gap-[10px] [padding:10px_13px]",
    "text-muted [&_input]:border-0 [&_input]:bg-transparent [&_input]:[outline:0] [&_input]:w-40",
    "[&_input]:text-[12px] [&:focus-within]:border-brand",
    "[&:focus-within]:[box-shadow:0_0_0_3px_var(--soft)] max-[760px]:w-full max-[760px]:mt-[5px]",
    "max-[760px]:[&_input]:w-full",
  ].join(" "),
  empty: [
    "empty text-center [border:1px_dashed_var(--border)] rounded-[22px] [padding:56px_24px] bg-glass",
    "[&_h3]:text-[18px] [&_h3]:font-medium [&_h3]:mb-[10px] [&_p]:text-[12px] [&_p]:text-muted",
    "[&_p]:max-w-[390px] [&_p]:[margin:0_auto_22px] [&_p]:leading-[1.8]",
  ].join(" "),
  "folder-grid":
    "folder-grid grid grid-cols-3 gap-[18px] min-[1500px]:grid-cols-4 max-[1100px]:grid-cols-2 max-[760px]:grid-cols-2 max-[760px]:gap-3 max-[380px]:grid-cols-1",
  "add-card": [
    "add-card min-h-[245px] bg-glass [border:1px_dashed_var(--border)] rounded-[20px] text-muted flex",
    "items-center justify-center flex-col gap-[11px] [&_>_span]:w-11 [&_>_span]:h-11 [&_>_span]:bg-soft",
    "[&_>_span]:rounded-full [&_>_span]:grid [&_>_span]:place-items-center [&_>_span]:mb-[3px]",
    "[&_strong]:text-[12px] [&_strong]:font-medium [&_p]:text-[10px] [&_p]:text-muted [&:hover]:bg-soft",
  ].join(" "),
  tip: [
    "tip border border-border bg-glass flex gap-[14px] items-center mt-[29px] rounded-[16px]",
    "[padding:17px_20px] text-muted [&_p]:text-[11px] [&_p]:leading-[1.8] [&_p]:text-muted",
    "[&_strong]:text-muted [&_strong]:font-semibold [&_strong]:mr-1 max-[760px]:items-start",
    "max-[760px]:[&_strong]:block",
  ].join(" "),
};

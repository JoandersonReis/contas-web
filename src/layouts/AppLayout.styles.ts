export const styles = {
  "app-shell":
    "app-shell min-h-screen flex [&_main]:ml-67 [&_main]:flex-1 [&_main]:min-w-0 max-[1100px]:[&_main]:ml-[233px] max-[760px]:block max-[760px]:[&_main]:m-0",
  sidebar: [
    "sidebar w-58 fixed [inset:18px_auto_18px_18px] bg-glass [border-right:1px_solid_var(--border)]",
    "[padding:28px_18px_20px] flex flex-col border border-border rounded-[24px]",
    "[backdrop-filter:blur(24px)] z-[2] max-[1100px]:w-[197px] max-[1100px]:[padding:30px_15px]",
    "max-[760px]:static max-[760px]:w-auto max-[760px]:[margin:12px_12px_0] max-[760px]:rounded-[18px]",
    "max-[760px]:[padding:16px_20px] max-[760px]:flex-row max-[760px]:items-center",
    "max-[760px]:[border-right:0] max-[760px]:[border-bottom:1px_solid_var(--border)] max-[760px]:gap-5",
  ].join(" "),
  brand:
    "brand flex items-center [font-weight:750] text-[29px] tracking-[-1px] gap-[10px] max-[760px]:text-[24px]",
  "brand-icon": [
    "brand-icon bg-[image:var(--gradient)] rounded-[11px] w-[39px] h-[39px] grid place-items-center",
    "text-white [box-shadow:0_6px_20px_#7856ee35] max-[760px]:w-[33px] max-[760px]:h-[33px]",
  ].join(" "),
  "brand-dot": "brand-dot text-brand ml-[-10px]",
  "nav-label":
    "nav-label text-[10px] font-bold tracking-[1.6px] text-muted [margin:55px_12px_16px] max-[760px]:hidden",
  "nav-item": [
    "nav-item flex gap-3 items-center p-[14px] rounded-[9px] text-left text-[13px] font-semibold",
    "[&_svg:last-child]:ml-auto [&.active]:bg-[image:var(--gradient)] [&.active]:text-white",
    "[&.active]:[box-shadow:0_8px_22px_#7555db25] max-[760px]:hidden",
  ].join(" "),
  "sidebar-note": [
    "sidebar-note mt-auto [background:linear-gradient(145deg,_var(--soft),_var(--surface))]",
    "[padding:20px_17px] rounded-[16px] text-muted border border-border [&_h3]:text-[13px]",
    "[&_h3]:[margin:14px_0_8px] [&_p]:text-[12px] [&_p]:leading-[1.8] max-[760px]:hidden",
  ].join(" "),
  profile: [
    "profile flex items-center gap-[10px] [border-top:1px_solid_var(--border)] pt-6 mt-[25px]",
    "[&_>_div]:min-w-0 [&_>_div]:flex-1 [&_strong]:block [&_strong]:whitespace-nowrap",
    "[&_strong]:overflow-hidden [&_strong]:text-ellipsis [&_span:not(.avatar)]:block",
    "[&_span:not(.avatar)]:whitespace-nowrap [&_span:not(.avatar)]:overflow-hidden",
    "[&_span:not(.avatar)]:text-ellipsis [&_strong]:text-[12px] [&_span:not(.avatar)]:text-[10px]",
    "[&_span:not(.avatar)]:text-muted [&_span:not(.avatar)]:mt-1 max-[760px]:[&_>_div]:hidden",
    "max-[760px]:[margin:0_0_0_auto] max-[760px]:p-0 max-[760px]:border-0",
  ].join(" "),
  avatar:
    "avatar w-[35px] h-[35px] rounded-full grid place-items-center bg-soft text-brand text-[14px] shrink-0",
  topbar: [
    "topbar h-22 bg-transparent [border-bottom:1px_solid_var(--border)] [padding:0_42px] flex items-center",
    "justify-between text-muted text-[12px] gap-4 [&_>_span:first-child]:flex",
    "[&_>_span:first-child]:gap-[13px] [&_>_span:first-child]:items-center [&_b]:font-medium",
    "[&_b]:text-text [&_>_span:first-child]:min-w-0 [&_>_span:first-child]:flex-wrap",
    "[&_b]:[overflow-wrap:anywhere] max-[1100px]:[padding:0_25px] max-[760px]:h-[55px]",
    "max-[760px]:[padding:0_20px]",
  ].join(" "),
  "topbar-actions": "topbar-actions flex items-center gap-5 shrink-0",
  today: "today text-[11px] max-[760px]:hidden",
  content:
    "content max-w-345 m-auto [padding:32px_42px_20px] max-[1100px]:[padding:32px_25px] max-[760px]:[padding:22px_16px]",
  "app-footer":
    "app-footer text-[10px] text-center text-muted [margin:50px_0_15px]",
};

export const styles = {
  "page-heading": [
    "page-heading flex items-center justify-between gap-5 mb-8 relative p-8 border border-border",
    "rounded-[24px]",
    "[background:radial-gradient(ellipse_at_100%_0%,_var(--ambient),_transparent_70%),_var(--glass)]",
    "overflow-hidden min-w-0 [&_h1]:text-[34px] [&_h1]:tracking-[-1px] [&_h1]:font-bold",
    "[&_h1]:[margin:9px_0] [&_h1]:[overflow-wrap:anywhere] [&_p]:text-[12px] [&_p]:text-muted",
    "[&_p]:leading-[1.7] max-[1100px]:[&_h1]:text-[26px] max-[760px]:items-start max-[760px]:flex-col",
    "max-[760px]:gap-[19px] max-[760px]:p-6 max-[760px]:rounded-[20px] max-[760px]:[&_h1]:text-[28px]",
  ].join(" "),
  eyebrow: "eyebrow text-[10px] tracking-[1.8px] font-bold text-muted",
  error:
    "error bg-danger-bg text-danger rounded-[7px] p-3 text-[12px] [margin:12px_0] leading-[1.7] [&_button]:[background:none] [&_button]:underline [&_button]:ml-3",
  stats:
    "stats grid grid-cols-3 gap-[18px] mb-[38px] max-[760px]:grid-cols-1 max-[760px]:gap-[10px] max-[760px]:mb-[27px]",
};

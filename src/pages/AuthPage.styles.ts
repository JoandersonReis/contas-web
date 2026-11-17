export const styles = {
  "auth-page": [
    "auth-page min-h-screen grid [grid-template-columns:1.05fr_1fr] bg-transparent p-5 gap-5",
    "max-[760px]:grid-cols-1 max-[760px]:p-3 max-[760px]:gap-3 max-[760px]:[grid-template-rows:auto_1fr]",
  ].join(" "),
  "auth-story": [
    "auth-story",
    "[background:radial-gradient(ellipse_at_95%_10%,_#6c49da99,_transparent_55%),_radial-gradient(ellipse_at_0%_100%,_#256c9c99,_transparent_60%),_linear-gradient(145deg,_#27214d,_#18182f)]",
    "[padding:45px_12%] flex flex-col justify-between gap-[55px] text-white [border:1px_solid_#ffffff15]",
    "rounded-[28px] overflow-hidden relative [&_h1]:[font-size:clamp(35px,_3.8vw,_60px)]",
    "[&_h1]:leading-[1.12] [&_h1]:tracking-[-2px] [&_h1]:[font-weight:650] [&_h1]:[margin:22px_0]",
    "[&_h1_em]:[font-family:inherit] [&_h1_em]:text-transparent [&_h1_em]:[font-weight:650]",
    "[&_h1_em]:not-italic [&_h1_em]:[background:linear-gradient(100deg,_#c4abff,_#7ce3f3)]",
    "[&_h1_em]:bg-clip-text [&_>_div_>_p]:text-[14px] [&_>_div_>_p]:leading-[1.9]",
    "[&_>_div_>_p]:[color:#c5c5df] [&_>_div_>_p]:max-w-75 [&_.eyebrow]:[color:#c6b4fc]",
    "[&_.folder-icon]:[background:#ffffff18] [&_.folder-icon]:[color:#d6c7ff]",
    "[&_.progress]:[background:#ffffff18] [&_.brand-icon]:[background:#ffffff18]",
    "[&_.brand-icon]:[border:1px_solid_#ffffff25] max-[1100px]:[padding:40px_9%] max-[760px]:p-6",
    "max-[760px]:[&_>_div:nth-child(2)]:hidden max-[760px]:gap-0",
  ].join(" "),
  brand:
    "brand flex items-center [font-weight:750] text-[29px] tracking-[-1px] gap-[10px] max-[760px]:text-[24px]",
  "brand-icon": [
    "brand-icon bg-[image:var(--gradient)] rounded-[11px] w-[39px] h-[39px] grid place-items-center",
    "text-white [box-shadow:0_6px_20px_#7856ee35] max-[760px]:w-[33px] max-[760px]:h-[33px]",
  ].join(" "),
  eyebrow: "eyebrow text-[10px] tracking-[1.8px] font-bold text-muted",
  "example-card": [
    "example-card mt-[35px] [background:linear-gradient(125deg,_#ffffff18,_#ffffff08)]",
    "[border:1px_solid_#ffffff30] rounded-[20px] p-6 max-w-[390px] [transform:rotate(-3deg)]",
    "[box-shadow:0_20px_50px_#05061530] [backdrop-filter:blur(20px)] [&_>_div:first-child]:flex",
    "[&_>_div:first-child]:items-center [&_>_div:first-child]:gap-[10px] [&_>_div:first-child]:text-[13px]",
    "[&_>_div:first-child_>_span:last-child]:text-[9px] [&_>_div:first-child_>_span:last-child]:ml-auto",
    "[&_>_div:first-child_>_span:last-child]:[color:#c5c5df] [&_.folder-icon]:w-[35px]",
    "[&_.folder-icon]:h-[35px] [&_h2]:text-[24px] [&_h2]:font-medium [&_h2]:[margin:22px_0_15px]",
    "[&_small]:text-[12px] [&_small]:[color:#c5c5df] [&_p]:text-[11px] [&_p]:mt-[14px]",
    "[&_p]:[color:#c5c5df]",
  ].join(" "),
  "folder-icon": [
    "folder-icon w-[47px] h-[47px] inline-grid place-items-center rounded-[15px] bg-soft text-brand",
    "[&.color-1]:bg-warning-bg [&.color-1]:text-warning [&.color-2]:bg-cyan-bg [&.color-2]:text-cyan",
    "[&.color-3]:bg-pink-bg [&.color-3]:text-pink",
  ].join(" "),
  progress: [
    "progress bg-soft h-[7px] rounded-[8px] overflow-hidden [&_>_span]:block [&_>_span]:h-full",
    "[&_>_span]:rounded-[8px] [&_>_span]:bg-[image:var(--gradient)]",
    "[&_>_span]:[transition:width_250ms_ease] [&.over_>_span]:bg-warning [&.wide]:[margin:22px_0]",
  ].join(" "),
  "illustration-label":
    "illustration-label block text-[10px] [color:#bdbbd8] mt-[22px]",
  "auth-foot": "auth-foot text-[11px] [color:#bdbbd8] max-[760px]:hidden",
  "auth-form": [
    "auth-form flex items-center justify-center [padding:80px_45px] relative bg-glass border border-border",
    "rounded-[28px] [&_>_div]:max-w-[365px] [&_>_div]:w-full [&_h2]:text-[30px] [&_h2]:[font-weight:650]",
    "[&_h2]:tracking-[-0.7px] [&_h2]:[margin:12px_0] [&_>_div_>_p]:text-[13px] [&_>_div_>_p]:text-muted",
    "[&_form]:mt-[34px] [&_>_.auth-theme]:absolute [&_>_.auth-theme]:top-6 [&_>_.auth-theme]:right-6",
    "[&_>_.auth-theme]:w-auto max-[760px]:[padding:85px_24px_40px] max-[760px]:[&_h2]:text-[26px]",
  ].join(" "),
  error:
    "error bg-danger-bg text-danger rounded-[7px] p-3 text-[12px] [margin:12px_0] leading-[1.7] [&_button]:[background:none] [&_button]:underline [&_button]:ml-3",
  "auth-submit": "auth-submit w-full justify-between mt-2 [padding:14px_18px]",
  "auth-switch":
    "auth-switch text-center mt-[25px] text-[12px]! [&_button]:font-semibold [&_button]:[background:none] [&_button]:text-brand [&_button]:[padding:0_4px]",
};

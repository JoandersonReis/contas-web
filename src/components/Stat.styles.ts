export const styles = {
  stat: [
    "stat p-[26px] bg-surface border border-border rounded-[20px] shadow-(--shadow) [&_>_strong]:block",
    "[&_>_strong]:text-[32px] [&_>_strong]:tracking-[-1px] [&_>_strong]:[font-weight:650]",
    "[&_>_strong]:[margin:17px_0_9px] [&_>_strong]:tabular-nums [&_>_p]:text-[10px] [&_>_p]:text-muted",
    "[&.accent]:bg-[image:var(--gradient)] [&.accent]:border-transparent [&.accent]:relative",
    "[&.accent]:overflow-hidden [&.accent_>_strong]:text-white [&.accent_.stat-label]:[color:#efecff]",
    "[&.accent_.stat-label_svg]:[color:#efecff] [&.accent_>_p]:[color:#efecff]",
    '[&.accent::after]:[content:""] [&.accent::after]:absolute [&.accent::after]:w-35',
    "[&.accent::after]:h-35 [&.accent::after]:[border:28px_solid_#ffffff0c] [&.accent::after]:rounded-full",
    "[&.accent::after]:right-[-35px] [&.accent::after]:bottom-[-65px]",
    "[&.accent::after]:pointer-events-none max-[1100px]:[padding:19px_16px]",
    "max-[1100px]:[&_>_strong]:text-[23px] max-[760px]:[padding:18px_20px] max-[760px]:grid",
    "max-[760px]:[grid-template-columns:1fr_1fr] max-[760px]:items-center",
    "max-[760px]:[&_>_strong]:text-right max-[760px]:[&_>_strong]:m-0 max-[760px]:[&_>_strong]:text-[23px]",
    "max-[760px]:[&_>_p]:[grid-column:1/-1] max-[760px]:[&_>_p]:mt-[6px]",
    "max-[380px]:[&_>_strong]:text-[20px]",
  ].join(" "),
  "stat-label":
    "stat-label flex items-center justify-between text-muted text-[12px] [&_svg]:text-muted max-[760px]:[&_svg]:hidden",
};

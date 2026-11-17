import type { ButtonHTMLAttributes } from "react";
import { buttonStyles } from "./Button.styles";
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof buttonStyles;
};
export function Button({
  variant = "primary",
  className = "",
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={[buttonStyles[variant], className].join(" ")}
    />
  );
}

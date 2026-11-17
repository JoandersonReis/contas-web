import type { FormHTMLAttributes } from "react";
import { formStyles } from "./Form.styles";
export function Form({
  className = "",
  ...props
}: FormHTMLAttributes<HTMLFormElement>) {
  return <form {...props} className={[formStyles, className].join(" ")} />;
}

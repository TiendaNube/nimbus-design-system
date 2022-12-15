import { OptgroupHTMLAttributes, ReactNode } from "react";

export interface SelectGroupProps
  extends OptgroupHTMLAttributes<HTMLOptGroupElement> {
  /** Option group label */
  label: string;
  /** Elements to be rendered inside the option group */
  children: ReactNode;
}

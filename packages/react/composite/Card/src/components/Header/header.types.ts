import { HTMLAttributes, ReactNode } from "react";

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  /** Header content */
  children?: ReactNode;
  /** Header title */
  title?: string;
}

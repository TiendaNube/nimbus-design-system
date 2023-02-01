import { HTMLAttributes, ReactNode } from "react";

export interface ModalHeaderProps extends HTMLAttributes<HTMLElement> {
  /** Header content */
  children?: ReactNode;
  /** Header title */
  title?: string;
}

import { HTMLAttributes, ReactNode } from "react";

export interface ModalFooterProps extends HTMLAttributes<HTMLElement> {
  /** Footer content */
  children: ReactNode;
}

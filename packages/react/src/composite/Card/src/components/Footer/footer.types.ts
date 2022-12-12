import { HTMLAttributes, ReactNode } from "react";

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  /** Footer content */
  children: ReactNode;
}

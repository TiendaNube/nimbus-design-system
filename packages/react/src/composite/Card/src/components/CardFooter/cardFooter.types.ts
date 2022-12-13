import { HTMLAttributes, ReactNode } from "react";

export interface CardFooterProps extends HTMLAttributes<HTMLElement> {
  /** Footer content */
  children: ReactNode;
}

import { HTMLAttributes, ReactNode } from "react";

export interface ItemProps extends HTMLAttributes<HTMLLIElement> {
  /** Element to be rendered inside the Item component */
  children: ReactNode;
}

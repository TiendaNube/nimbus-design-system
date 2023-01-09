import { ReactNode, HTMLAttributes } from "react";

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
  id?: string;
  onClick?: () => void;
}

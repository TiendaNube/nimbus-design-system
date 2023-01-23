import { ReactNode, HTMLAttributes } from "react";

export interface TableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

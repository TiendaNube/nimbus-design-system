import { ReactNode, HTMLAttributes } from "react";

export interface TableHeadProps
  extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

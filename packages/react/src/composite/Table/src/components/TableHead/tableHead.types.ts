import type { ReactNode, HTMLAttributes } from "react";

export interface TableHeadProperties {
  /**
   * The content of the table head.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type TableHeadProps = TableHeadProperties &
  HTMLAttributes<HTMLTableSectionElement>;

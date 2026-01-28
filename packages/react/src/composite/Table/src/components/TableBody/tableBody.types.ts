import type { ReactNode, HTMLAttributes } from "react";

export interface TableBodyProperties {
  /**
   * The content of the table body.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type TableBodyProps = TableBodyProperties &
  HTMLAttributes<HTMLTableSectionElement>;

import { ReactNode, HTMLAttributes } from "react";
import { TableSprinkle } from "@nimbus-ds/styles";

export interface TableCellProperties extends TableSprinkle {
  /**
   * The content of the table cell.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * Type of html tag to create for the table cell.
   * @default td
   */
  as?: "td" | "th";
}

export type TableCellProps = TableCellProperties &
  HTMLAttributes<HTMLTableCellElement>;

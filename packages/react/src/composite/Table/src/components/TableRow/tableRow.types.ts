import type { ReactNode, HTMLAttributes } from "react";
import type { TableSprinkle } from "@nimbus-ds/styles";

export interface TableRowProperties extends TableSprinkle {
  /**
   * The content of the table row.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * The ID of the table row.
   */
  id?: string;
  /**
   * Function to be passed when clicking on the table row.
   * @TJS-type () => void;
   */
  onClick?: () => void;
}

export type TableRowProps = TableRowProperties &
  HTMLAttributes<HTMLTableRowElement>;

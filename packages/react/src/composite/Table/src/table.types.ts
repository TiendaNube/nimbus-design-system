import { ReactNode, HTMLAttributes } from "react";

import { TableBody, TableCell, TableHead, TableRow } from "./components";

export interface TableComponents {
  Body: typeof TableBody;
  Cell: typeof TableCell;
  Head: typeof TableHead;
  Row: typeof TableRow;
}

export interface TableColumnLayout {
  /**
   * Fixed width applied to the column. Accepts any valid CSS width value.
   */
  width?: string;
  /**
   * Minimum width applied to the column. Accepts any valid CSS width value.
   */
  minWidth?: string;
  /**
   * Maximum width applied to the column. Accepts any valid CSS width value.
   */
  maxWidth?: string;
  /**
   * Growth factor that distributes remaining space among columns without a fixed width.
   */
  grow?: number;
}

export interface TableProperties {
  /**
   * The content of the table.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * Column sizing definitions applied from left to right. Use `width` for fixed columns and `grow` to distribute the remaining space proportionally.
   */
  columnLayout?: TableColumnLayout[];
}

export type TableProps = TableProperties & HTMLAttributes<HTMLTableElement>;

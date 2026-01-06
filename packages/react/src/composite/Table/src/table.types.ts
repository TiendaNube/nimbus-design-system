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
   * Unique identifier for the column.
   */
  id: string;
  /**
   * Fixed width applied to the column. Accepts any valid CSS width value.
   */
  width?: string;
  /**
   * Growth factor that distributes remaining space among columns without a fixed width.
   * Must be a positive number greater than 0.
   */
  grow?: number;
  /**
   * Minimum width constraint for the column. The column will not shrink below this value.
   * Only applies when using `grow`. Accepts any valid CSS width value.
   */
  minWidth?: string;
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
  /**
   * Minimum width of the table. When the container is smaller, horizontal scrolling is enabled.
   * Accepts any valid CSS width value (e.g., "600px", "50rem").
   */
  minWidth?: string;
  /**
   * Maximum width of the table. The table will not exceed this width.
   * Accepts any valid CSS width value (e.g., "1200px", "80rem").
   */
  maxWidth?: string;
}

export type TableProps = TableProperties & HTMLAttributes<HTMLTableElement>;

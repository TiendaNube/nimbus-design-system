import { ReactNode, HTMLAttributes } from "react";

import { TableBody, TableCell, TableHead, TableRow } from "./components";

export interface TableComponents {
  Body: typeof TableBody;
  Cell: typeof TableCell;
  Head: typeof TableHead;
  Row: typeof TableRow;
}

export interface TableProperties {
  /**
   * The content of the table.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type TableProps = TableProperties & HTMLAttributes<HTMLTableElement>;

import { ReactNode, HTMLAttributes } from "react";
import { TableSprinkle } from "@nimbus-ds/styles";

type TableExtends = TableSprinkle & HTMLAttributes<HTMLTableCellElement>;

export interface TableCellProps extends TableExtends {
  /** Content of the cell */
  children: ReactNode;
  /** Defines the type of html element to be rendered */
  as?: "td" | "th";
}

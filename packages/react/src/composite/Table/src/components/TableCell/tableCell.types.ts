import { ReactNode, HTMLAttributes } from "react";
import { TableSprinkle } from "@nimbus-ds/styles";

type TableExtends = TableSprinkle & HTMLAttributes<HTMLTableCellElement>;

export interface TableCellProps extends TableExtends {
  children: ReactNode;
}

import { ReactNode, HTMLAttributes } from "react";
import { table, TableSprinkle } from "@nimbus-ds/styles";

type TableExtends = TableSprinkle & HTMLAttributes<HTMLTableCellElement>;

export interface TableCellProps extends TableExtends {
  children: ReactNode;
  padding?: keyof typeof table.properties.padding;
}

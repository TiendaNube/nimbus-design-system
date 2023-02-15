import { ReactNode, HTMLAttributes } from "react";
import { TableSprinkle } from "@nimbus-ds/styles";

type TableRowExtends = TableSprinkle & HTMLAttributes<HTMLTableRowElement>;

export interface TableRowProps extends TableRowExtends {
  children: ReactNode;
  id?: string;
  onClick?: () => void;
}

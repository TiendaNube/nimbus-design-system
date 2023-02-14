import { ReactNode, HTMLAttributes } from "react";
import { TableSprinkle } from "@nimbus-ds/styles";

type TableExtends = TableSprinkle & HTMLAttributes<HTMLTableRowElement>;

export interface TableRowProps extends TableExtends {
  children: ReactNode;
  id?: string;
  onClick?: () => void;
}

import React from "react";
import { table } from "@nimbus-ds/styles";

import { TableRowProps } from "./tableRow.types";

const TableRow: React.FC<TableRowProps> = ({
  className: _className,
  style: _style,
  children,
  id,
  onClick,
  ...rest
}: TableRowProps) => (
    <tr {...rest} id={id} onClick={onClick} className={table.classnames.row}>
      {children}
    </tr>
  );

export { TableRow };

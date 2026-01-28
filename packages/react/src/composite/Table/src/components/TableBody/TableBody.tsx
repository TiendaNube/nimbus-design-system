import React from "react";
import { table } from "@nimbus-ds/styles";

import { type TableBodyProps } from "./tableBody.types";

const TableBody: React.FC<TableBodyProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest
}: TableBodyProps) => (
  <tbody {...rest} className={table.classnames.container__body}>
    {children}
  </tbody>
);

export { TableBody };

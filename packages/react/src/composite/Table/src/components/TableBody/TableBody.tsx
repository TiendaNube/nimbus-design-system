import React from "react";
import { table } from "@nimbus-ds/styles";

import { type TableBodyProps } from "./tableBody.types";

const TableBody: React.FC<TableBodyProps> = ({
  className,
  style: _style,
  children,
  ...rest
}: TableBodyProps) => (
  <tbody
    {...rest}
    className={[className, table.classnames.container__body]
      .filter(Boolean)
      .join(" ")}
  >
    {children}
  </tbody>
);

export { TableBody };

import React from "react";
import { table } from "@nimbus-ds/styles";

import { TableHeadProps } from "./tableHead.types";

const TableHead: React.FC<TableHeadProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest
}: TableHeadProps) => (
  <thead {...rest} className={table.classnames.container__head}>
    {children}
  </thead>
);

export { TableHead };

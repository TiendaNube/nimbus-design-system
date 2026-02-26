import React from "react";
import { table } from "@nimbus-ds/styles";

import { type TableHeadProps } from "./tableHead.types";

const TableHead: React.FC<TableHeadProps> = ({
  className,
  style: _style,
  children,
  ...rest
}: TableHeadProps) => (
  <thead
    {...rest}
    className={[className, table.classnames.container__head]
      .filter(Boolean)
      .join(" ")}
  >
    {children}
  </thead>
);

export { TableHead };

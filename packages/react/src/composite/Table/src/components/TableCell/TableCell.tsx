import React from "react";
import { table } from "@nimbus-ds/styles";

import { TableCellProps } from "./tableCell.types";

const TableCell: React.FC<TableCellProps> = ({
  className: _className,
  style: _style,
  children,
  padding = "small",
  as: As = "td",
  ...rest
}: TableCellProps) => {
  const { className, style, otherProps } = table.sprinkle({
    ...(rest as Parameters<typeof table.sprinkle>[0]),
    padding,
  });

  return (
    <As
      {...otherProps}
      style={style}
      className={[table.classnames.container__cell, className].join(" ")}
    >
      {children}
    </As>
  );
};

export { TableCell };

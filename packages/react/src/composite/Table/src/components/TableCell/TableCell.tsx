import React from "react";
import { table } from "@nimbus-ds/styles";

import { TableCellProps } from "./tableCell.types";

const TableCell: React.FC<TableCellProps> = ({
  className: _className,
  style: _style,
  children,
  padding = "small",
  ...rest
}: TableCellProps) => {
  const { className, style, otherProps } = table.sprinkle({
    ...(rest as Parameters<typeof table.sprinkle>[0]),
    padding,
  });

  return (
    <td
      {...otherProps}
      style={style}
      className={[table.classnames.cell, className].join(" ")}
    >
      {children}
    </td>
  );
};

export { TableCell };

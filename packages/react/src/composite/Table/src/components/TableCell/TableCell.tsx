import React from "react";
import { table } from "@nimbus-ds/styles";

import { TableCellProps } from "./tableCell.types";
import { useTableContext } from "../../contexts";

const TableCell: React.FC<TableCellProps> = ({
  className: _className,
  style: _style,
  children,
  padding = "small",
  as: As = "td",
  column,
  ...rest
}: TableCellProps) => {
  const tableContext = useTableContext();

  const { className, style, otherProps } = table.sprinkle({
    ...(rest as Parameters<typeof table.sprinkle>[0]),
    padding,
  });

  const columnLayout =
    column !== undefined ? tableContext?.columnLayout?.[column] : undefined;

  const cellStyle: React.CSSProperties = {
    ...style,
    minWidth: columnLayout?.minWidth,
  };

  return (
    <As
      {...otherProps}
      style={cellStyle}
      className={[table.classnames.container__cell, className].join(" ")}
    >
      {children}
    </As>
  );
};

export { TableCell };

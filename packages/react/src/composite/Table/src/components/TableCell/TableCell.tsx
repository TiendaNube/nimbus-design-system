import React from "react";
import { table } from "@nimbus-ds/styles";

import type { TableCellProps } from "./tableCell.types";
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

  const fixedOffset =
    column !== undefined
      ? tableContext?.fixedColumnOffsets?.get(column)
      : undefined;

  const cellStyle: React.CSSProperties = {
    ...style,
    width: columnLayout?.width,
    minWidth: columnLayout?.minWidth,
    ...(fixedOffset && {
      [fixedOffset.side]: fixedOffset.offset,
    }),
  };

  const cellClassName = [
    table.classnames.container__cell,
    fixedOffset && table.classnames.container__cell_fixed,
    fixedOffset?.side === "left" && table.classnames.container__cell_fixed_left,
    fixedOffset?.side === "right" &&
      table.classnames.container__cell_fixed_right,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <As {...otherProps} style={cellStyle} className={cellClassName}>
      {children}
    </As>
  );
};

export { TableCell };

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
  const useGridMode = tableContext?.useCustomSizes;

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

  const usesMinOrMaxWidth = columnLayout?.minWidth || columnLayout?.maxWidth;

  const cellStyle: React.CSSProperties = {
    ...style,
    width: useGridMode ? undefined : columnLayout?.width,
    minWidth: useGridMode ? undefined : columnLayout?.minWidth,
    maxWidth: useGridMode ? undefined : columnLayout?.maxWidth,
    overflow: usesMinOrMaxWidth ? "hidden" : undefined,
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

  const content = usesMinOrMaxWidth ? (
    <div
      style={{
        maxWidth: columnLayout?.maxWidth,
        minWidth: columnLayout?.minWidth,
        wordWrap: "break-word",
        overflowWrap: "break-word",
        whiteSpace: "normal",
      }}
    >
      {children}
    </div>
  ) : (
    children
  );

  if (useGridMode) {
    const role = As === "th" ? "columnheader" : "cell";
    return (
      <div {...otherProps} role={role} style={cellStyle} className={cellClassName}>
        {content}
      </div>
    );
  }

  return (
    <As {...otherProps} style={cellStyle} className={cellClassName}>
      {content}
    </As>
  );
};

export { TableCell };

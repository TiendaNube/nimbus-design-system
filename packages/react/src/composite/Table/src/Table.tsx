import React, { useMemo } from "react";
import { table } from "@nimbus-ds/styles";

import { TableProps, TableComponents, TableColumnLayout } from "./table.types";
import { TableBody, TableCell, TableHead, TableRow } from "./components";
import { TableContext, TableContextValue } from "./contexts";

const Table: React.FC<TableProps> & TableComponents = ({
  className: _className,
  style: _style,
  children,
  columnLayout,
  ...rest
}: TableProps) => {
  const getEffectiveFixedWidth = (
    column: TableColumnLayout
  ): string | undefined => {
    if (column.width) return column.width;
    return undefined;
  };

  const fixedWidthExpression = columnLayout
    ?.map(getEffectiveFixedWidth)
    .filter(Boolean)
    .join(" + ");

  const totalGrow =
    columnLayout?.reduce((total, column) => {
      if (getEffectiveFixedWidth(column)) return total;
      const growValue = column.grow ?? 0;
      return growValue > 0 ? total + growValue : total;
    }, 0) ?? 0;

  const getGrowExpression = (growValue: number) => {
    const share = (growValue / totalGrow).toFixed(4);
    if (!fixedWidthExpression) return `100% * ${share}`;
    return `100% * ${share}`;
  };

  const getColumnWidth = (column: TableColumnLayout): string | undefined => {
    const fixedWidth = getEffectiveFixedWidth(column);
    if (fixedWidth) return fixedWidth;

    const growValue = column.grow;
    if (!totalGrow || !growValue || growValue <= 0) return undefined;

    return `calc(${getGrowExpression(growValue)})`;
  };

  const hasColumnLayout = Boolean(columnLayout?.length);

  const contextValue = useMemo<TableContextValue>(
    () => ({ columnLayout }),
    [columnLayout]
  );

  return (
    <TableContext.Provider value={contextValue}>
      <table {...rest} className={table.classnames.container}>
        {hasColumnLayout ? (
          <colgroup>
            {columnLayout?.map((column, index) => (
              <col
                key={`table-col-${index}`}
                style={{ width: getColumnWidth(column) }}
              />
            ))}
          </colgroup>
        ) : null}
        {children}
      </table>
    </TableContext.Provider>
  );
};

Table.Body = TableBody;
Table.Cell = TableCell;
Table.Head = TableHead;
Table.Row = TableRow;
Table.displayName = "Table";
Table.Body.displayName = "Table.Body";
Table.Cell.displayName = "Table.Cell";
Table.Head.displayName = "Table.Head";
Table.Row.displayName = "Table.Row";

export { Table };

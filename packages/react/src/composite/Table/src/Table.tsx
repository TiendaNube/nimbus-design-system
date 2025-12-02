import React from "react";
import { table } from "@nimbus-ds/styles";

import { TableProps, TableComponents } from "./table.types";
import { TableBody, TableCell, TableHead, TableRow } from "./components";

const Table: React.FC<TableProps> & TableComponents = ({
  className: _className,
  style: _style,
  children,
  columnLayout,
  ...rest
}: TableProps) => {
  const fixedWidthExpression = columnLayout
    ?.filter(({ width }) => Boolean(width))
    .map(({ width }) => width)
    .join(" + ");

  const totalGrow =
    columnLayout?.reduce((total, column) => {
      if (column.width) return total;
      const growValue = column.grow ?? 0;
      return growValue > 0 ? total + growValue : total;
    }, 0) ?? 0;

  const getGrowWidth = (growValue?: number) => {
    if (!totalGrow || !growValue || growValue <= 0) return undefined;
    const share = (growValue / totalGrow).toFixed(4);

    if (!fixedWidthExpression) return `calc(100% * ${share})`;
    return `calc((100% - (${fixedWidthExpression})) * ${share})`;
  };

  const hasColumnLayout = Boolean(columnLayout?.length);

  return (
    <table {...rest} className={table.classnames.container}>
      {hasColumnLayout ? (
        <colgroup>
          {columnLayout?.map((column, index) => {
            const width = column.width ?? getGrowWidth(column.grow);

            return (
              <col
                key={`table-col-${index}`}
                style={{
                  width,
                  minWidth: column.minWidth,
                  maxWidth: column.maxWidth,
                }}
              />
            );
          })}
        </colgroup>
      ) : null}
      {children}
    </table>
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

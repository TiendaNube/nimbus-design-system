import React, { useMemo } from "react";
import { table } from "@nimbus-ds/styles";

import { TableProps, TableComponents } from "./table.types";
import { TableBody, TableCell, TableHead, TableRow } from "./components";
import { TableContext, TableContextValue } from "./contexts";
import { getEffectiveFixedWidth, getColumnWidth } from "./Table.definitions";

const Table: React.FC<TableProps> & TableComponents = ({
  className: _className,
  style: _style,
  children,
  columnLayout,
  ...rest
}: TableProps) => {
  const totalGrowValue = useMemo(
    () =>
      columnLayout?.reduce((total, column) => {
        if (getEffectiveFixedWidth(column)) return total;

        const growValue = column.grow ?? 0;
        return growValue > 0 ? total + growValue : total;
      }, 0) ?? 0,
    [columnLayout]
  );

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
            {columnLayout?.map((column) => (
              <col
                key={`table-col-${column.id}`}
                style={{ width: getColumnWidth(column, totalGrowValue) }}
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

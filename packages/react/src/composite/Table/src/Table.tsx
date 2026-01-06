import React, { useMemo } from "react";
import { table } from "@nimbus-ds/styles";

import { TableProps, TableComponents } from "./table.types";
import { TableBody, TableCell, TableHead, TableRow } from "./components";
import { TableContext, TableContextValue } from "./contexts";
import { calculateFixedColumnOffsets } from "./Table.definitions";

const Table: React.FC<TableProps> & TableComponents = ({
  className: _className,
  style: _style,
  children,
  columnLayout,
  minWidth,
  maxWidth,
  useCustomSizes = false,
  ...rest
}: TableProps) => {
  const fixedColumnOffsets = useMemo(
    () => calculateFixedColumnOffsets(columnLayout),
    [columnLayout]
  );

  const contextValue = useMemo<TableContextValue>(
    () => ({ columnLayout, fixedColumnOffsets, useCustomSizes }),
    [columnLayout, fixedColumnOffsets, useCustomSizes]
  );

  const tableStyle = useMemo(
    () => ({
      minWidth,
      maxWidth,
    }),
    [minWidth, maxWidth]
  );

  if (useCustomSizes) {
    return (
      <TableContext.Provider value={contextValue}>
        <div className={table.classnames.container__wrapper}>
          <div
            {...rest}
            role="table"
            className={table.classnames.container__grid}
            style={tableStyle}
          >
            {children}
          </div>
        </div>
      </TableContext.Provider>
    );
  }

  return (
    <TableContext.Provider value={contextValue}>
      <div className={table.classnames.container__wrapper}>
        <table
          {...rest}
          className={table.classnames.container}
          style={tableStyle}
        >
          {children}
        </table>
      </div>
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

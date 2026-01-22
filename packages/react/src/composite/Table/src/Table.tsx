import React, {
  useMemo,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { table } from "@nimbus-ds/styles";

import { TableProps, TableComponents } from "./table.types";
import { TableBody, TableCell, TableHead, TableRow } from "./components";
import { TableContext, TableContextValue } from "./contexts";
import {
  getEffectiveFixedWidth,
  getColumnWidth,
  calculateFixedColumnOffsets,
} from "./Table.definitions";

const Table: React.FC<TableProps> & TableComponents = ({
  className: _className,
  style: _style,
  children,
  columnLayout,
  minWidth,
  maxWidth,
  ...rest
}: TableProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hasScrolledLeft, setHasScrolledLeft] = useState(false);
  const [hasScrolledRight, setHasScrolledRight] = useState(false);

  const totalGrowValue = useMemo(
    () =>
      columnLayout?.reduce((total, column) => {
        if (getEffectiveFixedWidth(column)) return total;

        const growValue = column.grow ?? 0;
        return growValue > 0 ? total + growValue : total;
      }, 0) ?? 0,
    [columnLayout]
  );

  const fixedColumnOffsets = useMemo(
    () => calculateFixedColumnOffsets(columnLayout),
    [columnLayout]
  );

  const hasFixedColumns = fixedColumnOffsets !== undefined;
  const hasColumnLayout = Boolean(columnLayout?.length);

  const checkScrollPosition = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const { scrollLeft, scrollWidth, clientWidth } = wrapper;
    const maxScrollLeft = scrollWidth - clientWidth;

    setHasScrolledLeft(scrollLeft > 0);
    setHasScrolledRight(scrollLeft < maxScrollLeft - 1);
  }, []);

  useEffect(() => {
    if (!hasFixedColumns) return undefined;

    const wrapper = wrapperRef.current;
    if (!wrapper) return undefined;

    checkScrollPosition();
    wrapper.addEventListener("scroll", checkScrollPosition, { passive: true });

    const resizeObserver = new ResizeObserver(checkScrollPosition);
    resizeObserver.observe(wrapper);

    return () => {
      wrapper.removeEventListener("scroll", checkScrollPosition);
      resizeObserver.disconnect();
    };
  }, [checkScrollPosition, hasFixedColumns]);

  const contextValue = useMemo<TableContextValue>(
    () => ({ columnLayout, fixedColumnOffsets }),
    [columnLayout, fixedColumnOffsets]
  );

  const tableStyle = useMemo(
    () => ({
      minWidth,
      maxWidth,
    }),
    [minWidth, maxWidth]
  );

  return (
    <TableContext.Provider value={contextValue}>
      <div
        ref={wrapperRef}
        className={table.classnames.container__wrapper}
        data-scroll-left={hasScrolledLeft || undefined}
        data-scroll-right={hasScrolledRight || undefined}
      >
        <table
          {...rest}
          className={table.classnames.container}
          style={tableStyle}
        >
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

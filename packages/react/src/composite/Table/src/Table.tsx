import React, { useMemo, useRef, useEffect } from "react";
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
  stickyScrollbar = false,
  ...rest
}: TableProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollbarTrackRef = useRef<HTMLDivElement>(null);
  const scrollbarInnerRef = useRef<HTMLDivElement>(null);
  const isSyncingRef = useRef(false);

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

  const hasColumnLayout = Boolean(columnLayout?.length);

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

  useEffect(() => {
    if (!stickyScrollbar) return undefined;

    const wrapper = wrapperRef.current;
    const track = scrollbarTrackRef.current;
    const inner = scrollbarInnerRef.current;
    if (!wrapper || !track || !inner) return undefined;

    const updateScrollbarWidth = () => {
      inner.style.width = `${wrapper.scrollWidth}px`;
    };

    const syncScrollFromWrapper = () => {
      if (isSyncingRef.current) return;
      isSyncingRef.current = true;
      track.scrollLeft = wrapper.scrollLeft;
      requestAnimationFrame(() => {
        isSyncingRef.current = false;
      });
    };

    const syncScrollFromTrack = () => {
      if (isSyncingRef.current) return;
      isSyncingRef.current = true;
      wrapper.scrollLeft = track.scrollLeft;
      requestAnimationFrame(() => {
        isSyncingRef.current = false;
      });
    };

    wrapper.addEventListener("scroll", syncScrollFromWrapper);
    track.addEventListener("scroll", syncScrollFromTrack);

    window.addEventListener("resize", updateScrollbarWidth, { passive: true });

    const resizeObserver = new ResizeObserver(updateScrollbarWidth);
    resizeObserver.observe(wrapper);

    updateScrollbarWidth();

    return () => {
      wrapper.removeEventListener("scroll", syncScrollFromWrapper);
      track.removeEventListener("scroll", syncScrollFromTrack);
      window.removeEventListener("resize", updateScrollbarWidth);
      resizeObserver.disconnect();
    };
  }, [stickyScrollbar]);

  const wrapperClassName = stickyScrollbar
    ? `${table.classnames.container__wrapper} ${table.classnames.container__wrapper_hidden_scrollbar}`
    : table.classnames.container__wrapper;

  return (
    <TableContext.Provider value={contextValue}>
      <div ref={wrapperRef} className={wrapperClassName}>
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
      {stickyScrollbar && (
        <div
          className={table.classnames.sticky_scrollbar_footer}
          data-testid="table-sticky-scrollbar"
        >
          <div
            ref={scrollbarTrackRef}
            className={table.classnames.sticky_scrollbar_track}
          >
            <div
              ref={scrollbarInnerRef}
              className={table.classnames.sticky_scrollbar_inner}
            />
          </div>
        </div>
      )}
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

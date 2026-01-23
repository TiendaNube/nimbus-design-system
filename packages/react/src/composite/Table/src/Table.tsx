import React, { useMemo, useRef, useEffect, useCallback } from "react";
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
  const scrollbarFooterRef = useRef<HTMLDivElement>(null);
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

  const updateScrollbarWidth = useCallback(() => {
    const wrapper = wrapperRef.current;
    const inner = scrollbarInnerRef.current;
    if (!wrapper || !inner) return;
    inner.style.width = `${wrapper.scrollWidth}px`;
  }, []);

  const createScrollHandler = useCallback(
    (source: HTMLElement, target: HTMLElement) => () => {
      if (isSyncingRef.current) return;
      isSyncingRef.current = true;
      target.scrollLeft = source.scrollLeft;
      requestAnimationFrame(() => {
        isSyncingRef.current = false;
      });
    },
    []
  );

  useEffect(() => {
    if (!stickyScrollbar) return undefined;

    const wrapper = wrapperRef.current;
    const track = scrollbarTrackRef.current;
    if (!wrapper || !track) return undefined;

    const wrapperToTrack = createScrollHandler(wrapper, track);
    const trackToWrapper = createScrollHandler(track, wrapper);

    wrapper.addEventListener("scroll", wrapperToTrack);
    track.addEventListener("scroll", trackToWrapper);

    const handleUpdate = () => {
      updateScrollbarWidth();
    };

    const findScrollableAncestors = (element: HTMLElement | null): HTMLElement[] => {
      const ancestors: HTMLElement[] = [];
      let current = element?.parentElement;
      while (current) {
        const style = window.getComputedStyle(current);
        const overflowY = style.overflowY;
        if (overflowY === "auto" || overflowY === "scroll") {
          ancestors.push(current);
        }
        current = current.parentElement;
      }
      return ancestors;
    };

    const scrollableAncestors = findScrollableAncestors(wrapper);
    scrollableAncestors.forEach((ancestor) => {
      ancestor.addEventListener("scroll", handleUpdate, { passive: true });
    });

    const intersectionObserver = new IntersectionObserver(handleUpdate, {
      root: null,
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    });
    intersectionObserver.observe(wrapper);

    window.addEventListener("scroll", handleUpdate, { passive: true });
    window.addEventListener("resize", handleUpdate, { passive: true });

    const resizeObserver = new ResizeObserver(handleUpdate);
    resizeObserver.observe(wrapper);

    handleUpdate();

    return () => {
      wrapper.removeEventListener("scroll", wrapperToTrack);
      track.removeEventListener("scroll", trackToWrapper);
      scrollableAncestors.forEach((ancestor) => {
        ancestor.removeEventListener("scroll", handleUpdate);
      });
      intersectionObserver.disconnect();
      window.removeEventListener("scroll", handleUpdate);
      window.removeEventListener("resize", handleUpdate);
      resizeObserver.disconnect();
    };
  }, [stickyScrollbar, createScrollHandler, updateScrollbarWidth]);

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
          ref={scrollbarFooterRef}
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

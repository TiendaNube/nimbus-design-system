import React, {
  useMemo,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { table } from "@nimbus-ds/styles";

import { type TableProps, type TableComponents } from "./table.types";
import { TableBody, TableCell, TableHead, TableRow } from "./components";
import { TableContext, type TableContextValue } from "./contexts";
import {
  getEffectiveFixedWidth,
  getColumnWidth,
  calculateFixedColumnOffsets,
} from "./Table.definitions";

/** Minimum scroll difference (px) for the sticky scrollbar to sync. */
const SCROLL_SYNC_TOLERANCE = 1;

const Table: React.FC<TableProps> & TableComponents = ({
  className,
  style: _style,
  children,
  columnLayout,
  minWidth,
  maxWidth,
  stickyScrollbar = false,
  borderRadius = "2",
  ...rest
}: TableProps) => {
  const { className: wrapperSprinkleClassName, style: wrapperSprinkleStyle } =
    table.wrapper.sprinkle({ borderRadius });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const [scrollState, setScrollState] = useState({
    left: false,
    right: false,
  });
  const scrollbarTrackRef = useRef<HTMLDivElement>(null);
  const scrollbarInnerRef = useRef<HTMLDivElement>(null);

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
    const maxScroll = scrollWidth - clientWidth;

    setScrollState((prev) => {
      const left = scrollLeft > 0;
      const right = scrollLeft < maxScroll - 1; // -1 accounts for subpixel rounding
      if (prev.left === left && prev.right === right) return prev;
      return { left, right };
    });
  }, []);

  const updateScrollbarWidth = useCallback(() => {
    const wrapper = wrapperRef.current;
    const inner = scrollbarInnerRef.current;
    if (!wrapper || !inner) return;
    inner.style.width = `${wrapper.scrollWidth}px`;
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!hasFixedColumns || !wrapper) return undefined;

    checkScrollPosition();
    wrapper.addEventListener("scroll", checkScrollPosition, { passive: true });

    return () => {
      wrapper.removeEventListener("scroll", checkScrollPosition);
    };
  }, [checkScrollPosition, hasFixedColumns]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || (!hasFixedColumns && !stickyScrollbar)) return undefined;

    const handleResize = () => {
      if (hasFixedColumns) checkScrollPosition();
      if (stickyScrollbar) updateScrollbarWidth();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(wrapper);
    if (tableRef.current) {
      resizeObserver.observe(tableRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [
    hasFixedColumns,
    stickyScrollbar,
    checkScrollPosition,
    updateScrollbarWidth,
  ]);

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
    if (!wrapper || !track) return undefined;

    /**
     * Writing `scrollLeft` on one element fires a scroll event on it a frame
     * later (an "echo" of the sync). With slow trackpad scrolling the other
     * element has already moved on by then, so copying the echo back makes
     * both elements fight and the table jitters. Each side remembers the value
     * it was given and ignores the event that only reports it (within 1px, to
     * allow sub-pixel rounding). Positions already within 1px are not synced.
     */
    let expectedWrapperLeft: number | null = null;
    let expectedTrackLeft: number | null = null;

    const isEcho = (actual: number, expected: number | null) =>
      expected !== null && Math.abs(actual - expected) < SCROLL_SYNC_TOLERANCE;

    const isInSync = () =>
      Math.abs(track.scrollLeft - wrapper.scrollLeft) < SCROLL_SYNC_TOLERANCE;

    const syncScrollFromWrapper = () => {
      const echo = isEcho(wrapper.scrollLeft, expectedWrapperLeft);
      expectedWrapperLeft = null;
      if (echo || isInSync()) return;
      expectedTrackLeft = wrapper.scrollLeft;
      track.scrollLeft = wrapper.scrollLeft;
    };

    const syncScrollFromTrack = () => {
      const echo = isEcho(track.scrollLeft, expectedTrackLeft);
      expectedTrackLeft = null;
      if (echo || isInSync()) return;
      expectedWrapperLeft = track.scrollLeft;
      wrapper.scrollLeft = track.scrollLeft;
    };

    wrapper.addEventListener("scroll", syncScrollFromWrapper);
    track.addEventListener("scroll", syncScrollFromTrack);
    window.addEventListener("resize", updateScrollbarWidth, { passive: true });

    updateScrollbarWidth();

    return () => {
      wrapper.removeEventListener("scroll", syncScrollFromWrapper);
      track.removeEventListener("scroll", syncScrollFromTrack);
      window.removeEventListener("resize", updateScrollbarWidth);
    };
  }, [stickyScrollbar, updateScrollbarWidth]);

  const wrapperClassName = [
    table.classnames.container__wrapper,
    stickyScrollbar && table.classnames.container__wrapper_hidden_scrollbar,
    wrapperSprinkleClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <TableContext.Provider value={contextValue}>
      <div
        ref={wrapperRef}
        className={wrapperClassName}
        style={wrapperSprinkleStyle}
        data-scroll-left={scrollState.left || undefined}
        data-scroll-right={scrollState.right || undefined}
      >
        <table
          ref={tableRef}
          {...rest}
          className={[className, table.classnames.container]
            .filter(Boolean)
            .join(" ")}
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

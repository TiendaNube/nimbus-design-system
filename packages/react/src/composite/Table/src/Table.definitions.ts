import { TableColumnLayout } from "./table.types";
import { FixedColumnOffset } from "./contexts/TableContext/tableContext.types";

const getEffectiveFixedWidth = (
  column: TableColumnLayout
): string | undefined => {
  if (column.width) return column.width;
  return undefined;
};

const getColumnWidth = (
  column: TableColumnLayout,
  totalGrow: number
): string | undefined => {
  const fixedWidth = getEffectiveFixedWidth(column);
  if (fixedWidth) return fixedWidth;

  const growValue = column.grow;
  if (!totalGrow || !growValue || growValue <= 0) return undefined;

  const share = (growValue / totalGrow).toFixed(4);

  return `calc(100% * ${share})`;
};

/**
 * Parses a width value to pixels. Only supports px values currently.
 */
const parseWidthToPx = (width: string): number | undefined => {
  const widthValue = parseFloat(width);
  return Number.isNaN(widthValue) ? undefined : widthValue;
};

/**
 * Calculates cumulative offsets for fixed (sticky) columns on both left and right sides.
 * Fixed columns require a width to calculate proper positioning.
 *
 * @param columnLayout - Array of column layout definitions
 * @returns Map of column index to FixedColumnOffset (offset value and side)
 */
const calculateFixedColumnOffsets = (
  columnLayout?: TableColumnLayout[]
): Map<number, FixedColumnOffset> | undefined => {
  if (!columnLayout?.length) return undefined;

  const hasFixedColumns = columnLayout.some((col) => col.fixed);
  if (!hasFixedColumns) return undefined;

  const offsets = new Map<number, FixedColumnOffset>();

  // Calculate left-side fixed columns (iterate left to right)
  let leftCumulativeOffset = 0;
  columnLayout.forEach((column, index) => {
    if (column.fixed === "left") {
      offsets.set(index, {
        offset: `${leftCumulativeOffset}px`,
        side: "left",
      });
    }

    // Add this column's width to cumulative offset for subsequent left-fixed columns
    if (column.width) {
      const widthValue = parseWidthToPx(column.width);
      if (widthValue !== undefined) {
        leftCumulativeOffset += widthValue;
      }
    }
  });

  // Calculate right-side fixed columns (iterate right to left)
  let rightCumulativeOffset = 0;
  for (let index = columnLayout.length - 1; index >= 0; index--) {
    const column = columnLayout[index];

    if (column.fixed === "right") {
      offsets.set(index, {
        offset: `${rightCumulativeOffset}px`,
        side: "right",
      });
    }

    // Add this column's width to cumulative offset for subsequent right-fixed columns
    if (column.width) {
      const widthValue = parseWidthToPx(column.width);
      if (widthValue !== undefined) {
        rightCumulativeOffset += widthValue;
      }
    }
  }

  return offsets.size > 0 ? offsets : undefined;
};

export { getEffectiveFixedWidth, getColumnWidth, calculateFixedColumnOffsets };

import { TableColumnLayout } from "./table.types";

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
 * Calculates cumulative left offsets for fixed (sticky) columns.
 * Fixed columns require a width to calculate proper positioning.
 *
 * @param columnLayout - Array of column layout definitions
 * @returns Map of column index to CSS left offset value
 */
const calculateFixedColumnOffsets = (
  columnLayout?: TableColumnLayout[]
): Map<number, string> | undefined => {
  if (!columnLayout?.length) return undefined;

  const hasFixedColumns = columnLayout.some((col) => col.fixed);
  if (!hasFixedColumns) return undefined;

  const offsets = new Map<number, string>();
  let cumulativeOffset = 0;

  columnLayout.forEach((column, index) => {
    if (column.fixed) {
      // Store the current offset for this fixed column
      offsets.set(index, `${cumulativeOffset}px`);
    }

    // Add this column's width to cumulative offset for subsequent fixed columns
    // Only columns with explicit width can contribute to offset calculation
    if (column.width) {
      const widthValue = parseFloat(column.width);
      if (!Number.isNaN(widthValue)) {
        cumulativeOffset += widthValue;
      }
    }
  });

  return offsets.size > 0 ? offsets : undefined;
};

export { getEffectiveFixedWidth, getColumnWidth, calculateFixedColumnOffsets };

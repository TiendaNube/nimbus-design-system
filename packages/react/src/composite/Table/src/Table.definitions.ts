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

export { getEffectiveFixedWidth, getColumnWidth };

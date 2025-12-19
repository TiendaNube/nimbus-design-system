import { TableColumnLayout } from "../../table.types";

/**
 * Pre-calculated left offset for a fixed column
 */
export interface FixedColumnOffset {
  /**
   * The column index
   */
  columnIndex: number;
  /**
   * The CSS left value for sticky positioning
   */
  left: string;
}

/**
 * Context value provided by Table to share column layout constraints with cell components
 */
export interface TableContextValue {
  /**
   * Column layout definitions to apply minWidth constraint to cells
   */
  columnLayout?: TableColumnLayout[];
  /**
   * Pre-calculated left offsets for fixed columns, indexed by column position
   */
  fixedColumnOffsets?: Map<number, string>;
}

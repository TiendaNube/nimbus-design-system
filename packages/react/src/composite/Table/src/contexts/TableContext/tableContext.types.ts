import { type TableColumnLayout } from "../../table.types";

/**
 * Pre-calculated offset and direction for a fixed column
 */
export interface FixedColumnOffset {
  /**
   * The CSS offset value for sticky positioning
   */
  offset: string;
  /**
   * The side the column is fixed to
   */
  side: "left" | "right";
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
   * Pre-calculated offsets for fixed columns, indexed by column position
   */
  fixedColumnOffsets?: Map<number, FixedColumnOffset>;
}

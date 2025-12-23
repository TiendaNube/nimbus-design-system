import { TableColumnLayout } from "../../table.types";

/**
 * Context value provided by Table to share column layout constraints with cell components
 */
export interface TableContextValue {
  /**
   * Column layout definitions to apply minWidth constraint to cells
   */
  columnLayout?: TableColumnLayout[];
}

import { createContext, useContext } from "react";
import { type TableContextValue } from "./tableContext.types";

/**
 * Context for Table to communicate column layout constraints with TableCell components
 */
export const TableContext = createContext<TableContextValue | null>(null);

/**
 * Hook to access Table context for column layout constraints.
 * Returns null if used outside of a Table - this is intentional to allow
 * TableCell to work both inside and outside Table context.
 */
export const useTableContext = (): TableContextValue | null =>
  useContext(TableContext);

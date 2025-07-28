import { createContext, useContext } from "react";
import { SegmentedControlContextValue } from "./SegmentedControl.types";

/**
 * Context for SegmentedControl to communicate with SegmentedControlButton components
 */
export const SegmentedControlContext = createContext<SegmentedControlContextValue | null>(null);

/**
 * Hook to use SegmentedControl context
 * @returns Context value or null if not within a SegmentedControl
 */
export const useSegmentedControlContext = (): SegmentedControlContextValue | null => useContext(SegmentedControlContext);

/**
 * Hook to use SegmentedControl context with error if not found
 * @throws Error if not within a SegmentedControl
 */
export const useSegmentedControlContextRequired = (): SegmentedControlContextValue => {
  const context = useContext(SegmentedControlContext);
  if (!context) {
    throw new Error("useSegmentedControlContextRequired must be used within a SegmentedControl");
  }
  return context;
}; 

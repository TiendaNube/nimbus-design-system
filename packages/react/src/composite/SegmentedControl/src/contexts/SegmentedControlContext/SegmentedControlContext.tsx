import { createContext, useContext } from "react";
import { type SegmentedControlContextValue } from "./SegmentedControlContext.types";

/**
 * Context for SegmentedControl to communicate with SegmentedControlButton components
 */
export const SegmentedControlContext =
  createContext<SegmentedControlContextValue | null>(null);

/**
 * Hook to use SegmentedControl context with error if not found
 * @throws Error if not within a SegmentedControl
 */
export const useSegmentedControlContext = (): SegmentedControlContextValue => {
  const context = useContext(SegmentedControlContext);
  if (!context) {
    throw new Error(
      "useSegmentedControlContext must be used within a SegmentedControl"
    );
  }
  return context;
};

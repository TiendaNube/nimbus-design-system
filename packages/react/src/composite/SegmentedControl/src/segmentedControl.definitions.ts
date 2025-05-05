import { ControlledSegmentedControlProperties } from "./SegmentedControl.types";

/**
 * Generates a unique ID from a name for ARIA attributes
 * @param name - The name to generate an ID from
 * @returns A lowercase ID with spaces replaced by hyphens
 */
export const generateID = (name: string) =>
  name.toLowerCase().replace(" ", "-");

/**
 * Checks if the segmented control is in controlled mode.
 * @param props - The props of the segmented control
 * @returns True if the segmented control is controlled, false otherwise
 */
export const isControlled = (
  props: any
): props is ControlledSegmentedControlProperties =>
  "selected" in props && "onSegmentSelect" in props; 
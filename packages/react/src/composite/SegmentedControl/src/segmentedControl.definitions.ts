import type { ControlledSegmentedControlProperties } from "./SegmentedControl.types";

/**
 * Checks if the segmented control is in controlled mode.
 * @param props - The props of the segmented control
 * @returns True if the segmented control is controlled, false otherwise
 */
export const isControlled = (
  props: any
): props is ControlledSegmentedControlProperties => "selectedSegments" in props;

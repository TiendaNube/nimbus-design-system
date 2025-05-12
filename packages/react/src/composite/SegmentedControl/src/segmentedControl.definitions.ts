import { SegmentedControlButtonProps } from "./components";
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
  "selectedSegments" in props && "onSegmentsSelect" in props;

/**
 * Checks if the component is a button, depending on the props.
 * @param props - The props of the segmented control children component
 * @returns True if the component is a button, false otherwise
 */
export const isButton = (props: any): props is SegmentedControlButtonProps =>
  "label" in props;

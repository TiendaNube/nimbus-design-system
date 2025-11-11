import { ControlledAccordionProperties } from "./accordion.types";

/**
 * Checks if the accordion is in controlled mode.
 * @param props - The props of the accordion
 * @returns True if the accordion is controlled, false otherwise
 */
export const isControlled = (
  props: any
): props is ControlledAccordionProperties => "selectedItem" in props;

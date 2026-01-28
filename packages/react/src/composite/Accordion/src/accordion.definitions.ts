import type {
  ControlledAccordionProperties,
  UncontrolledAccordionProperties,
} from "./accordion.types";

/**
 * Checks if the accordion is in controlled mode.
 * @param props - The props of the accordion
 * @returns True if the accordion is controlled, false otherwise
 */
export const isControlled = (
  props: UncontrolledAccordionProperties | ControlledAccordionProperties
): props is ControlledAccordionProperties => "selectedItem" in props;

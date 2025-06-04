import { ControlledStepperProperties } from "./stepper.types";

/**
 * Checks if the stepper is in controlled mode.
 * @param props - The props of the stepper
 * @returns True if the stepper is controlled, false otherwise
 */
export const isControlled = (
  props: any
): props is ControlledStepperProperties =>
  "selectedStep" in props && "onSelect" in props; 
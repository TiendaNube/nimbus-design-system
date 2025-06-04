import { HTMLAttributes } from "react";

/**
 * Represents the visual state of a step
 */
export type StepState = "completed" | "current" | "pending";

export interface StepperItemProperties {
  /**
   * The step number (1-based index) for this item.
   * This is automatically assigned by the parent Stepper component.
   */
  step: number;
  /**
   * The label text to display for this step
   */
  label?: string;
}

export type StepperItemProps = StepperItemProperties & HTMLAttributes<HTMLElement>; 
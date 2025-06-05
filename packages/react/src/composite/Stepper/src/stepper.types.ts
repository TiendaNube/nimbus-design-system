import { ReactNode } from "react";
import { StepperItemProps } from "./components/StepperItem";
import { StepperCardProps } from "./components/StepperCard";
import { BoxProps } from "@nimbus-ds/box";

export interface StepperComponents {
  Item: React.FC<Omit<StepperItemProps, "step">>;
  Card: React.FC<StepperCardProps>;
}

export interface BaseStepperProperties {
  /**
   * The currently active step (1-based index).
   * Steps before this will be marked as completed.
   */
  activeStep: number;
  /**
   * The content of the stepper (StepperItem components).
   * Total steps will be calculated automatically based on the number of children.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export interface ControlledStepperProperties extends BaseStepperProperties {
  /**
   * The currently selected step (1-based index).
   * This step will be visually highlighted to show user selection.
   */
  selectedStep: number;
  /**
   * Callback called when a step is selected.
   * Receives the step number (1-based index) as parameter.
   */
  onSelectStep: (step: number) => void;
}

/**
 * Props for the Stepper component, supporting both controlled and uncontrolled modes
 */
export type StepperProps = (BaseStepperProperties | ControlledStepperProperties) & Omit<BoxProps, "display" | "flexWrap" | "gap">;

// For docs purposes, we need to merge the two types
export type StepperProperties = BaseStepperProperties & ControlledStepperProperties;

// Re-export types from components for convenience
export type { StepperItemProps, StepState } from "./components/StepperItem";
export type { StepperCardProps } from "./components/StepperCard"; 

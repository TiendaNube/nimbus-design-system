/**
 * Context value provided by StepperContext to share state between stepper components
 */
export interface StepperContextValue {
  /**
   * The total number of steps in the stepper
   */
  totalSteps: number;
  /**
   * The currently active step (1-based index)
   */
  activeStep: number;
  /**
   * The currently selected step (1-based index)
   */
  selectedStep?: number;
  /**
   * Callback to handle step selection
   */
  onSelect?: (step: number) => void;
} 
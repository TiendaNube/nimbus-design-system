import { createContext } from "react";
import { StepperContextValue } from "./stepperContext.types";

export const StepperContext = createContext<StepperContextValue>({
  totalSteps: 1,
  activeStep: 1,
  selectedStep: undefined,
  onSelect: undefined,
}); 
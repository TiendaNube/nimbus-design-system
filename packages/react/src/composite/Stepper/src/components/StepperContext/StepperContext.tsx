import { createContext } from "react";
import { type StepperContextValue } from "./stepperContext.types";

export const StepperContext = createContext<StepperContextValue>({
  totalSteps: 1,
  activeStep: 0,
  selectedStep: undefined,
  onSelect: undefined,
});

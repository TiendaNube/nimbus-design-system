import React from "react";
import { Card } from "@nimbus-ds/card";

import { StepperCardProps } from "./stepperCard.types";

/**
 * StepperCard is a container component that wraps content in a Card component.
 * It provides consistent styling and spacing for stepper-related content.
 * Uses the design system's Card component with small padding for optimal layout.
 */
const StepperCard: React.FC<StepperCardProps> = ({ children }) => {
  return <Card padding="small">{children}</Card>;
};

StepperCard.displayName = "Stepper.Card";

export { StepperCard }; 

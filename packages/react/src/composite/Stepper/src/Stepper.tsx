import React, { useEffect, useState } from "react";

import {
  StepperProps,
  StepperComponents,
  ControlledStepperProperties,
} from "./stepper.types";
import { StepperItem, StepperCard, StepperContext } from "./components";
import { isControlled } from "./stepper.definitions";
import { Box, BoxProps } from "@nimbus-ds/box";

/**
 * Stepper component guides users through a multi-step process,
 * showing their progress and allowing navigation between completed steps.
 * Total steps are automatically calculated based on the number of children.
 * Step numbers are automatically assigned based on child position.
 */
const Stepper: React.FC<StepperProps> & StepperComponents = ({
  activeStep,
  children,
  ...rest
}: StepperProps) => {
  // Internal state for uncontrolled mode
  const [internalSelectedStep, setInternalSelectedStep] =
    useState<number>(activeStep);

  // Check for controlled mode
  const isControlledMode = isControlled(rest);

  // Use controlled or uncontrolled state
  const selectedStep = isControlledMode
    ? rest.selectedStep
    : internalSelectedStep;
  const handleSelect = isControlledMode
    ? rest.onSelectStep
    : setInternalSelectedStep;

  const totalSteps = React.Children.count(children);

  // Map children to automatically assign step numbers
  const mappedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      const stepIndex = index + 1; // 1-based indexing
      return React.cloneElement(child, { step: stepIndex } as any);
    }
    return child;
  });

  useEffect(() => {
    if (!isControlledMode) {
      // For uncontrolled mode, keep the selected step in sync with the active step
      setInternalSelectedStep(activeStep);
    }
  }, [activeStep]);

  // Extract controlled properties from rest to avoid passing them to div
  const {
    selectedStep: _,
    onSelectStep: __,
    ...containerProps
  } = rest as BoxProps & Partial<ControlledStepperProperties>;

  return (
    <StepperContext.Provider
      value={{
        totalSteps,
        activeStep,
        selectedStep,
        onSelect: handleSelect,
      }}
    >
      <Box
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        {...containerProps}
        display="flex"
        gap="2"
        role="progressbar"
        aria-valuenow={activeStep}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-label={`Step ${activeStep} of ${totalSteps}`}
      >
        {mappedChildren}
      </Box>
    </StepperContext.Provider>
  );
};

// @ts-ignore
Stepper.Item = StepperItem;
Stepper.Card = StepperCard;
Stepper.displayName = "Stepper";
Stepper.Item.displayName = "Stepper.Item";
Stepper.Card.displayName = "Stepper.Card";

export { Stepper };

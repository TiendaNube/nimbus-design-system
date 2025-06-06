import React, { useEffect, useMemo, useState } from "react";

import { Box, BoxProps } from "@nimbus-ds/box";
import {
  StepperProps,
  StepperComponents,
  ControlledStepperProperties,
} from "./stepper.types";
import { StepperItem, StepperCard, StepperContext } from "./components";
import { isControlled } from "./stepper.definitions";

/**
 * Stepper component guides users through a multi-step process,
 * showing their progress and allowing navigation between completed steps.
 * Total steps are automatically calculated based on the number of children.
 * Step numbers are automatically assigned based on child position.
 */
const StepperComponent: React.FC<StepperProps> = ({
  activeStep,
  children,
  ...rest
}: StepperProps) => {
  // Memoize controlled mode check to avoid recalculation on every render
  const isControlledMode = useMemo(() => isControlled(rest), [rest]);

  // Internal state for uncontrolled mode
  const [internalSelectedStep, setInternalSelectedStep] = useState<number>(activeStep);

  // Determine current selected step and handler based on control mode
  const selectedStep = isControlledMode
    ? (rest as ControlledStepperProperties).selectedStep
    : internalSelectedStep;
  
  const handleSelect = isControlledMode
    ? (rest as ControlledStepperProperties).onSelectStep
    : setInternalSelectedStep;

  const totalSteps = React.Children.count(children);

  // Map children to automatically assign step numbers
  const mappedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      const stepIndex = index; 
      return React.cloneElement(child, { step: stepIndex } as any);
    }
    return child;
  });

  // Sync internal selected step with active step in uncontrolled mode
  useEffect(() => {
    if (!isControlledMode) {
      setInternalSelectedStep(activeStep);
    }
  }, [activeStep, isControlledMode]);

  // Extract controlled properties from rest to avoid passing them to Box
  const containerProps = useMemo(() => {
    if (isControlledMode) {
      const { selectedStep: _, onSelectStep: __, ...boxProps } = rest as ControlledStepperProperties & BoxProps;
      return boxProps;
    }
    return rest as BoxProps;
  }, [rest, isControlledMode]);

  const contextValue = useMemo(
    () => ({
      totalSteps,
      activeStep,
      selectedStep,
      onSelect: handleSelect,
    }),
    [totalSteps, activeStep, selectedStep, handleSelect]
  );

  return (
    <StepperContext.Provider value={contextValue}>
      <Box
        display="flex"
        flexWrap="wrap"
        gap="2"
        justifyContent="center"
        alignItems="center"
        role="progressbar"
        aria-valuenow={activeStep + 1}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-label={`Step ${activeStep + 1} of ${totalSteps}`}
        {...containerProps}
      >
        {mappedChildren}
      </Box>
    </StepperContext.Provider>
  );
};

// Assign static properties using Object.assign to avoid complex typing issues
const Stepper = Object.assign(StepperComponent, {
  Item: StepperItem,
  Card: StepperCard,
  displayName: "Stepper",
}) as React.FC<StepperProps> & StepperComponents;

Stepper.Item.displayName = "Stepper.Item";
Stepper.Card.displayName = "Stepper.Card";

export { Stepper };

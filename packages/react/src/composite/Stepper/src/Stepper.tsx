import React, { useState } from "react";
import { stepper } from "@nimbus-ds/styles";

import { StepperProps, StepperComponents } from "./stepper.types";
import { StepperItem, StepperContext } from "./components";
import { isControlled } from "./stepper.definitions";

/**
 * Stepper component guides users through a multi-step process,
 * showing their progress and allowing navigation between completed steps.
 * Total steps are automatically calculated based on the number of children.
 * Step numbers are automatically assigned based on child position.
 * 
 * Supports both controlled and uncontrolled modes:
 * - Uncontrolled: Pass only activeStep, component manages selectedStep internally
 * - Controlled: Pass both selectedStep and onSelect for full control
 * 
 * @example
 * // Uncontrolled
 * <Stepper activeStep={2}>
 *   <Stepper.Item label="Select audience" />
 *   <Stepper.Item label="Create content" />
 * </Stepper>
 * 
 * // Controlled
 * <Stepper activeStep={2} selectedStep={selectedStep} onSelect={setSelectedStep}>
 *   <Stepper.Item label="Select audience" />
 *   <Stepper.Item label="Create content" />
 * </Stepper>
 */
const Stepper: React.FC<StepperProps> & StepperComponents = ({
  activeStep,
  children,
  ...rest
}: StepperProps) => {
  // Internal state for uncontrolled mode
  const [internalSelectedStep, setInternalSelectedStep] = useState<number>(activeStep);

  // Check for controlled mode
  const isControlledMode = isControlled(rest);

  // Use controlled or uncontrolled state
  const selectedStep = isControlledMode ? rest.selectedStep : internalSelectedStep;
  const handleSelect = isControlledMode ? rest.onSelect : setInternalSelectedStep;

  const totalSteps = React.Children.count(children);

  // Map children to automatically assign step numbers
  const mappedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      const stepIndex = index + 1; // 1-based indexing
      return React.cloneElement(child, { step: stepIndex } as any);
    }
    return child;
  });

  // Extract controlled properties from rest to avoid passing them to div
  const { selectedStep: _, onSelect: __, ...containerProps } = rest as any;

  return (
    <StepperContext.Provider value={{ totalSteps, activeStep, selectedStep, onSelect: handleSelect }}>
      <div
        className={stepper.classnames.container}
        role="progressbar"
        aria-valuenow={activeStep}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-label={`Step ${activeStep} of ${totalSteps}`}
        {...containerProps}
      >
        {mappedChildren}
      </div>
    </StepperContext.Provider>
  );
};

// @ts-ignore
Stepper.Item = StepperItem;
Stepper.displayName = "Stepper";
Stepper.Item.displayName = "Stepper.Item";

export { Stepper }; 
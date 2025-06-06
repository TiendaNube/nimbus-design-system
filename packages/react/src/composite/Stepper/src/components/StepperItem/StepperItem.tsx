import React, { useContext, useCallback, useMemo } from "react";
import { Icon } from "@nimbus-ds/icon";
import { Text } from "@nimbus-ds/text";
import { CheckCircleIcon } from "@nimbus-ds/icons";
import { stepper } from "@nimbus-ds/styles";

import { StepperItemProps } from "./stepperItem.types";
import { StepperContext } from "../StepperContext";


enum STEP_STATE {
  CURRENT = "current",
  COMPLETED = "completed",
  SELECTED = "selected",
  PENDING = "pending",
};

/**
 * StepperItem represents a single step in the stepper component.
 * It displays the step number or check icon, label, and connecting line.
 * Step state is determined by comparing step index with activeStep from context.
 * Selected state is determined by comparing step index with selectedStep from context.
 * Step index is automatically provided by the parent Stepper component.
 * Line display is automatically handled based on step position.
 */
const StepperItem: React.FC<StepperItemProps> = ({
  className: _className,
  style: _style,
  step,
  label,
  ...rest
}: StepperItemProps) => {
  const { totalSteps, activeStep, selectedStep, onSelect } =
    useContext(StepperContext);

  // Determine step state from context
  const isCurrentStep = step === activeStep;
  const isCompletedStep = step < activeStep;
  const isSelectedStep = selectedStep === step;
  const isPendingStep = step > activeStep;

  const isLastStep = step === totalSteps;

  const handleClick = () => {
    // We can't click pending steps or already selected steps
    if (onSelect && !isPendingStep && !isSelectedStep) {
      onSelect(step);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onSelect && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      handleClick();
    }
  };

  // Determine the visual state based on context values
  const getStepState = useCallback(() => {
    if (isSelectedStep) return "selected";
    if (isCurrentStep) return "current";
    if (isCompletedStep) return "completed";
    return "pending";
  }, [isSelectedStep, isCurrentStep, isCompletedStep, isPendingStep]);

  const stepState = getStepState();

  return (
    <>
      <div
        className={[
          stepper.classnames.item,
          isPendingStep ? stepper.classnames.item_disabled : "",
        ].join(" ")}
        role="button"
        tabIndex={onSelect ? 0 : -1}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        {...rest}
      >
        <div
          className={[
            stepper.classnames.item__icon,
            stepper.classnames[`item__icon_${stepState}`],
            // isSelectedStep && stepper.classnames.item__icon_selected,
          ].join(" ")}
        >
          {isSelectedStep ? (
            <Text
              as="span"
              color="currentColor"
              fontSize="caption"
              fontWeight="medium"
            >
              {step}
            </Text>
          ) : isCompletedStep ? (
            <Icon
              source={<CheckCircleIcon size="small" />}
              color="success-textHigh"
            />
          ) : (
            <Text
              as="span"
              color="currentColor"
              fontSize="caption"
              fontWeight="medium"
            >
              {step}
            </Text>
          )}
        </div>

        {label && (
          <span
            className={[
              stepper.classnames.item__label,
              stepper.classnames[`item__label_${stepState}`],
            ].join(" ")}
          >
            {label}
          </span>
        )}
      </div>
      {!isLastStep && (
        <div className={[stepper.classnames.item__line].join(" ")} />
      )}
    </>
  );
};

StepperItem.displayName = "Stepper.Item";

export { StepperItem };

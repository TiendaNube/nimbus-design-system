import React, { useCallback, useContext, useMemo } from "react";
import { Icon } from "@nimbus-ds/icon";
import { Text } from "@nimbus-ds/text";
import { CheckCircleIcon } from "@nimbus-ds/icons";
import { stepper } from "@nimbus-ds/styles";

import { StepperItemProps } from "./stepperItem.types";
import { StepperContext } from "../StepperContext";
import { joinClassNames, StepperItemState } from "./StepperItem.definitions";

/**
 * StepperItem represents a single step in the stepper component.
 * It displays the step number or check icon, label, and connecting line.
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

  // Determine step state based on context
  const stepState = useMemo(() => {
    if (selectedStep === step) return StepperItemState.SELECTED;
    if (step === activeStep) return StepperItemState.CURRENT;
    if (step < activeStep) return StepperItemState.COMPLETED;
    return StepperItemState.PENDING;
  }, [activeStep, selectedStep, step]);

  const isPendingStep = stepState === StepperItemState.PENDING;
  const isSelectedStep = stepState === StepperItemState.SELECTED;
  const isCompletedStep = stepState === StepperItemState.COMPLETED;
  const isLastStep = step === totalSteps - 1;

  const handleInteraction = (event?: React.KeyboardEvent) => {
    if (event && event.key !== "Enter" && event.key !== " ") return;

    event?.preventDefault();

    // Only allow interaction with non-pending and non-selected steps
    if (onSelect && !isPendingStep && !isSelectedStep) {
      onSelect(step);
    }
  };

  const renderStepIcon = useCallback(() => {
    if (isCompletedStep) {
      return (
        <Icon
          source={<CheckCircleIcon size="small" />}
          color="success-textHigh"
        />
      );
    }

    return (
      <Text
        as="span"
        color="currentColor"
        fontSize="caption"
        fontWeight="medium"
      >
        {step + 1}
      </Text>
    );
  }, [isCompletedStep, step]);

  return (
    <>
      <div
        className={joinClassNames(
          stepper.classnames.item,
          isPendingStep && stepper.classnames.item_disabled
        )}
        role="button"
        tabIndex={onSelect ? 0 : -1}
        onKeyDown={handleInteraction}
        onClick={() => handleInteraction()}
        {...rest}
      >
        <div
          className={joinClassNames(
            stepper.classnames.item__icon,
            stepper.classnames[`item__icon_${stepState}`]
          )}
        >
          {renderStepIcon()}
        </div>

        {label && (
          <span
            className={joinClassNames(
              stepper.classnames.item__label,
              stepper.classnames[`item__label_${stepState}`]
            )}
          >
            {label}
          </span>
        )}
      </div>
      {!isLastStep && <div className={stepper.classnames.item__line} />}
    </>
  );
};

StepperItem.displayName = "Stepper.Item";

export { StepperItem };

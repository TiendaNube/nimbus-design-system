import React, { forwardRef, useCallback } from "react";
import { timePicker } from "@nimbus-ds/styles";
import { TimePickerOptionProps } from "../../timePicker.types";

const { classnames } = timePicker;

/**
 * TimePickerOption is a single selectable time option in dropdown mode.
 */
export const TimePickerOption = forwardRef<HTMLButtonElement, TimePickerOptionProps>(
  ({ selected, current, disabled, children, onSelect, onClick, ...rest }, ref) => {
    const getState = (): keyof typeof classnames.optionState => {
      if (disabled) return "disabled";
      if (selected) return "selected";
      if (current) return "current";
      return "default";
    };

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;
        onClick?.(event);
        onSelect?.();
      },
      [disabled, onClick, onSelect]
    );

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (disabled) return;

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect?.();
        }
      },
      [disabled, onSelect]
    );

    return (
      <button
        ref={ref}
        type="button"
        role="option"
        aria-selected={selected}
        aria-disabled={disabled}
        disabled={disabled}
        className={classnames.optionState[getState()]}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

TimePickerOption.displayName = "TimePickerOption";

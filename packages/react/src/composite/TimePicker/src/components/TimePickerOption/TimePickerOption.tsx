import React, { forwardRef, useCallback } from "react";
import { timePicker } from "@nimbus-ds/styles";
import { TimePickerOptionProps } from "../../timePicker.types";

const { classnames } = timePicker;

/**
 * TimePickerOption is a single selectable time option in dropdown mode.
 */
export const TimePickerOption = forwardRef<
  HTMLButtonElement,
  TimePickerOptionProps
>(
  (
    {
      selected,
      current,
      disabled,
      children,
      onSelect,
      onClick,
      onKeyDown,
      ...rest
    },
    ref
  ) => {
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!disabled) {
          onClick?.(event);
          onSelect?.();
        }
      },
      [disabled, onClick, onSelect]
    );

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>) => {
        onKeyDown?.(event);

        if (
          !event.defaultPrevented &&
          !disabled &&
          (event.key === "Enter" || event.key === " ")
        ) {
          event.preventDefault();
          onSelect?.();
        }
      },
      [disabled, onSelect, onKeyDown]
    );

    let state: "disabled" | "selected" | "current" | "default" = "default";
    if (disabled) {
      state = "disabled";
    } else if (selected) {
      state = "selected";
    } else if (current) {
      state = "current";
    }

    return (
      <button
        ref={ref}
        type="button"
        role="option"
        aria-selected={selected}
        aria-disabled={disabled}
        disabled={disabled}
        className={classnames.optionState[state]}
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

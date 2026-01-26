import React, { useCallback, useRef, useEffect } from "react";
import { timePicker } from "@nimbus-ds/styles";
import { TimePickerAmPmProps, AmPm } from "../../timePicker.types";

const { classnames } = timePicker;

/**
 * TimePickerAmPm renders the AM/PM toggle buttons for 12-hour format.
 * Implements the roving tabindex pattern for radio group keyboard navigation.
 */
export const TimePickerAmPm: React.FC<TimePickerAmPmProps> = ({
  value,
  onChange,
  disabled,
  amLabel = "AM",
  pmLabel = "PM",
  selectorLabel = "AM/PM selector",
}) => {
  const amButtonRef = useRef<HTMLButtonElement>(null);
  const pmButtonRef = useRef<HTMLButtonElement>(null);
  const pendingFocusRef = useRef<AmPm | null>(null);

  useEffect(() => {
    if (pendingFocusRef.current) {
      const targetRef =
        pendingFocusRef.current === "AM" ? amButtonRef : pmButtonRef;
      targetRef.current?.focus();
      pendingFocusRef.current = null;
    }
  }, [value]);

  const handleSelect = useCallback(
    (ampm: AmPm) => {
      if (!disabled && ampm !== value) {
        onChange(ampm);
      }
    },
    [disabled, value, onChange]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, ampm: AmPm) => {
      if (disabled) return;

      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
        const newValue = value === "AM" ? "PM" : "AM";
        pendingFocusRef.current = newValue;
        onChange(newValue);
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleSelect(ampm);
      }
    },
    [disabled, value, onChange, handleSelect]
  );

  return (
    <div
      className={classnames.ampmContainer}
      role="radiogroup"
      aria-label={selectorLabel}
    >
      <button
        ref={amButtonRef}
        type="button"
        role="radio"
        aria-checked={value === "AM"}
        disabled={disabled}
        className={
          classnames.ampmState[value === "AM" ? "selected" : "default"]
        }
        onClick={() => handleSelect("AM")}
        onKeyDown={(e) => handleKeyDown(e, "AM")}
        tabIndex={value === "AM" ? 0 : -1}
      >
        {amLabel}
      </button>
      <button
        ref={pmButtonRef}
        type="button"
        role="radio"
        aria-checked={value === "PM"}
        disabled={disabled}
        className={
          classnames.ampmState[value === "PM" ? "selected" : "default"]
        }
        onClick={() => handleSelect("PM")}
        onKeyDown={(e) => handleKeyDown(e, "PM")}
        tabIndex={value === "PM" ? 0 : -1}
      >
        {pmLabel}
      </button>
    </div>
  );
};

TimePickerAmPm.displayName = "TimePickerAmPm";

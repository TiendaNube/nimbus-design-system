import React, { useCallback } from "react";
import { timePicker } from "@nimbus-ds/styles";
import { TimePickerAmPmProps, AmPm } from "../../timePicker.types";

const { classnames } = timePicker;

/**
 * TimePickerAmPm renders the AM/PM toggle buttons for 12-hour format.
 */
export const TimePickerAmPm: React.FC<TimePickerAmPmProps> = ({
  value,
  onChange,
  disabled,
  amLabel = "AM",
  pmLabel = "PM",
  selectorLabel = "AM/PM selector",
}) => {
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
        onChange(value === "AM" ? "PM" : "AM");
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleSelect(ampm);
      }
    },
    [disabled, value, onChange, handleSelect]
  );

  const renderButton = (key: AmPm, label: string) => {
    const isSelected = value === key;
    return (
      <button
        key={key}
        type="button"
        role="radio"
        aria-checked={isSelected}
        disabled={disabled}
        className={classnames.ampmState[isSelected ? "selected" : "default"]}
        onClick={() => handleSelect(key)}
        onKeyDown={(e) => handleKeyDown(e, key)}
        tabIndex={isSelected ? 0 : -1}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      className={classnames.ampmContainer}
      role="group"
      aria-label={selectorLabel}
    >
      {renderButton("AM", amLabel)}
      {renderButton("PM", pmLabel)}
    </div>
  );
};

TimePickerAmPm.displayName = "TimePickerAmPm";

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

      switch (event.key) {
        case "ArrowUp":
        case "ArrowDown":
          event.preventDefault();
          onChange(value === "AM" ? "PM" : "AM");
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          handleSelect(ampm);
          break;
        default:
          break;
      }
    },
    [disabled, value, onChange, handleSelect]
  );

  const ampmOptions: Array<{ key: AmPm; label: string }> = [
    { key: "AM", label: amLabel },
    { key: "PM", label: pmLabel },
  ];

  return (
    <div
      className={classnames.ampmContainer}
      role="group"
      aria-label={selectorLabel}
    >
      {ampmOptions.map(({ key, label }) => {
        const isSelected = value === key;
        const state: keyof typeof classnames.ampmState = isSelected
          ? "selected"
          : "default";

        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={disabled}
            className={classnames.ampmState[state]}
            onClick={() => handleSelect(key)}
            onKeyDown={(e) => handleKeyDown(e, key)}
            tabIndex={isSelected ? 0 : -1}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

TimePickerAmPm.displayName = "TimePickerAmPm";

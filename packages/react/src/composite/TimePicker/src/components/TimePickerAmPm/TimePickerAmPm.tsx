import React, { useCallback, useRef, useEffect } from "react";
import { timePicker } from "@nimbus-ds/styles";
import { TimePickerAmPmProps } from "./TimePickerAmPm.types";
import { TimePickerOption } from "../TimePickerOption";
import { AmPm } from "../../timePicker.types";

const { classnames } = timePicker;

/**
 * TimePickerAmPm renders the AM/PM toggle buttons for 12-hour format.
 * Implements the roving tabindex pattern for radio group keyboard navigation.
 */
export const TimePickerAmPm: React.FC<TimePickerAmPmProps> = ({
  current,
  selected,
  onSelect,
  disabled,
  amLabel = "AM",
  pmLabel = "PM",
  selectorLabel = "AM/PM selector",
  onTabPrev,
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
  }, [current]);

  const handleSelect = useCallback(
    (ampm: AmPm) => {
      if (!disabled && ampm !== selected) {
        onSelect(ampm);
      }
    },
    [disabled, selected, onSelect]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, currentAmPm: AmPm) => {
      if (disabled) return;

      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
        const newValue = currentAmPm === "AM" ? "PM" : "AM";
        if (newValue === "AM") {
          amButtonRef.current?.focus();
        } else {
          pmButtonRef.current?.focus();
        }
      }

      if (event.key === "Tab" && event.shiftKey && onTabPrev) {
        event.preventDefault();
        onTabPrev();
      }
    },
    [disabled, selected, onTabPrev]
  );

  return (
    <div
      className={classnames.ampmContainer}
      role="radiogroup"
      aria-label={selectorLabel}
    >
      <TimePickerOption
        ref={amButtonRef}
        role="radio"
        selected={selected === "AM"}
        current={current === "AM"}
        disabled={disabled}
        onSelect={() => handleSelect("AM")}
        onKeyDown={(e) => handleKeyDown(e, "AM")}
        tabIndex={selected === "AM" ? 0 : -1}
      >
        {amLabel}
      </TimePickerOption>
      <TimePickerOption
        ref={pmButtonRef}
        role="radio"
        selected={selected === "PM"}
        current={current === "PM"}
        disabled={disabled}
        onSelect={() => handleSelect("PM")}
        onKeyDown={(e) => handleKeyDown(e, "PM")}
        tabIndex={selected === "PM" ? 0 : -1}
      >
        {pmLabel}
      </TimePickerOption>
    </div>
  );
};

TimePickerAmPm.displayName = "TimePickerAmPm";

import React, { forwardRef, useState, useCallback } from "react";
import {
  useFloating,
  useClick,
  useDismiss,
  useInteractions,
  offset,
  flip,
  shift,
  autoUpdate,
  FloatingPortal,
  FloatingFocusManager,
} from "@floating-ui/react";
import { timePicker } from "@nimbus-ds/styles";
import { Input } from "@nimbus-ds/input";
import { Icon } from "@nimbus-ds/icon";
import { ClockIcon } from "@nimbus-ds/icons";

import { TimePickerProps, AmPm } from "./timePicker.types";
import { useTimePickerState } from "./hooks";
import {
  TimePickerColumn,
  TimePickerAmPm,
  TimePickerDropdown,
} from "./components";
import { padZero } from "./utils";

function convertTo24Hours(
  hours: number | undefined,
  fallbackHours: number,
  ampm: AmPm | undefined
): number {
  if (ampm === "PM" && hours !== undefined && hours !== 12) {
    return hours + 12;
  }
  if (ampm === "AM" && hours === 12) {
    return 0;
  }
  return fallbackHours;
}

const { classnames } = timePicker;

/**
 * TimePicker allows users to select a time value using a scroll-based wheel picker.
 * For a dropdown variant, use TimePicker.Dropdown.
 *
 * @example
 * // Basic 24h scroll picker with 15-minute intervals
 * <TimePicker value="14:30" onChange={(value) => console.log(value)} step={15} />
 *
 * @example
 * // 12h format scroll picker
 * <TimePicker format="12h" step={30} />
 *
 * @example
 * // Dropdown variant
 * <TimePicker.Dropdown value="14:30" onChange={(value) => console.log(value)} step={30} />
 */
const TimePickerComponent = forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      value,
      onChange,
      format = "24h",
      step = 1,
      minTime,
      maxTime,
      disabled = false,
      placeholder = "Select time",
      open: controlledOpen,
      onOpenChange,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      name,
      required = false,
      id,
      labels = {},
      ...rest
    },
    ref
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
    const isOpen = controlledOpen ?? uncontrolledOpen;

    const {
      initialValue,
      timeValue,
      displayValue,
      setHours,
      setMinutes,
      setAmPm,
      hourOptions,
      minuteOptions,
      isHourDisabled,
      isMinuteDisabled,
      clear,
    } = useTimePickerState({
      value,
      onChange,
      format,
      step,
      minTime,
      maxTime,
    });

    const handleOpenChange = useCallback(
      (newOpen: boolean) => {
        if (controlledOpen === undefined) {
          setUncontrolledOpen(newOpen);
        }

        onOpenChange?.(newOpen);

        if (onChange && timeValue && !newOpen) {
          const { hours, minutes, ampm } = timeValue;
          const finalHours = hours ?? (initialValue?.hours as number);
          const finalMinutes = minutes ?? (initialValue?.minutes as number);

          const formattedValue =
            format === "12h"
              ? `${padZero(finalHours)}:${padZero(finalMinutes)} ${ampm}`
              : `${padZero(finalHours)}:${padZero(finalMinutes)}`;

          const date = new Date();
          if (format === "12h") {
            const hours24 = convertTo24Hours(hours, finalHours, ampm);
            date.setHours(hours24, finalMinutes, 0, 0);
          } else {
            date.setHours(finalHours, finalMinutes, 0, 0);
          }

          onChange(formattedValue, date);
        }

        if (!newOpen) {
          clear();
        }
      },
      [
        controlledOpen,
        onOpenChange,
        onChange,
        timeValue,
        initialValue,
        format,
        clear,
      ]
    );

    const { refs, floatingStyles, context } = useFloating({
      open: isOpen,
      onOpenChange: handleOpenChange,
      middleware: [offset(4), flip(), shift({ padding: 8 })],
      whileElementsMounted: autoUpdate,
      placement: "bottom-start",
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
      useClick(context, { enabled: !disabled }),
      useDismiss(context),
    ]);

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if (disabled) return;

        if (
          (!isOpen && (event.key === "Enter" || event.key === " ")) ||
          (isOpen && event.key === "Escape")
        ) {
          event.preventDefault();
          handleOpenChange(!isOpen);
        }
      },
      [disabled, isOpen, handleOpenChange]
    );

    return (
      <div ref={ref} {...rest}>
        <div ref={refs.setReference} {...getReferenceProps()}>
          <Input
            id={id}
            name={name}
            value={displayValue}
            placeholder={placeholder}
            disabled={disabled}
            readOnly
            required={required}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            role="combobox"
            onKeyDown={handleKeyDown}
            append={<Icon source={<ClockIcon />} color="currentColor" />}
            appendPosition="end"
            style={{ cursor: disabled ? "not-allowed" : "pointer" }}
          />
        </div>

        {isOpen && (
          <FloatingPortal>
            <FloatingFocusManager context={context} modal={false}>
              <div
                ref={refs.setFloating}
                className={classnames.panel}
                style={floatingStyles}
                {...getFloatingProps()}
              >
                <TimePickerColumn
                  type="hours"
                  options={hourOptions}
                  value={initialValue?.hours}
                  selected={timeValue?.hours}
                  onSelect={setHours}
                  format={format}
                  isDisabled={isHourDisabled}
                  label={
                    format === "12h"
                      ? labels.hourLabel || "Hour"
                      : labels.hoursLabel || "Hours"
                  }
                />
                <div className={classnames.divider} />
                <TimePickerColumn
                  type="minutes"
                  options={minuteOptions}
                  value={initialValue?.minutes}
                  selected={timeValue?.minutes}
                  onSelect={setMinutes}
                  format={format}
                  isDisabled={isMinuteDisabled}
                  label={labels.minutesLabel || "Minutes"}
                />
                {format === "12h" && (
                  <>
                    <div className={classnames.divider} />
                    <TimePickerAmPm
                      value={timeValue?.ampm ?? "AM"}
                      onSelect={setAmPm}
                      disabled={disabled}
                      amLabel={labels.amLabel || "AM"}
                      pmLabel={labels.pmLabel || "PM"}
                      selectorLabel={
                        labels.amPmSelectorLabel || "AM/PM selector"
                      }
                    />
                  </>
                )}
              </div>
            </FloatingFocusManager>
          </FloatingPortal>
        )}
      </div>
    );
  }
);

TimePickerComponent.displayName = "TimePicker";

export const TimePicker = Object.assign(TimePickerComponent, {
  Dropdown: TimePickerDropdown,
});

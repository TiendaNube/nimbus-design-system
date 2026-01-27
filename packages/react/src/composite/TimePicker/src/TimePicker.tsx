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

import type { TimePickerProps } from "./timePicker.types";
import { useTimePickerState } from "./hooks";
import { TimePickerScroll, TimePickerDropdown } from "./components";
import { padZero, to24Hour } from "./utils";

const { classnames } = timePicker;

/**
 * TimePicker allows users to select a time value using either a scroll-based
 * wheel picker (default) or a dropdown list of time options.
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
 * // Dropdown mode
 * <TimePicker mode="dropdown" value="14:30" onChange={(value) => console.log(value)} step={30} />
 */
const TimePickerComponent = forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      value,
      onChange,
      mode = "scroll",
      format = "24h",
      step: stepProp,
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
    const step = stepProp ?? (mode === "dropdown" ? 30 : 1);

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
      dropdownOptions,
      selectTime,
      clear,
    } = useTimePickerState({
      value,
      onChange: mode === "dropdown" ? undefined : onChange,
      format,
      step,
    });

    const handleOpenChange = useCallback(
      (newOpen: boolean) => {
        if (controlledOpen === undefined) {
          setUncontrolledOpen(newOpen);
        }

        onOpenChange?.(newOpen);

        if (mode === "dropdown") {
          if (!newOpen && timeValue && onChange) {
            if (
              timeValue.hours !== undefined &&
              timeValue.minutes !== undefined
            ) {
              const { hours, minutes, ampm } = timeValue;
              const finalAmPm = ampm ?? initialValue?.ampm ?? "AM";
              const formattedValue =
                format === "12h"
                  ? `${padZero(hours)}:${padZero(minutes)} ${finalAmPm}`
                  : `${padZero(hours)}:${padZero(minutes)}`;

              const date = new Date();
              if (format === "12h") {
                const hours24 = to24Hour(hours, finalAmPm);
                date.setHours(hours24, minutes, 0, 0);
              } else {
                date.setHours(hours, minutes, 0, 0);
              }

              onChange(formattedValue, date);
            }
          }
        } else {
          if (onChange && timeValue && !newOpen) {
            const defaultHour = format === "12h" ? 12 : 0;
            const finalHours =
              timeValue.hours ?? initialValue?.hours ?? defaultHour;
            const finalMinutes =
              timeValue.minutes ?? initialValue?.minutes ?? 0;
            const finalAmPm = timeValue.ampm ?? initialValue?.ampm ?? "AM";

            const formattedValue =
              format === "12h"
                ? `${padZero(finalHours)}:${padZero(finalMinutes)} ${finalAmPm}`
                : `${padZero(finalHours)}:${padZero(finalMinutes)}`;

            const date = new Date();
            if (format === "12h") {
              const hours24 = to24Hour(finalHours, finalAmPm);
              date.setHours(hours24, finalMinutes, 0, 0);
            } else {
              date.setHours(finalHours, finalMinutes, 0, 0);
            }

            onChange(formattedValue, date);
          }

          if (!newOpen) {
            clear();
          }
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
        mode,
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

    const panelClassName =
      mode === "dropdown"
        ? `${classnames.panel} ${classnames.panelDropdown}`
        : classnames.panel;

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
            className={
              classnames.inputCursor[disabled ? "disabled" : "enabled"]
            }
          />
        </div>

        {isOpen && (
          <FloatingPortal>
            <FloatingFocusManager context={context} modal={false}>
              <div
                ref={refs.setFloating}
                className={panelClassName}
                style={floatingStyles}
                {...getFloatingProps()}
              >
                {mode === "scroll" ? (
                  <TimePickerScroll
                    format={format}
                    disabled={disabled}
                    labels={labels}
                    hourOptions={hourOptions}
                    minuteOptions={minuteOptions}
                    initialValue={initialValue}
                    timeValue={timeValue}
                    setHours={setHours}
                    setMinutes={setMinutes}
                    setAmPm={setAmPm}
                  />
                ) : (
                  <TimePickerDropdown
                    format={format}
                    disabled={disabled}
                    labels={labels}
                    ariaLabel={ariaLabel}
                    step={step}
                    dropdownOptions={dropdownOptions}
                    initialValue={initialValue}
                    internalTimeValue={timeValue}
                    selectTime={selectTime}
                    setAmPm={setAmPm}
                  />
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

/**
 * TimePicker.Dropdown is a convenience wrapper that renders the TimePicker
 * with mode="dropdown". Provided for backward compatibility.
 *
 * @deprecated Use `<TimePicker mode="dropdown" />` instead.
 */
const TimePickerDropdownWrapper = forwardRef<
  HTMLDivElement,
  Omit<TimePickerProps, "mode">
>((props, ref) => <TimePickerComponent ref={ref} {...props} mode="dropdown" />);

TimePickerDropdownWrapper.displayName = "TimePicker.Dropdown";

export const TimePicker = Object.assign(TimePickerComponent, {
  Dropdown: TimePickerDropdownWrapper,
});

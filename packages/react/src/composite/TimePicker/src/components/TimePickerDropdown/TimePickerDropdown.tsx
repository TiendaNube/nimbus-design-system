import React, { forwardRef, useState, useCallback, useMemo, useRef, useEffect } from "react";
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
import { useCanScroll } from "../../../../../common/hooks";

import { TimePickerProps, AmPm } from "../../timePicker.types";
import { useTimePickerState } from "../../hooks";
import { padZero } from "../../utils/timeUtils";
import { TimePickerAmPm, TimePickerColumn } from "../index";

const { classnames } = timePicker;

function convertTo24HoursDropdown(
  hours: number,
  ampm: AmPm | undefined
): number {
  if (ampm === "PM" && hours !== 12) {
    return hours + 12;
  }
  if (ampm === "AM" && hours === 12) {
    return 0;
  }
  return hours;
}

/**
 * TimePickerDropdown displays a dropdown list of time options.
 * Shows the initial value with light blue styling and tracks the selected value
 * with dark blue styling. Only commits changes to the parent when the panel closes.
 *
 * @example
 * // Basic 24h dropdown with 30-minute intervals
 * <TimePicker.Dropdown value="14:30" onChange={(value) => console.log(value)} step={30} />
 *
 * @example
 * // 12h format with 15-minute intervals
 * <TimePicker.Dropdown format="12h" step={15} />
 */
export const TimePickerDropdown = forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      value,
      onChange,
      format = "24h",
      step = 30,
      minTime,
      maxTime,
      disabled = false,
      placeholder = "Select time (dropdown)",
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
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isOpen = controlledOpen ?? uncontrolledOpen;

    const {
      canScrollStart: canScrollTop,
      canScrollEnd: canScrollBottom,
      checkScrollPosition,
    } = useCanScroll({
      direction: "vertical",
      scrollContainerRef,
    });

    useEffect(() => {
      if (!isOpen) return undefined;

      let resizeObserver: ResizeObserver | null = null;
      const handleScroll = () => checkScrollPosition();

      const setupScrollTracking = () => {
        const container = scrollContainerRef.current;
        if (!container) return;

        checkScrollPosition();
        container.addEventListener("scroll", handleScroll);

        resizeObserver = new ResizeObserver(() => {
          requestAnimationFrame(checkScrollPosition);
        });
        resizeObserver.observe(container);
      };

      const frameId = requestAnimationFrame(setupScrollTracking);

      return () => {
        cancelAnimationFrame(frameId);
        const container = scrollContainerRef.current;
        if (container) {
          container.removeEventListener("scroll", handleScroll);
        }
        resizeObserver?.disconnect();
      };
    }, [isOpen, checkScrollPosition]);

    const {
      timeValue: internalTimeValue,
      initialValue,
      displayValue,
      dropdownOptions,
      selectTime,
      setAmPm,
    } = useTimePickerState({
      value,
      onChange: undefined,
      format,
      step,
      minTime,
      maxTime,
    });

    const handleOpenChange = useCallback(
      (newOpen: boolean) => {
        if (!newOpen && internalTimeValue && onChange) {
          if (
            internalTimeValue.hours !== undefined &&
            internalTimeValue.minutes !== undefined
          ) {
            const { hours, minutes, ampm } = internalTimeValue;
            const formattedValue =
              format === "12h"
                ? `${padZero(hours)}:${padZero(minutes)} ${ampm}`
                : `${padZero(hours)}:${padZero(minutes)}`;

            const date = new Date();
            if (format === "12h") {
              const hours24 = convertTo24HoursDropdown(hours, ampm);
              date.setHours(hours24, minutes, 0, 0);
            } else {
              date.setHours(hours, minutes, 0, 0);
            }

            onChange(formattedValue, date);
          }
        }

        if (newOpen) {
          selectTime(
            initialValue?.hours ?? 0,
            initialValue?.minutes ?? 0,
            initialValue?.ampm
          );
        }

        if (controlledOpen === undefined) {
          setUncontrolledOpen(newOpen);
        }
        onOpenChange?.(newOpen);
      },
      [
        controlledOpen,
        onOpenChange,
        onChange,
        selectTime,
        initialValue,
        format,
        internalTimeValue,
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

    const handleOptionSelect = useCallback(
      (hours: number, minutes: number, ampm?: AmPm) => {
        selectTime(hours, minutes, ampm);
      },
      [selectTime]
    );

    const handleAmPmChange = useCallback(
      (newAmPm: AmPm) => {
        setAmPm(newAmPm);
      },
      [setAmPm]
    );

    const currentTimeValue = useMemo(
      () =>
        initialValue
          ? `${padZero(initialValue.hours)}:${padZero(initialValue.minutes)}`
          : null,
      [initialValue]
    );

    const selectedTimeValue = useMemo(
      () =>
        internalTimeValue &&
        internalTimeValue.hours !== undefined &&
        internalTimeValue.minutes !== undefined
          ? `${padZero(internalTimeValue.hours)}:${padZero(
              internalTimeValue.minutes
            )}`
          : null,
      [internalTimeValue]
    );

    const currentAmPm = initialValue?.ampm ?? "AM";
    const selectedAmPm = internalTimeValue?.ampm ?? currentAmPm;

    const filteredOptions = useMemo(() => {
      if (format === "24h") {
        return dropdownOptions;
      }
      return dropdownOptions.filter((opt) => opt.ampm === selectedAmPm);
    }, [dropdownOptions, format, selectedAmPm]);

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
          />
        </div>

        {isOpen && (
          <FloatingPortal>
            <FloatingFocusManager context={context} modal={false}>
              <div
                ref={refs.setFloating}
                className={`${classnames.panel} ${classnames.panelDropdown}`}
                style={floatingStyles}
                {...getFloatingProps()}
              >
                <div style={{ position: "relative", display: "flex", flex: 1 }}>
                  <div className={classnames.dropdownScrollContainer} ref={scrollContainerRef}>
                    <TimePickerColumn
                      type="combined"
                      options={filteredOptions}
                      currentValue={currentTimeValue}
                      selectedValue={selectedTimeValue}
                      onSelectTime={handleOptionSelect}
                      format={format}
                      step={step}
                      label={ariaLabel}
                      scrollContainerRef={scrollContainerRef}
                    />
                    {format === "12h" && (
                      <div className={classnames.dropdownAmPmSticky}>
                        <TimePickerAmPm
                          value={selectedAmPm}
                          onChange={handleAmPmChange}
                          disabled={disabled}
                          amLabel={labels.amLabel || "AM"}
                          pmLabel={labels.pmLabel || "PM"}
                          selectorLabel={
                            labels.amPmSelectorLabel || "AM/PM selector"
                          }
                        />
                      </div>
                    )}
                  </div>
                  {canScrollTop && (
                    <div className={classnames.gradientPosition.top} />
                  )}
                  {canScrollBottom && (
                    <div className={classnames.gradientPosition.bottom} />
                  )}
                </div>
              </div>
            </FloatingFocusManager>
          </FloatingPortal>
        )}
      </div>
    );
  }
);

TimePickerDropdown.displayName = "TimePicker.Dropdown";

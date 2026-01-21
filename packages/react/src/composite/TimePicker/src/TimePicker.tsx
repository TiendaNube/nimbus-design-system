import React, {
  forwardRef,
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
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
import { ScrollPane } from "@nimbus-ds/scroll-pane";

import { TimePickerProps } from "./timePicker.types";
import { useTimePickerState } from "./hooks";
import { padZero } from "./utils/timeUtils";
import {
  TimePickerColumn,
  TimePickerOption,
  TimePickerAmPm,
} from "./components";

const { classnames } = timePicker;

/**
 * TimePicker allows users to select a time value using either a scroll-based
 * wheel picker or a dropdown list of time options.
 *
 * @example
 * // Basic 24h scroll picker with 15-minute intervals
 * <TimePicker value="14:30" onChange={(value) => console.log(value)} step={15} />
 *
 * @example
 * // 12h format with dropdown and 30-minute intervals
 * <TimePicker format="12h" mode="dropdown" step={30} />
 */
export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      value,
      onChange,
      format = "24h",
      mode = "scroll",
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
    const selectedOptionRef = useRef<HTMLButtonElement>(null);
    const firstOptionRef = useRef<HTMLButtonElement>(null);

    const handleOpenChange = useCallback(
      (newOpen: boolean) => {
        if (controlledOpen === undefined) {
          setUncontrolledOpen(newOpen);
        }
        onOpenChange?.(newOpen);
      },
      [controlledOpen, onOpenChange]
    );

    const {
      initialValue,
      timeValue,
      displayValue,
      setHours,
      setMinutes,
      setAmPm,
      selectTime,
      isHourDisabled,
      isMinuteDisabled,
      isTimeDisabled,
    } = useTimePickerState({
      value,
      onChange,
      format,
      step,
      minTime,
      maxTime,
    });

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

    useEffect(() => {
      if (isOpen && mode === "dropdown") {
        const targetRef = selectedOptionRef.current || firstOptionRef.current;
        if (targetRef) {
          targetRef.scrollIntoView({
            block: "center",
            behavior: "auto",
          });
        }
      }
    }, [isOpen, mode]);

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
      (hours: number, minutes: number, ampm?: "AM" | "PM") => {
        selectTime(hours, minutes, ampm);
      },
      [selectTime, handleOpenChange]
    );

    const renderScrollMode = () => (
      <>
        <TimePickerColumn
          type="hours"
          value={initialValue?.hours ?? (format === "12h" ? 12 : 0)}
          selected={timeValue?.hours ?? (format === "12h" ? 12 : 0)}
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
          value={initialValue?.minutes ?? 0}
          selected={timeValue?.minutes ?? 0}
          onSelect={setMinutes}
          format={format}
          isDisabled={isMinuteDisabled}
          label={labels.minutesLabel || "Minutes"}
          step={step}
        />
        {format === "12h" && (
          <>
            <div className={classnames.divider} />
            <TimePickerAmPm
              value={timeValue?.ampm ?? "AM"}
              onChange={setAmPm}
              disabled={disabled}
              amLabel={labels.amLabel || "AM"}
              pmLabel={labels.pmLabel || "PM"}
              selectorLabel={labels.amPmSelectorLabel || "AM/PM selector"}
            />
          </>
        )}
      </>
    );

    const dropdownTimeOptions = useMemo(() => {
      const options: Array<{
        value: string;
        hours: number;
        minutes: number;
        disabled: boolean;
      }> = [];

      const hourRange =
        format === "12h"
          ? [12, ...Array.from({ length: 11 }, (_, i) => i + 1)]
          : Array.from({ length: 24 }, (_, i) => i);

      hourRange.forEach((h) => {
        for (let m = 0; m < 60; m += step) {
          const currentAmPm =
            format === "12h" ? timeValue?.ampm ?? "AM" : undefined;
          options.push({
            value: `${padZero(h)}:${padZero(m)}`,
            hours: h,
            minutes: m,
            disabled: isTimeDisabled(h, m, currentAmPm),
          });
        }
      });

      return options;
    }, [format, step, timeValue?.ampm, isTimeDisabled]);

    const renderDropdownMode = () => {
      const currentTimeValue = `${padZero(
        initialValue?.hours ?? (format === "12h" ? 12 : 0)
      )}:${padZero(initialValue?.minutes ?? 0)}`;

      const selectedTimeValue = `${padZero(timeValue?.hours ?? 0)}:${padZero(timeValue?.minutes ?? 0)}`;

      const hasSelection = dropdownTimeOptions.some(
        (option) => option.value === currentTimeValue
      );
      const firstEnabledIndex = dropdownTimeOptions.findIndex(
        (opt) => !opt.disabled
      );

      const handleTimeKeyDown = (event: React.KeyboardEvent, index: number) => {
        const enabledOptions = dropdownTimeOptions.filter(
          (opt) => !opt.disabled
        );
        const currentEnabledIndex = enabledOptions.findIndex(
          (opt) => opt.value === dropdownTimeOptions[index].value
        );

        if (currentEnabledIndex === -1) return;

        let targetOption;

        switch (event.key) {
          case "ArrowUp": {
            event.preventDefault();
            const prevIndex =
              currentEnabledIndex > 0
                ? currentEnabledIndex - 1
                : enabledOptions.length - 1;
            targetOption = enabledOptions[prevIndex];
            break;
          }
          case "ArrowDown": {
            event.preventDefault();
            const nextIndex =
              currentEnabledIndex < enabledOptions.length - 1
                ? currentEnabledIndex + 1
                : 0;
            targetOption = enabledOptions[nextIndex];
            break;
          }
          default:
            return;
        }

        if (targetOption) {
          const targetIndex = dropdownTimeOptions.findIndex(
            (opt) => opt.value === targetOption.value
          );
          const buttonElement = document.querySelector(
            `[data-timepicker-time-index="${targetIndex}"]`
          ) as HTMLButtonElement;
          buttonElement?.focus();
        }
      };

      return (
        <>
          <div className={classnames.dropdownWrapper}>
            <ScrollPane
              direction="vertical"
              showGradients
              showScrollbar
              scrollToItemOnClick={false}
              contentContainerProps={{
                display: "flex",
                flexDirection: "column",
                margin: "none",
              }}
            >
              <div className={classnames.dropdownList} role="listbox">
                {dropdownTimeOptions.map((option, index) => {
                  const isCurrent = option.value === currentTimeValue;
                  const isSelected = option.value === selectedTimeValue;

                  const isFirstEnabled =
                    !hasSelection && index === firstEnabledIndex;
                  const shouldBeTabable = isCurrent || isFirstEnabled;

                  let optionRef;
                  if (isCurrent) {
                    optionRef = selectedOptionRef;
                  } else if (isFirstEnabled) {
                    optionRef = firstOptionRef;
                  }

                  return (
                    <TimePickerOption
                      key={option.value}
                      ref={optionRef}
                      current={isCurrent}
                      selected={isSelected}
                      disabled={option.disabled}
                      onSelect={() =>
                        handleOptionSelect(
                          option.hours,
                          option.minutes,
                          timeValue?.ampm
                        )
                      }
                      onKeyDown={(e) => handleTimeKeyDown(e, index)}
                      tabIndex={shouldBeTabable ? 0 : -1}
                      data-timepicker-time-index={index}
                    >
                      {option.value}
                    </TimePickerOption>
                  );
                })}
              </div>
            </ScrollPane>
          </div>
          {format === "12h" && (
            <>
              <div className={classnames.divider} />
              <TimePickerAmPm
                value={timeValue?.ampm ?? "AM"}
                onChange={setAmPm}
                disabled={disabled}
                amLabel={labels.amLabel || "AM"}
                pmLabel={labels.pmLabel || "PM"}
                selectorLabel={labels.amPmSelectorLabel || "AM/PM selector"}
              />
            </>
          )}
        </>
      );
    };

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
                className={
                  classnames.panel +
                  (mode === "dropdown" ? ` ${classnames.panelDropdown}` : "")
                }
                style={floatingStyles}
                {...getFloatingProps()}
              >
                {mode === "scroll" ? renderScrollMode() : renderDropdownMode()}
              </div>
            </FloatingFocusManager>
          </FloatingPortal>
        )}
      </div>
    );
  }
);

TimePicker.displayName = "TimePicker";

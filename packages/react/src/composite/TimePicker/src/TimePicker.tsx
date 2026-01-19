import React, {
  forwardRef,
  useState,
  useCallback,
  useRef,
  useEffect,
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

import { TimePickerProps } from "./timePicker.types";
import { useTimePickerState } from "./hooks";
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
 * // Basic 24h scroll picker
 * <TimePicker value="14:30" onChange={(value) => console.log(value)} />
 *
 * @example
 * // 12h format with dropdown
 * <TimePicker format="12h" mode="dropdown" step={30} />
 */
export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      value,
      onChange,
      format = "24h",
      mode = "scroll",
      step = 30,
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
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

    const selectedOptionRef = useRef<HTMLButtonElement>(null);

    const handleOpenChange = useCallback(
      (newOpen: boolean) => {
        if (!isControlled) {
          setUncontrolledOpen(newOpen);
        }
        onOpenChange?.(newOpen);
      },
      [isControlled, onOpenChange]
    );

    const {
      timeValue,
      displayValue,
      setHours,
      setMinutes,
      setAmPm,
      selectTime,
      dropdownOptions,
      isHourDisabled,
      isMinuteDisabled,
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

    const click = useClick(context, { enabled: !disabled });
    const dismiss = useDismiss(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
      click,
      dismiss,
    ]);

    useEffect(() => {
      if (isOpen && mode === "dropdown" && selectedOptionRef.current) {
        selectedOptionRef.current.scrollIntoView({
          block: "center",
          behavior: "auto",
        });
      }
    }, [isOpen, mode]);

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if (disabled) return;

        switch (event.key) {
          case "Enter":
          case " ":
            if (!isOpen) {
              event.preventDefault();
              handleOpenChange(true);
            }
            break;
          case "Escape":
            if (isOpen) {
              event.preventDefault();
              handleOpenChange(false);
            }
            break;
          default:
            break;
        }
      },
      [disabled, isOpen, handleOpenChange]
    );

    const handleOptionSelect = useCallback(
      (hours: number, minutes: number, ampm?: "AM" | "PM") => {
        selectTime(hours, minutes, ampm);
        handleOpenChange(false);
      },
      [selectTime, handleOpenChange]
    );

    const isOptionSelected = useCallback(
      (optHours: number, optMinutes: number, optAmpm?: "AM" | "PM") => {
        if (!timeValue) return false;

        const hoursMatch = timeValue.hours === optHours;
        const minutesMatch = timeValue.minutes === optMinutes;
        const ampmMatch =
          format === "24h" || timeValue.ampm === optAmpm;

        return hoursMatch && minutesMatch && ampmMatch;
      },
      [timeValue, format]
    );

    const {
      hoursLabel = "Hours",
      hourLabel = "Hour",
      minutesLabel = "Minutes",
      amPmSelectorLabel = "AM/PM selector",
      amLabel = "AM",
      pmLabel = "PM",
    } = labels;

    const renderScrollMode = () => (
      <>
        <TimePickerColumn
          type="hours"
          value={timeValue?.hours ?? (format === "12h" ? 12 : 0)}
          onSelect={setHours}
          format={format}
          isDisabled={isHourDisabled}
          label={format === "12h" ? hourLabel : hoursLabel}
        />
        <div className={classnames.divider} />
        <TimePickerColumn
          type="minutes"
          value={timeValue?.minutes ?? 0}
          onSelect={setMinutes}
          format={format}
          isDisabled={isMinuteDisabled}
          label={minutesLabel}
        />
        {format === "12h" && (
          <>
            <div className={classnames.divider} />
            <TimePickerAmPm
              value={timeValue?.ampm ?? "AM"}
              onChange={setAmPm}
              disabled={disabled}
              amLabel={amLabel}
              pmLabel={pmLabel}
              selectorLabel={amPmSelectorLabel}
            />
          </>
        )}
      </>
    );

    const renderDropdownMode = () => (
      <div className={classnames.dropdownList} role="listbox">
        {dropdownOptions.map((option) => {
          const selected = isOptionSelected(
            option.hours,
            option.minutes,
            option.ampm
          );

          return (
            <TimePickerOption
              key={option.value}
              ref={selected ? selectedOptionRef : undefined}
              selected={selected}
              disabled={option.disabled}
              onSelect={() =>
                handleOptionSelect(option.hours, option.minutes, option.ampm)
              }
              tabIndex={selected ? 0 : -1}
            >
              {option.value}
            </TimePickerOption>
          );
        })}
      </div>
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

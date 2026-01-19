import React, { useRef, useEffect, useCallback } from "react";
import { timePicker } from "@nimbus-ds/styles";
import { TimePickerColumnProps } from "../../timePicker.types";

const { classnames } = timePicker;

function padZero(num: number): string {
  return num.toString().padStart(2, "0");
}

/**
 * TimePickerColumn renders a scrollable column of time values (hours or minutes).
 * Uses CSS scroll-snap for smooth selection experience.
 */
export const TimePickerColumn: React.FC<TimePickerColumnProps> = ({
  type,
  value,
  onSelect,
  format,
  isDisabled,
  label,
}) => {
  const columnRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  const getValues = useCallback((): number[] => {
    if (type === "hours") {
      if (format === "12h") {
        return Array.from({ length: 12 }, (_, i) => i === 0 ? 12 : i);
      }
      return Array.from({ length: 24 }, (_, i) => i);
    }
    return Array.from({ length: 60 }, (_, i) => i);
  }, [type, format]);

  const values = getValues();

  const scrollToValue = useCallback(
    (targetValue: number, smooth = true) => {
      if (!columnRef.current) return;

      const index = values.indexOf(targetValue);
      if (index === -1) return;

      const itemHeight = 36;
      const containerHeight = columnRef.current.clientHeight;
      const scrollTop = index * itemHeight - (containerHeight / 2 - itemHeight / 2);

      columnRef.current.scrollTo({
        top: Math.max(0, scrollTop),
        behavior: smooth ? "smooth" : "auto",
      });
    },
    [values]
  );

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      scrollToValue(value, false);
    }
  }, [scrollToValue, value]);

  useEffect(() => {
    if (!isInitialMount.current) {
      scrollToValue(value, true);
    }
  }, [value, scrollToValue]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, itemValue: number) => {
      const currentIndex = values.indexOf(itemValue);

      switch (event.key) {
        case "ArrowUp": {
          event.preventDefault();
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : values.length - 1;
          const prevValue = values[prevIndex];
          if (!isDisabled?.(prevValue)) {
            onSelect(prevValue);
          }
          break;
        }
        case "ArrowDown": {
          event.preventDefault();
          const nextIndex = currentIndex < values.length - 1 ? currentIndex + 1 : 0;
          const nextValue = values[nextIndex];
          if (!isDisabled?.(nextValue)) {
            onSelect(nextValue);
          }
          break;
        }
        case "Enter":
        case " ":
          event.preventDefault();
          if (!isDisabled?.(itemValue)) {
            onSelect(itemValue);
          }
          break;
        default:
          break;
      }
    },
    [values, isDisabled, onSelect]
  );

  const getOptionState = (itemValue: number): keyof typeof classnames.optionState => {
    if (isDisabled?.(itemValue)) return "disabled";
    if (itemValue === value) return "selected";
    return "default";
  };

  return (
    <div className={classnames.columnWrapper}>
      {label && <div className={classnames.columnLabel}>{label}</div>}
      <div
        ref={columnRef}
        className={classnames.column}
        role="listbox"
        aria-label={label || type}
      >
        {values.map((itemValue) => {
          const state = getOptionState(itemValue);
          const disabled = isDisabled?.(itemValue) ?? false;

          return (
            <button
              key={itemValue}
              type="button"
              role="option"
              aria-selected={itemValue === value}
              aria-disabled={disabled}
              disabled={disabled}
              className={classnames.optionState[state]}
              onClick={() => !disabled && onSelect(itemValue)}
              onKeyDown={(e) => handleKeyDown(e, itemValue)}
              tabIndex={itemValue === value ? 0 : -1}
            >
              {padZero(itemValue)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

TimePickerColumn.displayName = "TimePickerColumn";

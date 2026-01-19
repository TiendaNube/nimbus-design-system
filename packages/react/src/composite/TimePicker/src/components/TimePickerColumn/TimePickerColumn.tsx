import React, { useRef, useEffect, useCallback, useMemo } from "react";
import { timePicker } from "@nimbus-ds/styles";
import { ScrollPane } from "@nimbus-ds/scroll-pane";
import { TimePickerColumnProps } from "../../timePicker.types";
import { padZero } from "../../utils/timeUtils";

const { classnames } = timePicker;

/**
 * TimePickerColumn renders a scrollable column of time values (hours or minutes).
 * Uses ScrollPane with gradients to indicate scrollable content.
 */
export const TimePickerColumn: React.FC<TimePickerColumnProps> = ({
  type,
  value,
  onSelect,
  format,
  isDisabled,
  label,
  step = 1,
}) => {
  const isInitialMount = useRef(true);
  const optionRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollPaneRef = useRef<HTMLDivElement>(null);

  const values = useMemo((): number[] => {
    if (type === "hours") {
      return format === "12h"
        ? [12, ...Array.from({ length: 11 }, (_, i) => i + 1)]
        : Array.from({ length: 24 }, (_, i) => i);
    }
    return Array.from(
      { length: Math.ceil(60 / step) },
      (_, i) => i * step
    ).filter((minute) => minute < 60);
  }, [type, format, step]);

  useEffect(() => {
    if (!isInitialMount.current) return;

    isInitialMount.current = false;
    if (!wrapperRef.current) return;

    const scrollContainer = scrollPaneRef.current;
    if (!scrollContainer) return;

    const index = values.indexOf(value);
    if (index === -1) return;

    const itemHeight = 36;
    const containerHeight = scrollContainer.clientHeight;
    const scrollTop =
      index * itemHeight - (containerHeight / 2 - itemHeight / 2);

    scrollContainer.scrollTo({
      top: Math.max(0, scrollTop),
      behavior: "instant",
    });

    const selectedOption = optionRefs.current.get(value);
    if (selectedOption && document.activeElement !== selectedOption) {
      const shouldFocus = scrollContainer.contains(document.activeElement);
      if (shouldFocus) {
        selectedOption.focus();
      }
    }
  }, [value, values]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, itemValue: number) => {
      const currentIndex = values.indexOf(itemValue);

      switch (event.key) {
        case "ArrowUp": {
          event.preventDefault();
          let prevIndex =
            currentIndex > 0 ? currentIndex - 1 : values.length - 1;
          let prevValue = values[prevIndex];

          while (isDisabled?.(prevValue) && prevIndex !== currentIndex) {
            prevIndex = prevIndex > 0 ? prevIndex - 1 : values.length - 1;
            prevValue = values[prevIndex];
          }

          if (!isDisabled?.(prevValue)) {
            const prevOption = optionRefs.current.get(prevValue);
            prevOption?.focus();
          }
          break;
        }
        case "ArrowDown": {
          event.preventDefault();
          let nextIndex =
            currentIndex < values.length - 1 ? currentIndex + 1 : 0;
          let nextValue = values[nextIndex];

          while (isDisabled?.(nextValue) && nextIndex !== currentIndex) {
            nextIndex = nextIndex < values.length - 1 ? nextIndex + 1 : 0;
            nextValue = values[nextIndex];
          }

          if (!isDisabled?.(nextValue)) {
            const nextOption = optionRefs.current.get(nextValue);
            nextOption?.focus();
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

  const getOptionState = (
    itemValue: number
  ): keyof typeof classnames.optionState => {
    if (isDisabled?.(itemValue)) return "disabled";
    if (itemValue === value) return "selected";
    return "default";
  };

  return (
    <div className={classnames.columnWrapper} ref={wrapperRef}>
      <ScrollPane
        direction="vertical"
        showGradients
        showScrollbar={false}
        scrollToItemOnClick
        scrollBehavior="always"
        contentContainerProps={{
          display: "flex",
          flexDirection: "column",
          margin: "none",
        }}
        scrollContainerRef={scrollPaneRef}
      >
        <div
          className={classnames.column}
          role="listbox"
          aria-label={label || type}
        >
          {values.map((itemValue) => {
            const state = getOptionState(itemValue);
            const disabled = isDisabled?.(itemValue) ?? false;

            return (
              <ScrollPane.Item key={itemValue}>
                {/* TODO: move to sprinkle css styles */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button
                    ref={(el) => {
                      if (el) {
                        optionRefs.current.set(itemValue, el);
                      } else {
                        optionRefs.current.delete(itemValue);
                      }
                    }}
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
                </div>
              </ScrollPane.Item>
            );
          })}
        </div>
      </ScrollPane>
    </div>
  );
};

TimePickerColumn.displayName = "TimePickerColumn";

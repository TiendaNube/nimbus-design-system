import React, { useRef, useEffect, useCallback, useMemo } from "react";
import { ScrollPane } from "@nimbus-ds/scroll-pane";
import { timePicker } from "@nimbus-ds/styles";
import type {
  TimePickerColumnProps,
  TimePickerColumnSingleProps,
  TimePickerColumnCombinedProps,
 OptionItem } from "./TimePickerColumn.types";
import { TimePickerOption } from "../TimePickerOption";
import {
  buildSingleOptions,
  buildCombinedOptions,
  handleColumnKeyDown,
} from "./TimePickerColumn.definitions";

const { classnames } = timePicker;

/**
 * TimePickerColumn renders a scrollable column of time values.
 * For type "hours" or "minutes": Uses ScrollPane with gradients for wheel-style selection.
 * For type "combined": Renders a flat scrollable list of full time options.
 */
export const TimePickerColumn: React.FC<TimePickerColumnProps> = ({
  type,
  label,
  ...rest
}: TimePickerColumnProps) => {
  const isCombined = type === "combined";

  const optionRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const currentValueRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const normalizedOptions = useMemo<OptionItem[]>(() => {
    if (isCombined) {
      const props = rest as TimePickerColumnCombinedProps;
      return buildCombinedOptions(
        props.options,
        props.currentValue,
        props.selectedValue,
        props.onSelectTime
      );
    }
    const props = rest as TimePickerColumnSingleProps;
    return buildSingleOptions(
      props.options,
      props.value,
      props.selected,
      props.onSelect
    );
  }, [rest, isCombined]);

  const hasCurrentValue = normalizedOptions.some((opt) => opt.isCurrent);

  useEffect(() => {
    if (currentValueRef.current) {
      currentValueRef.current.scrollIntoView({
        block: "center",
        // ScrollBehavior is not defined in current TS configuration
        behavior: "instant" as any,
      });
    }
  }, []);

  const onTabNext = isCombined
    ? undefined
    : (rest as TimePickerColumnSingleProps).onTabNext;
  const onTabPrev = isCombined
    ? undefined
    : (rest as TimePickerColumnSingleProps).onTabPrev;

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, index: number) => {
      handleColumnKeyDown({
        event,
        currentIndex: index,
        totalOptions: normalizedOptions.length,
        optionRefs,
        onTabNext,
        onTabPrev,
      });
    },
    [normalizedOptions.length, onTabNext, onTabPrev]
  );

  const scrollContainerRef = isCombined
    ? (rest as TimePickerColumnCombinedProps).scrollContainerRef
    : undefined;
  const listClassName = isCombined
    ? classnames.dropdownList
    : classnames.column;
  const ariaLabel = label || (isCombined ? undefined : type);

  return (
    <div className={classnames.columnWrapper} ref={wrapperRef}>
      <ScrollPane
        direction="vertical"
        showGradients={!isCombined}
        showScrollbar={false}
        scrollToItemOnClick
        scrollBehavior="always"
        contentContainerProps={{
          display: "flex",
          flexDirection: "column",
          margin: "none",
        }}
        scrollContainerRef={scrollContainerRef}
      >
        <div className={listClassName} role="listbox" aria-label={ariaLabel}>
          {normalizedOptions.map((option, index) => {
            const isFirst = !hasCurrentValue && index === 0;

            return (
              <ScrollPane.Item key={option.key}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TimePickerOption
                    ref={(el) => {
                      if (el) {
                        optionRefs.current.set(index, el);
                      } else {
                        optionRefs.current.delete(index);
                      }
                      if (option.isCurrent) {
                        currentValueRef.current = el;
                      }
                    }}
                    selected={option.isSelected}
                    current={option.isCurrent}
                    onSelect={option.onSelect}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    tabIndex={option.isCurrent || isFirst ? 0 : -1}
                  >
                    {option.displayValue}
                  </TimePickerOption>
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

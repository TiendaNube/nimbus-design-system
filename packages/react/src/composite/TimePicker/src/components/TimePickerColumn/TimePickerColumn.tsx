import React, { useRef, useEffect, useCallback } from "react";
import { ScrollPane } from "@nimbus-ds/scroll-pane";
import { timePicker } from "@nimbus-ds/styles";
import { TimePickerColumnProps } from "../../timePicker.types";
import { padZero } from "../../utils/timeUtils";
import { TimePickerOption } from "../TimePickerOption";
import type { SingleColumnProps, CombinedColumnProps } from "./TimePicker.types";
import { handleColumnKeyDown } from "./TimePickerColumn.definitions";

const { classnames } = timePicker;

/**
 * TimePickerColumn renders a scrollable column of time values.
 * For type "hours" or "minutes": Uses ScrollPane with gradients.
 * For type "combined": Renders a simple scrollable list of full time options.
 */
export const TimePickerColumn: React.FC<TimePickerColumnProps> = (props) => {
  const { type, format, label } = props;

  if (type === "combined") {
    return <CombinedColumn {...props} />;
  }

  return (
    <SingleColumn
      type={type}
      format={format}
      label={label}
      options={props.options}
      value={props.value}
      selected={props.selected}
      onSelect={props.onSelect}
      isDisabled={props.isDisabled}
    />
  );
};

const SingleColumn: React.FC<SingleColumnProps> = ({
  type,
  options,
  value,
  selected,
  onSelect,
  isDisabled,
  label,
}) => {
  const optionRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const currentValueRef = useRef<HTMLButtonElement>(null);
  const firstEnabledRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const firstEnabledIndex = options.findIndex((v) => !isDisabled?.(v));
  const hasCurrentValue = value !== undefined;

  useEffect(() => {
    const targetRef = currentValueRef.current || firstEnabledRef.current;
    if (targetRef) {
      targetRef.scrollIntoView({
        block: "center",
        behavior: "instant" as any
      });
    }
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, index: number) => {
      handleColumnKeyDown({
        event,
        currentIndex: index,
        totalOptions: options.length,
        isDisabledAtIndex: (idx) => isDisabled?.(options[idx]) ?? false,
        optionRefs,
      });
    },
    [options, isDisabled]
  );

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
      >
        <div
          className={classnames.column}
          role="listbox"
          aria-label={label || type}
        >
          {options.map((itemValue, index) => {
            const disabled = isDisabled?.(itemValue) ?? false;
            const isCurrent = itemValue === value;
            const isFirstEnabled = !hasCurrentValue && index === firstEnabledIndex;

            let optionRef: typeof currentValueRef | undefined;
            if (isCurrent) {
              optionRef = currentValueRef;
            } else if (isFirstEnabled) {
              optionRef = firstEnabledRef;
            }

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
                  <TimePickerOption
                    ref={(el) => {
                      if (el) {
                        optionRefs.current.set(index, el);
                      } else {
                        optionRefs.current.delete(index);
                      }
                      if (optionRef) {
                        optionRef.current = el;
                      }
                    }}
                    selected={itemValue === selected}
                    current={isCurrent}
                    disabled={disabled}
                    onSelect={() => onSelect(itemValue)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    tabIndex={isCurrent || isFirstEnabled ? 0 : -1}
                  >
                    {padZero(itemValue)}
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


const CombinedColumn: React.FC<CombinedColumnProps> = ({
  scrollContainerRef,
  options,
  currentValue,
  selectedValue,
  onSelectTime,
  label,
}) => {
  const optionRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const currentValueRef = useRef<HTMLButtonElement>(null);
  const firstEnabledRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const hasSelection = options.some(
    (option) => option.value.split(" ")[0] === currentValue
  );
  const firstEnabledIndex = options.findIndex((opt) => !opt.disabled);

  useEffect(() => {
    const targetRef = currentValueRef.current || firstEnabledRef.current;
    if (targetRef) {
      targetRef.scrollIntoView({
        block: "center",
        behavior: "instant" as ScrollBehavior,
      });
    }
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, index: number) => {
      handleColumnKeyDown({
        event,
        currentIndex: index,
        totalOptions: options.length,
        isDisabledAtIndex: (idx) => options[idx]?.disabled ?? false,
        optionRefs,
      });
    },
    [options]
  );

  return (
    <div className={classnames.columnWrapper} ref={wrapperRef}>
      <ScrollPane
        direction="vertical"
        showGradients={false}
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
        <div
          className={classnames.dropdownList}
          role="listbox"
          aria-label={label}
        >
          {options.map((option, index) => {
            const optionTimeValue = option.value.split(" ")[0];
            const isCurrent = optionTimeValue === currentValue;
            const isSelected = optionTimeValue === selectedValue;

            const isFirstEnabled = !hasSelection && index === firstEnabledIndex;
            const shouldBeTabable = isCurrent || isFirstEnabled;

            let optionRef: typeof currentValueRef | undefined;
            if (isCurrent) {
              optionRef = currentValueRef;
            } else if (isFirstEnabled) {
              optionRef = firstEnabledRef;
            }

            return (
              <ScrollPane.Item key={option.value}>
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
                      if (optionRef) {
                        optionRef.current = el;
                      }
                    }}
                    current={isCurrent}
                    selected={isSelected}
                    disabled={option.disabled}
                    onSelect={() =>
                      onSelectTime(option.hours, option.minutes, option.ampm)
                    }
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    tabIndex={shouldBeTabable ? 0 : -1}
                  >
                    {optionTimeValue}
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

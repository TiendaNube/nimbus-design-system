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
      onTabNext={props.onTabNext}
      onTabPrev={props.onTabPrev}
    />
  );
};

const SingleColumn: React.FC<SingleColumnProps> = ({
  type,
  options,
  value,
  selected,
  onSelect,
  label,
  onTabNext,
  onTabPrev,
}) => {
  const optionRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const currentValueRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const hasCurrentValue = value !== undefined;

  useEffect(() => {
    if (currentValueRef.current) {
      currentValueRef.current.scrollIntoView({
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
        optionRefs,
        onTabNext,
        onTabPrev,
      });
    },
    [options.length, onTabNext, onTabPrev]
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
            const isCurrent = itemValue === value;
            const isFirst = !hasCurrentValue && index === 0;

            return (
              <ScrollPane.Item key={itemValue}>
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
                      if (isCurrent) {
                        currentValueRef.current = el;
                      }
                    }}
                    selected={itemValue === selected}
                    current={isCurrent}
                    onSelect={() => onSelect(itemValue)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    tabIndex={isCurrent || isFirst ? 0 : -1}
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
  const wrapperRef = useRef<HTMLDivElement>(null);

  const hasSelection = options.some(
    (option) => option.value.split(" ")[0] === currentValue
  );

  useEffect(() => {
    if (currentValueRef.current) {
      currentValueRef.current.scrollIntoView({
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
        optionRefs,
      });
    },
    [options.length]
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
            const isFirst = !hasSelection && index === 0;

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
                      if (isCurrent) {
                        currentValueRef.current = el;
                      }
                    }}
                    current={isCurrent}
                    selected={isSelected}
                    onSelect={() =>
                      onSelectTime(option.hours, option.minutes, option.ampm)
                    }
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    tabIndex={isCurrent || isFirst ? 0 : -1}
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

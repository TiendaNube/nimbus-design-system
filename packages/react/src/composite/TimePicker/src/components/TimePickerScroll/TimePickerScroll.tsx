import React, { useRef, useCallback } from "react";
import { timePicker } from "@nimbus-ds/styles";

import { TimePickerScrollPanelProps } from "../../timePicker.types";
import { TimePickerColumn, TimePickerAmPm } from "../index";
import { focusColumnOption } from "./TimePickerScroll.definitions";

const { classnames } = timePicker;


/**
 * Internal scroll panel component that displays hour and minute columns
 * with a scroll-wheel interface for time selection.
 */
export const TimePickerScroll: React.FC<TimePickerScrollPanelProps> = ({
  format,
  disabled,
  labels,
  hourOptions,
  minuteOptions,
  initialValue,
  timeValue,
  setHours,
  setMinutes,
  setAmPm,
}) => {
  const hoursColumnRef = useRef<HTMLDivElement>(null);
  const minutesColumnRef = useRef<HTMLDivElement>(null);
  const amPmRef = useRef<HTMLDivElement>(null);

  const focusHoursColumn = useCallback(() => {
    focusColumnOption(hoursColumnRef);
  }, []);

  const focusMinutesColumn = useCallback(() => {
    focusColumnOption(minutesColumnRef);
  }, []);

  const focusAmPmColumn = useCallback(() => {
    focusColumnOption(amPmRef);
  }, []);

  return (
    <>
      <div ref={hoursColumnRef}>
        <TimePickerColumn
          type="hours"
          options={hourOptions}
          value={initialValue?.hours}
          selected={timeValue?.hours}
          onSelect={setHours}
          format={format}
          label={
            format === "12h"
              ? labels.hourLabel || "Hour"
              : labels.hoursLabel || "Hours"
          }
          onTabNext={focusMinutesColumn}
        />
      </div>
      <div className={classnames.divider} />
      <div ref={minutesColumnRef}>
        <TimePickerColumn
          type="minutes"
          options={minuteOptions}
          value={initialValue?.minutes}
          selected={timeValue?.minutes}
          onSelect={setMinutes}
          format={format}
          label={labels.minutesLabel || "Minutes"}
          onTabNext={format === "12h" ? focusAmPmColumn : undefined}
          onTabPrev={focusHoursColumn}
        />
      </div>
      {format === "12h" && (
        <>
          <div className={classnames.divider} />
          <div ref={amPmRef}>
            <TimePickerAmPm
              current={initialValue?.ampm}
              selected={timeValue?.ampm}
              onSelect={setAmPm}
              disabled={disabled}
              amLabel={labels.amLabel || "AM"}
              pmLabel={labels.pmLabel || "PM"}
              selectorLabel={labels.amPmSelectorLabel || "AM/PM selector"}
              onTabPrev={focusMinutesColumn}
            />
          </div>
        </>
      )}
    </>
  );
};

TimePickerScroll.displayName = "TimePickerScroll";

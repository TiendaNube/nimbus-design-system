import React from "react";
import { timePicker } from "@nimbus-ds/styles";

import { TimePickerScrollPanelProps } from "../../timePicker.types";
import { TimePickerColumn, TimePickerAmPm } from "../index";

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
}) => (
  <>
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
    />
    <div className={classnames.divider} />
    <TimePickerColumn
      type="minutes"
      options={minuteOptions}
      value={initialValue?.minutes}
      selected={timeValue?.minutes}
      onSelect={setMinutes}
      format={format}
      label={labels.minutesLabel || "Minutes"}
    />
    {format === "12h" && (
      <>
        <div className={classnames.divider} />
        <TimePickerAmPm
          current={initialValue?.ampm}
          selected={timeValue?.ampm}
          onSelect={setAmPm}
          disabled={disabled}
          amLabel={labels.amLabel || "AM"}
          pmLabel={labels.pmLabel || "PM"}
          selectorLabel={labels.amPmSelectorLabel || "AM/PM selector"}
        />
      </>
    )}
  </>
);

TimePickerScroll.displayName = "TimePickerScroll";

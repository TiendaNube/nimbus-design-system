import React, { HTMLAttributes, RefObject } from "react";

export type TimeFormat = "12h" | "24h";
export type PickerMode = "scroll" | "dropdown";
export type AmPm = "AM" | "PM";

/**
 * Translatable labels for the TimePicker component.
 * All texts can be customized for localization.
 */
export interface TimePickerLabels {
  /**
   * Label for the hours column in 24h format.
   * @default "Hours"
   */
  hoursLabel?: string;
  /**
   * Label for the hour column in 12h format.
   * @default "Hour"
   */
  hourLabel?: string;
  /**
   * Label for the minutes column.
   * @default "Minutes"
   */
  minutesLabel?: string;
  /**
   * Accessible label for the AM/PM selector group.
   * @default "AM/PM selector"
   */
  amPmSelectorLabel?: string;
  /**
   * Display text for the AM option.
   * @default "AM"
   */
  amLabel?: string;
  /**
   * Display text for the PM option.
   * @default "PM"
   */
  pmLabel?: string;
}

export interface TimeValue {
  hours: number;
  minutes: number;
  ampm?: AmPm;
}

export interface TimePickerProperties {
  /**
   * Current time value (HH:mm string format or Date object).
   * For 12h format, use "HH:mm AM/PM" or just "HH:mm" (will default to AM).
   */
  value?: string | Date | null;
  /**
   * Callback fired when the time changes.
   * @param value - The formatted time string (HH:mm for 24h, hh:mm AM/PM for 12h).
   * @param date - A Date object representing the selected time (today's date with selected time).
   */
  onChange?: (value: string | null, date: Date | null) => void;
  /**
   * Time format: 12-hour with AM/PM or 24-hour.
   * @default "24h"
   */
  format?: TimeFormat;
  /**
   * Picker mode: scroll (wheel columns) or dropdown (time list).
   * @default "scroll"
   */
  mode?: PickerMode;
  /**
   * Step interval in minutes for both scroll and dropdown modes.
   * Common values: 15, 30, 60.
   * @default 30
   */
  step?: number;
  /**
   * Minimum selectable time (HH:mm string format).
   * Times before this will be disabled.
   */
  minTime?: string;
  /**
   * Maximum selectable time (HH:mm string format).
   * Times after this will be disabled.
   */
  maxTime?: string;
  /**
   * Whether the picker is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Placeholder text for the input field.
   * @default "Select time"
   */
  placeholder?: string;
  /**
   * Controls the open state of the picker panel (controlled mode).
   */
  open?: boolean;
  /**
   * Callback fired when the panel open state changes.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Accessible label for the time picker input.
   */
  "aria-label"?: string;
  /**
   * ID of an element that labels the time picker.
   */
  "aria-labelledby"?: string;
  /**
   * ID of an element that describes the time picker.
   */
  "aria-describedby"?: string;
  /**
   * Name attribute for the hidden input (for form submission).
   */
  name?: string;
  /**
   * Whether the input is required.
   * @default false
   */
  required?: boolean;
  /**
   * ID attribute for the input element.
   */
  id?: string;
  /**
   * Translatable labels for localization.
   * Allows customization of all text content rendered by the component.
   */
  labels?: TimePickerLabels;
}

type OmittedHTMLAttributes = "value" | "onChange" | "placeholder" | "disabled";

export interface TimePickerProps
  extends TimePickerProperties,
    Omit<HTMLAttributes<HTMLDivElement>, OmittedHTMLAttributes> {
  /**
   * Ref to the container element.
   */
  ref?: RefObject<HTMLDivElement>;
}

export interface TimePickerColumnProps {
  /**
   * Type of values displayed in the column.
   */
  type: "hours" | "minutes";
  /**
   * Currently selected value.
   */
  value: number;
  /**
   * Callback when a value is selected.
   */
  onSelect: (value: number) => void;
  /**
   * Time format (affects hour range for hours column).
   */
  format: TimeFormat;
  /**
   * Function to determine if a value is disabled.
   */
  isDisabled?: (value: number) => boolean;
  /**
   * Label for the column (for accessibility).
   */
  label?: string;
  /**
   * Step interval in minutes (only applies to minutes column).
   * @default 1
   */
  step?: number;
}

export interface TimePickerOptionProps
  extends HTMLAttributes<HTMLButtonElement> {
  /**
   * Whether this option is currently selected.
   */
  selected?: boolean;
  /**
   * Whether this option represents the current time.
   */
  current?: boolean;
  /**
   * Whether this option is disabled.
   */
  disabled?: boolean;
  /**
   * The display value/label for this option.
   */
  children: React.ReactNode;
  /**
   * Callback when this option is selected.
   */
  onSelect?: () => void;
}

export interface TimePickerAmPmProps {
  /**
   * Currently selected AM/PM value.
   */
  value: AmPm;
  /**
   * Callback when AM/PM changes.
   */
  onChange: (value: AmPm) => void;
  /**
   * Whether the AM/PM selector is disabled.
   */
  disabled?: boolean;
  /**
   * Display text for the AM option.
   * @default "AM"
   */
  amLabel?: string;
  /**
   * Display text for the PM option.
   * @default "PM"
   */
  pmLabel?: string;
  /**
   * Accessible label for the AM/PM selector group.
   * @default "AM/PM selector"
   */
  selectorLabel?: string;
}

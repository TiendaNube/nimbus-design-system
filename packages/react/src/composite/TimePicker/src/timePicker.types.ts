import type { HTMLAttributes, RefObject } from "react";

export type TimeFormat = "12h" | "24h";
export type AmPm = "AM" | "PM";
export type TimePickerMode = "scroll" | "dropdown";

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
   * Display mode for the time picker panel.
   * - "scroll": Shows a scroll-based wheel picker with separate hour/minute columns.
   * - "dropdown": Shows a single scrollable list of time options.
   * @default "scroll"
   */
  mode?: TimePickerMode;
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
   * Step interval in minutes for the time picker.
   * For scroll mode: controls minute increments in the minutes column.
   * For dropdown mode: controls the time options shown in the list.
   * Common values: 1, 15, 30, 60.
   * @default 1 for scroll picker, 30 for dropdown
   */
  step?: number;
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

export interface DropdownOption {
  value: string;
  hours: number;
  minutes: number;
  ampm?: AmPm;
}

export interface TimePickerPanelBaseProps {
  format: TimeFormat;
  disabled: boolean;
  labels: TimePickerLabels;
  ariaLabel?: string;
}

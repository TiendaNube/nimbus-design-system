import React, { HTMLAttributes, RefObject } from "react";

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

interface TimePickerColumnBaseProps {
  /**
   * Time format (affects hour range for hours column).
   */
  format: TimeFormat;
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

interface TimePickerColumnSingleProps extends TimePickerColumnBaseProps {
  /**
   * Type of values displayed in the column.
   */
  type: "hours" | "minutes";
  /**
   * Available options for the column.
   * When provided, the column uses these values instead of computing them internally.
   */
  options: number[];
  /**
   * Current time picker column value.
   */
  value?: number;
  /**
   * Currently selected value.
   */
  selected?: number;
  /**
   * Callback when a value is selected.
   */
  onSelect: (value: number) => void;
  /**
   * Callback when Tab is pressed to move to next column.
   */
  onTabNext?: () => void;
  /**
   * Callback when Shift+Tab is pressed to move to previous column.
   */
  onTabPrev?: () => void;
}

interface TimePickerColumnCombinedProps extends TimePickerColumnBaseProps {
  /**
   * Type "combined" shows full time options (HH:mm) in a simple scrollable list.
   */
  type: "combined";
  /**
   * Pre-computed dropdown options for combined mode.
   */
  options: DropdownOption[];
  /**
   * The current/initial time value string (e.g., "14:30").
   */
  currentValue?: string | null;
  /**
   * The currently selected time value string.
   */
  selectedValue?: string | null;
  /**
   * Callback when a time option is selected.
   */
  onSelectTime: (hours: number, minutes: number, ampm?: AmPm) => void;
  /**
   * Ref to the scroll container.
   */
  scrollContainerRef?: RefObject<HTMLDivElement | null>;
}

export type TimePickerColumnProps =
  | TimePickerColumnSingleProps
  | TimePickerColumnCombinedProps;

export interface TimePickerOptionProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "role"> {
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
  /**
   * ARIA role for the button. Use "option" for listbox and "radio" for radiogroup.
   * @default "option"
   */
  role?: "option" | "radio";
}

export interface TimePickerPanelBaseProps {
  format: TimeFormat;
  disabled: boolean;
  labels: TimePickerLabels;
  ariaLabel?: string;
}

export interface TimePickerScrollPanelProps extends TimePickerPanelBaseProps {
  hourOptions: number[];
  minuteOptions: number[];
  initialValue: TimeValue | null;
  timeValue: Partial<TimeValue> | null;
  setHours: (hours: number) => void;
  setMinutes: (minutes: number) => void;
  setAmPm: (ampm: AmPm) => void;
}

export interface TimePickerDropdownPanelProps extends TimePickerPanelBaseProps {
  step: number;
  dropdownOptions: DropdownOption[];
  initialValue: TimeValue | null;
  internalTimeValue: Partial<TimeValue> | null;
  selectTime: (hours: number, minutes: number, ampm?: AmPm) => void;
  setAmPm: (ampm: AmPm) => void;
}



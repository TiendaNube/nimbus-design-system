import type { RefObject } from "react";
import type { TimeFormat , DropdownOption , AmPm } from "../../timePicker.types";

interface TabNavigationProps {
  onTabNext?: () => void;
  onTabPrev?: () => void;
}

interface OptionItem {
  key: string | number;
  displayValue: string;
  isCurrent: boolean;
  isSelected: boolean;
  onSelect: () => void;
}

export interface TimePickerColumnBaseProps {
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

export interface TimePickerColumnSingleProps extends TimePickerColumnBaseProps {
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

export interface TimePickerColumnCombinedProps
  extends TimePickerColumnBaseProps {
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

export type { TabNavigationProps, OptionItem };

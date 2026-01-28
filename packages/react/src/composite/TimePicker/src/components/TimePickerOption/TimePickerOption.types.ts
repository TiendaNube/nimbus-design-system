import type { HTMLAttributes, ReactNode } from "react";

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
  children: ReactNode;
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

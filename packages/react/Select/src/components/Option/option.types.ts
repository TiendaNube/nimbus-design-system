import { OptionHTMLAttributes } from "react";

export interface OptionProps extends OptionHTMLAttributes<HTMLOptionElement> {
  /** Indicates if option is disabled for selection */
  disabled?: boolean;
  /** Indicates if option is selected by default */
  selected?: boolean;
  /** Optional label for the option */
  label?: string;
  /** Value of the option */
  value?: string;
}

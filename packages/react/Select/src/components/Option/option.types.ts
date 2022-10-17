import { OptionHTMLAttributes } from "react";

export interface OptionProps extends OptionHTMLAttributes<HTMLOptionElement> {
  /** Optional label for the option */
  label?: string;
  /** Value of the option */
  value?: string;
}

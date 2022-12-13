import { OptionHTMLAttributes } from "react";

export interface SelectOptionProps
  extends OptionHTMLAttributes<HTMLOptionElement> {
  /** Label for the option */
  label: string;
  /** Value of the option */
  value: string;
}

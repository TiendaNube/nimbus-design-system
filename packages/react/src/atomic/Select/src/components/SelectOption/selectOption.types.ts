import type { OptionHTMLAttributes } from "react";

export interface SelectOptionProperties {
  /**
   * Label for the option.
   */
  label: string;
  /**
   * Value of the option
   */
  value: string;
}

export type SelectOptionProps = SelectOptionProperties &
  OptionHTMLAttributes<HTMLOptionElement>;

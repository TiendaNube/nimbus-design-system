import { InputHTMLAttributes } from "react";
import { CheckboxSkeleton } from "./components";

export interface CheckboxComponents {
  Skeleton: typeof CheckboxSkeleton;
}

export interface CheckboxProperties {
  /**
   * 	The name of the input element.
   */
  name: string;
  /**
   * Change the visual style of the checkbox.
   * @default neutral
   */
  appearance?: "primary" | "danger";
  /**
   * Modifies true/false value of the native checkbox.
   */
  checked?: boolean;
  /**
   * Modifies the native disabled state of the native checkbox.
   */
  disabled?: boolean;
  /**
   * If true, the component appears indeterminate. This does not set the native input element to indeterminate due to inconsistent behavior across browsers. However, we set a data-indeterminate attribute on the input.
   * @default false
   */
  indeterminate?: boolean;
  /**
   * Text to be rendered inside the component.
   */
  label?: string;
}

export type CheckboxProps = CheckboxProperties &
  InputHTMLAttributes<HTMLInputElement>;

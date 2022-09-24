import { HTMLAttributes } from "react";
import { CheckboxSkeleton } from "./components";

export interface CheckboxComponents {
  Skeleton: typeof CheckboxSkeleton;
}

export interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  /** Checkbox name */
  name: string;
  /** Checkbox color */
  appearance?: "primary" | "danger";
  /** Set whether checkbox state is checked */
  checked?: boolean;
  /** Set whether checkbox state is disabled */
  disabled?: boolean;
  /** Set whether checkbox state is indeterminate */
  indeterminate?: boolean;
  /** Text to be rendered inside the component */
  label?: string;
}

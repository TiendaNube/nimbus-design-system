import { InputHTMLAttributes } from "react";
import { Skeleton } from "./components";

export interface ToggleComponents {
  Skeleton: typeof Skeleton;
}

export interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Toggle name */
  name: string;
  /** Set whether Toggle state is checked */
  active?: boolean;
  /** Text to be rendered inside the component */
  label?: string;
}

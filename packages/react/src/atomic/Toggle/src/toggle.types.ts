import { InputHTMLAttributes } from "react";
import { ToggleSkeleton } from "./components";

export interface ToggleComponents {
  Skeleton: typeof ToggleSkeleton;
}

export interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Toggle name */
  name: string;
  /** Set whether Toggle state is checked */
  active?: boolean;
  /** Text to be rendered inside the component */
  label?: string;
}

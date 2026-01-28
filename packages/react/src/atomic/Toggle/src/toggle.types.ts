import { type InputHTMLAttributes } from "react";
import { type ToggleSkeleton } from "./components";

export interface ToggleComponents {
  Skeleton: typeof ToggleSkeleton;
}

export interface ToggleProperties {
  /**
   * The name of the input element.
   */
  name: string;
  /**
   * Sets toggle state to activated or deactivated.
   */
  active?: boolean;
  /**
   * Text to be rendered inside the component
   */
  label?: string;
}

export type ToggleProps = ToggleProperties &
  InputHTMLAttributes<HTMLInputElement>;

import { InputHTMLAttributes } from "react";
import { RadioSkeleton } from "./components";

export interface RadioComponents {
  Skeleton: typeof RadioSkeleton;
}

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Radio name */
  name: string;
  /** Radio appareance */
  as?: "radio" | "button";
  /** Set whether radio state is checked */
  checked?: boolean;
  /** Set whether radio state is disabled */
  disabled?: boolean;
  /** Text to be rendered inside the component */
  label?: string;
}

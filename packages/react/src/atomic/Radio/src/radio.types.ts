import { InputHTMLAttributes } from "react";
import { RadioSkeleton } from "./components";

export interface RadioComponents {
  Skeleton: typeof RadioSkeleton;
}

export interface RadioProperties {
  /**
   * Name attribute of the input element.
   */
  name: string;
  /**
   * Change the visual style of the radio.
   * @default radio
   */
  as?: "radio" | "button";
  /**
   * Modifies true/false value of the native radio.
   */
  checked?: boolean;
  /**
   * Modifies the native disabled state of the native radio.
   */
  disabled?: boolean;
  /**
   * Text to be rendered inside the component.
   */
  label?: string;
}

export type RadioProps = RadioProperties &
  InputHTMLAttributes<HTMLInputElement>;

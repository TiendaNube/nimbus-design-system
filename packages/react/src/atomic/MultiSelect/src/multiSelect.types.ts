import { InputHTMLAttributes } from "react";
import { MultiSelectSkeleton } from "./components";

export interface MultiSelectComponents {
  Skeleton: typeof MultiSelectSkeleton;
}

export interface MultiSelectOption {
  /**
   * Label for the option.
   */
  label: string;
  /**
   * Value of the option
   */
  value: string;
}

export interface MultiSelectProperties {
  /**
   * The name of the wrapper element or the select element when native.
   */
  name: string;
  /**
   * The id of the wrapper element or the select element when native.
   */
  id: string;
  /**
   * Change the visual style of the select.
   * @default neutral
   */
  appearance?: "success" | "warning" | "danger" | "neutral";
  /**
   * Options of the MultiSelect
   */
  options: MultiSelectOption[];
  /**
   * Options of the MultiSelect
   */
  onChange?: (values: string[]) => void;
}

export type MultiSelectBaseProps = MultiSelectProperties &
  Omit<InputHTMLAttributes<HTMLInputElement>, "children">;

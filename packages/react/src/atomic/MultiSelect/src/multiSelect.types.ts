import { type InputHTMLAttributes } from "react";
import { type multiSelect } from "@nimbus-ds/styles";
import { type MultiSelectSkeleton } from "./components";

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
  onChange?: (values: MultiSelectOption[]) => void;
  /**
   * Deafult of the MultiSelect
   */
  value?: MultiSelectOption[];
  /**
   * ZIndex of the MultiSelect
   */
  zIndex?: keyof typeof multiSelect.properties.zIndex;
}

export type MultiSelectBaseProps = MultiSelectProperties &
  Omit<InputHTMLAttributes<HTMLInputElement>, "children" | "value">;

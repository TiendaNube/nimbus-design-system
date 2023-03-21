import { ReactNode, SelectHTMLAttributes } from "react";
import { SelectGroup, SelectOption, SelectSkeleton } from "./components";

export interface SelectComponents {
  Group: typeof SelectGroup;
  Option: typeof SelectOption;
  Skeleton: typeof SelectSkeleton;
}

export interface SelectProperties {
  /**
   * The name of the wrapper element or the select element when native.
   */
  name: string;
  /**
   * The id of the wrapper element or the select element when native.
   */
  id: string;
  /**
   * The content of the select.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * Change the visual style of the select.
   * @default neutral
   */
  appearance?: "success" | "warning" | "danger" | "neutral";
}

export type SelectProps = SelectProperties &
  SelectHTMLAttributes<HTMLSelectElement>;

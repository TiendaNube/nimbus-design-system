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
  appearance?: "success" | "warning" | "danger" | "neutral" | "ai-generative";
  /**
   * Shows ai-generative appearance with active ai focus shadow.
   * @default false
   */
  aiGenerated?: boolean;
}

export type SelectBaseProps = SelectProperties &
  SelectHTMLAttributes<HTMLSelectElement>;

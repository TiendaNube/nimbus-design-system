import { ReactNode, ButtonHTMLAttributes } from "react";
import { ChipSkeleton } from "./components";

export interface ChipComponents {
  Skeleton: typeof ChipSkeleton;
}

export interface ChipProperties {
  /** 
   Text to be displayed on chip.
  */
  text: string;
  /**
   * SVG icon to be displayed on chip.
   * @TJS-type React.ReactNode
   */
  icon?: ReactNode;
  /**
   * Informs whether the close icon should be displayed.
   */
  removable?: boolean;
}

export type ChipProps = ChipProperties &
  ButtonHTMLAttributes<HTMLButtonElement>;

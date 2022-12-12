import { ReactNode, ButtonHTMLAttributes } from "react";
import { ChipSkeleton } from "./components";

export interface ChipComponents {
  Skeleton: typeof ChipSkeleton;
}

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** SVG icon to be displayed on chip */
  icon?: ReactNode;
  /** Informs whether the close icon should be displayed */
  removable?: boolean;
  /** Text to be displayed on chip */
  text: string;
}

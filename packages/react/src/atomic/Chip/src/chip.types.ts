import { ReactNode, ButtonHTMLAttributes } from "react";
import { Skeleton } from "./components";

export interface ChipComponents {
  Skeleton: typeof Skeleton;
}

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** SVG icon to be displayed on chip */
  icon?: ReactNode;
  /** Informs whether the close icon should be displayed */
  removable?: boolean;
  /** Text to be displayed on chip */
  text: string;
}

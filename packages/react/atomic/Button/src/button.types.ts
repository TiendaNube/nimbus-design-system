import { ReactNode, ButtonHTMLAttributes } from "react";
import { Skeleton } from "./components";

export interface ButtonComponents {
  Skeleton: typeof Skeleton;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Text to be displayed on chip */
  children: ReactNode;
  /** Button appearance */
  appearance?: "primary" | "danger" | "neutral";
  /** Set whether button state is disabled */
  disabled?: boolean;
}

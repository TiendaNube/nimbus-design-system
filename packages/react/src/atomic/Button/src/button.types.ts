import { ReactNode, HTMLAttributes } from "react";
import { ButtonSkeleton } from "./components";

export interface ButtonComponents {
  Skeleton: typeof ButtonSkeleton;
}

export interface ButtonProps extends HTMLAttributes<HTMLElement> {
  /** Text to be displayed on chip */
  children: ReactNode;
  /** Button appearance */
  appearance?: "primary" | "danger" | "neutral" | "transparent";
  /** Set whether button state is disabled */
  disabled?: boolean;
}

import { ReactNode, ButtonHTMLAttributes } from "react";
import { ButtonSkeleton, ButtonLink } from "./components";

export interface ButtonComponents {
  Skeleton: typeof ButtonSkeleton;
  Link: typeof ButtonLink;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Text to be displayed on chip */
  children: ReactNode;
  /** Button appearance */
  appearance?: "primary" | "danger" | "neutral" | "transparent";
  /** Set whether button state is disabled */
  disabled?: boolean;
}

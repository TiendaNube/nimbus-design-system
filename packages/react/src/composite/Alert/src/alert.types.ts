import { HTMLAttributes, ReactNode } from "react";
import { Skeleton } from "./components";

export interface AlertComponents {
  Skeleton: typeof Skeleton;
}

export interface AlertProps extends HTMLAttributes<HTMLElement> {
  /** Alert title */
  title?: string;
  /** Alert appearance */
  appearance?: "primary" | "success" | "warning" | "danger" | "neutral";
  /** Alert body content */
  children: ReactNode;
  /** Function to be passed on actioning the dismiss button */
  onRemove?: () => void;
  /** Determines if the alert is shown or not */
  show?: boolean;
}

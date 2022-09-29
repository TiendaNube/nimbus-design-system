import { HTMLAttributes } from "react";
import { Skeleton } from "./components";

export interface BadgeComponents {
  Skeleton: typeof Skeleton;
}

export interface BadgeProps extends HTMLAttributes<HTMLElement> {
  /** Badge color */
  appearance?: "primary" | "success" | "warning" | "danger" | "neutral";
  /** Total items to be displayed without badge */
  count: number | string;
  /** Badge appearance color scheme */
  theme?: "surface" | "light";
}

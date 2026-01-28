import type { HTMLAttributes } from "react";
import type { BadgeSkeleton } from "./components";

export interface BadgeComponents {
  Skeleton: typeof BadgeSkeleton;
}

export interface BadgeProperties {
  /**
   * Change the visual style of the badge.
   * @default neutral
   */
  appearance?: "primary" | "success" | "warning" | "danger" | "neutral";
  /**
   * Total items to be displayed without badge
   */
  count: number | string;
  /**
   * Change the color scheme of the badge.
   * @default surface
   */
  theme?: "surface" | "light";
}

export type BadgeProps = BadgeProperties & HTMLAttributes<HTMLElement>;

import { type HTMLAttributes } from "react";
import { type BadgeSkeleton } from "./components";

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
   * Total items to be displayed in the badge.
   * Not applicable when type is "dot".
   */
  count?: number | string;
  /**
   * Change the color scheme of the badge.
   * @default surface
   */
  theme?: "surface" | "light";
  /**
   * Change the badge shape.
   * Use "dot" for a small indicator without text.
   * @default count
   */
  type?: "count" | "dot";
}

export type BadgeProps = BadgeProperties & HTMLAttributes<HTMLElement>;

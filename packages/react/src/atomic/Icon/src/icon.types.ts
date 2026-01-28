import type { ReactNode, HTMLAttributes } from "react";

import type { icon } from "@nimbus-ds/styles";
import type { IconSkeleton } from "./components";

export interface IconComponents {
  Skeleton: typeof IconSkeleton;
}

export interface IconProperties {
  /**
   * The SVG contents to display in the Icon.
   * @TJS-type React.ReactNode
   */
  source: ReactNode;
  /**
   * Set the color for the SVG fill.
   * Use "ai-generative" to apply the Nimbus AI generative gradient.
   * @default neutral-textLow
   */
  color?: keyof typeof icon.properties.color | "ai-generative";
  /**
   * The cursor property specifies the mouse cursor to be displayed when pointing over an element.
   * @default inherit
   */
  cursor?: (typeof icon.properties.cursor)[number];
}

export type IconProps = IconProperties & HTMLAttributes<HTMLDivElement>;

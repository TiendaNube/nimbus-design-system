import { ReactNode, HTMLAttributes } from "react";

import { icon } from "@nimbus-ds/styles";
import { IconSkeleton } from "./components";

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
   * @default neutral-textLow
   */
  color?: keyof typeof icon.properties.color;
  /**
   * The cursor property specifies the mouse cursor to be displayed when pointing over an element.
   * @default inherit
   */
  cursor?: typeof icon.properties.cursor[number];
}

export type IconProps = IconProperties & HTMLAttributes<HTMLDivElement>;

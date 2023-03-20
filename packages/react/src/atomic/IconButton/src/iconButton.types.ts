import { ReactNode, ButtonHTMLAttributes } from "react";
import { IconButtonSprinkle } from "@nimbus-ds/styles";

import { IconButtonSkeleton } from "./components";

export interface IconButtonComponents {
  Skeleton: typeof IconButtonSkeleton;
}

export interface IconButtonProperties extends IconButtonSprinkle {
  /**
   * Type of html tag to create for the Icon Button component.
   * @default button
   */
  as?: "button" | "div";
  /**
   * The SVG contents to display in the Icon button.
   * @TJS-type React.ReactNode
   */
  source: ReactNode;
}

export type IconButtonProps = IconButtonProperties &
  ButtonHTMLAttributes<HTMLButtonElement | HTMLDivElement>;

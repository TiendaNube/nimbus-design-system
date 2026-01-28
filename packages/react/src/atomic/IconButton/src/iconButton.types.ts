import { type ReactNode, type ButtonHTMLAttributes } from "react";
import { type IconButtonSprinkle } from "@nimbus-ds/styles";
import type { IconProps } from "@nimbus-ds/icon";

import { type IconButtonSkeleton } from "./components";

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
  /**
   * Set the color for the inner Icon fill.
   * @default neutral-textHigh
   */
  color?: IconProps["color"];

  /**
   * AI gradient background appearance for the button container.
   * When provided, container color/border sprinkles are ignored in favor of gradient styles.
   */
  appearance?: "ai-generative";
}

export type IconButtonProps = IconButtonProperties &
  ButtonHTMLAttributes<HTMLButtonElement | HTMLDivElement>;

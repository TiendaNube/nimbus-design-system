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
   * Visual style of the icon button container.
   * - `transparent`: no background or border at rest; subtle hover/active states only.
   * - `ai-generative`: gradient background; overrides color/border sprinkles.
   * When omitted, the default bordered appearance is used.
   */
  appearance?: "transparent" | "ai-generative" | "ai-secondary";
}

export type IconButtonProps = IconButtonProperties &
  ButtonHTMLAttributes<HTMLButtonElement | HTMLDivElement>;

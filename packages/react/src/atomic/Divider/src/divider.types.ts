import { type HTMLAttributes } from "react";

export interface DividerProperties {
  /**
   * Defines the orientation of the divider.
   * @default horizontal
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Visual appearance color.
   * @default neutral
   */
  appearance?: "neutral" | "primary";

  /**
   * Thickness level based on shape.border.width tokens.
   * @default 1
   */
  thickness?: 1 | 2 | 3;

  /**
   * CSS width of the divider. Applies to horizontal orientation only.
   * @default "100%"
   */
  width?: string;

  /**
   * CSS margin-left applied to the divider.
   */
  marginLeft?: string;

  /**
   * CSS margin-right applied to the divider.
   */
  marginRight?: string;
}

export type DividerProps = DividerProperties & HTMLAttributes<HTMLHRElement>;

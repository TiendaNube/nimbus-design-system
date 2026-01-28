import type { HTMLAttributes } from "react";

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
  appearance?: "neutral";

  /**
   * Thickness level based on shape.border.width tokens.
   * @default 1
   */
  thickness?: 1 | 2 | 3;
}

export type DividerProps = DividerProperties & HTMLAttributes<HTMLHRElement>;

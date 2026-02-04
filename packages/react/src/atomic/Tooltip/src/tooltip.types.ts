import { type HTMLAttributes, type ReactNode } from "react";
import { type TooltipSprinkle } from "@nimbus-ds/styles";

export interface TooltipProperties extends TooltipSprinkle {
  /**
   * An HTML element, or a function that returns one. It's used to set the position of the tooltip.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * The text that should appear in the tooltip message.
   */
  content: string;
  /**
   * Conditional for displaying the popover arrow.
   * @default false
   */
  arrow?: boolean;
  /**
   * Position of the popover.
   * @default bottom
   */
  position?: "top" | "bottom" | "left" | "right";
}

export type TooltipProps = TooltipProperties & HTMLAttributes<HTMLDivElement>;

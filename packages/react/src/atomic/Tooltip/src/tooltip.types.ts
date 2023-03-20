import { HTMLAttributes, ReactNode } from "react";

export interface TooltipProperties {
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
   * Position of the popover.
   * @default bottom
   */
  position?: "top" | "bottom" | "left" | "right";
}

export type TooltipProps = TooltipProperties & HTMLAttributes<HTMLDivElement>;

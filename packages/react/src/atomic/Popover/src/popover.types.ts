import { HTMLAttributes, ReactNode } from "react";
import { PopoverSprinkle } from "@nimbus-ds/styles";

type PopoverPlacement =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "bottom-start"
  | "bottom-end"
  | "left-start"
  | "left-end"
  | "right-start"
  | "right-end"
  | "top-start"
  | "top-end";

export interface PopoverProperties extends PopoverSprinkle {
  /**
   * An HTML element, or a function that returns one. It's used to set the position of the popover.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * The content of the popover.
   * @TJS-type React.ReactNode
   */
  content: ReactNode;
  /**
   * If true, the component is shown.
   */
  visible?: boolean;
  /**
   * Function to control popover opening and closing.
   * @TJS-type (visible: boolean) => void;
   */
  onVisibility?: (visible: boolean) => void;
  /**
   * Conditional for displaying the popover arrow.
   * @default true
   */
  arrow?: boolean;
  /**
   * Position of the popover.
   * @default bottom
   */
  position?: PopoverPlacement;
  /**
   * Adds hover event listeners that change the open state, like CSS :hover.
   * @default false
   */
  enabledHover?: boolean;
  /**
   * Adds click event listeners that change the open state.
   * @default true
   */
  enabledClick?: boolean;
  /**
   * Adds listeners that dismiss (close) the floating element.
   * @default true
   */
  enabledDismiss?: boolean;
  /**
   * Offest displaces the floating element from its core placement along the specified axes.
   * @default 10
   */
  offset?: number;
}

export type PopoverProps = PopoverProperties & HTMLAttributes<HTMLDivElement>;

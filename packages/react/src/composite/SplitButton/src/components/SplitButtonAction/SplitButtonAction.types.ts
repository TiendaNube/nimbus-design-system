import type { ReactNode } from "react";
import type { BoxProps } from "@nimbus-ds/box";

export interface SplitButtonActionProperties {
  /**
   * The content of the action item.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * Optional icon to display before the action text.
   * @TJS-type React.ReactNode
   */
  icon?: ReactNode;
  /**
   * Callback function when the action is clicked.
   * @TJS-type () => void;
   */
  onClick?: () => void;
  /**
   * Disables the action item.
   * @default false
   */
  disabled?: boolean;
}

export type SplitButtonActionProps = SplitButtonActionProperties &
  Pick<
    BoxProps,
    | "backgroundColor"
    | "borderWidth"
    | "display"
    | "alignItems"
    | "gap"
    | "p"
    | "borderRadius"
  >;

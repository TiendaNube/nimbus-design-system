import { ReactNode } from "react";
import { BoxProps } from "@nimbus-ds/box";

import { PopoverProps } from "@nimbus-ds/popover";
import {
  SplitButtonAction,
  SplitButtonPrimary,
  SplitButtonSecondary,
} from "./components";

export interface SplitButtonComponents {
  Action: typeof SplitButtonAction;
  Primary: typeof SplitButtonPrimary;
  Secondary: typeof SplitButtonSecondary;
}

export interface SplitButtonProperties {
  /**
   * The subcomponents (Primary and Secondary).
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * Disables the entire split button.
   * @default false
   */
  disabled?: boolean;
  /**
   * Controls the visibility of the popover.
   */
  open?: boolean;
  /**
   * Callback function to control popover opening and closing.
   * @TJS-type (open: boolean) => void;
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Position of the popover relative to the button.
   * @default bottom-end
   */
  popoverPosition?: PopoverProps["position"];
}

export type SplitButtonProps = SplitButtonProperties &
  Omit<BoxProps, "children" | "display" | "gap" | "position">;

import { HTMLAttributes, ReactNode } from "react";
import { Placement } from "@floating-ui/react-dom-interactions";
import { PopoverSprinkle } from "@nimbus-ds/styles";

type PopoverExtends = PopoverSprinkle & HTMLAttributes<HTMLDivElement>;

export interface PopoverProps extends PopoverExtends {
  /** Popover anchor */
  children: ReactNode;
  /** Content for the Popover */
  content: ReactNode;
  /** Default open popover */
  visible?: boolean;
  /** Function to control popover opening and closing */
  onVisibility?: (visible: boolean) => void;
  /** Conditional for displaying the popover arrow */
  arrow?: boolean;
  /** Position of the Popover */
  position?: Placement;
  /** Adds hover event listeners that change the open state, like CSS :hover */
  enabledHover?: boolean;
  /** Adds click event listeners that change the open state */
  enabledClick?: boolean;
  /** Adds listeners that dismiss (close) the floating element */
  enabledDismiss?: boolean;
  /** offset() displaces the floating element from its core placement along the specified axes */
  offset?: number;
}

import { HTMLAttributes, ReactNode } from "react";
import { Placement } from "@floating-ui/react-dom-interactions";
import { popover } from "@nimbus-ds/styles";

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
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
  /** Popover appearance */
  appearance?:
    | "primary"
    | "success"
    | "danger"
    | "neutral"
    | "warning"
    | "light";
  /** Position of the Popover */
  position?: Placement;
  /** Popover padding */
  padding?: keyof typeof popover.properties.padding;
  /** Adds hover event listeners that change the open state, like CSS :hover */
  enabledHover?: boolean;
  /** Adds click event listeners that change the open state */
  enabledClick?: boolean;
  /** Adds listeners that dismiss (close) the floating element */
  enabledDismiss?: boolean;
  /** offset() displaces the floating element from its core placement along the specified axes */
  offset?: number;
}

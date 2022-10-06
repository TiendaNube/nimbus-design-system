import { HTMLAttributes, ReactNode } from "react";
import { popover } from "@nimbus-ds/styles";

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
  /** Popover anchor */
  children: ReactNode;
  /** Content for the Popover */
  content: ReactNode;
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
  position?: "top" | "bottom" | "left" | "right";
  /** Popover padding */
  padding?: keyof typeof popover.properties.padding;
}

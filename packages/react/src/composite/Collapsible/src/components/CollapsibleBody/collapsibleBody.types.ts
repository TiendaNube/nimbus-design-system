import { HTMLAttributes, ReactNode } from "react";

export interface CollapsibleBodyProperties {
  /**
   * The content of the accordion body.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * Show Collapsible.Body when state is open or closed.
   * @default open
   */
  visibleWhen?: "open" | "closed";

  /**
   * Set the direction that Collapsible.Body going to open
   * @default none
   */
  direction?: "top" | "bottom" | "none";
}

export type CollapsibleBodyProps = CollapsibleBodyProperties &
  HTMLAttributes<HTMLElement>;

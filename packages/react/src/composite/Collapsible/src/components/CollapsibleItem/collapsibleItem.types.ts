import { ReactNode } from "react";

export interface CollapsibleItemProperties {
  /**
   * The content of the collapsible body.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type CollapsibleItemProps = CollapsibleItemProperties;

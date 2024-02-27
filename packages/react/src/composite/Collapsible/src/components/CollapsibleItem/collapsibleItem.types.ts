import { ReactNode } from "react";

export interface CollapsibleItemProperties {
  /**
   * The content of the accordion body.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type CollapsibleItemProps = CollapsibleItemProperties;

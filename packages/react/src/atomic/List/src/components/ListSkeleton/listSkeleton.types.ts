import { HTMLAttributes, ReactNode } from "react";

export interface ListSkeletonProperties {
  /**
   * The content of the list skeleton.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * This is an attribute used to identify a DOM node for testing purposes.
   */
  "data-testid"?: string;
}

export type ListSkeletonProps = ListSkeletonProperties &
  HTMLAttributes<HTMLDivElement>;

import type { HTMLAttributes } from "react";

export interface SkeletonProperties {
  /**
   * Width of the skeleton. Useful when the skeleton is inside an inline element with no width of its own.
   */
  width: string;
  /**
   * Height of the skeleton. Useful when you don't want to adapt the skeleton to a text element but for instance a card.
   */
  height: string;
  /**
   * The border radius of the skeleton.
   */
  borderRadius?: string;
  /**
   * This is an attribute used to identify a DOM node for testing purposes.
   */
  "data-testid"?: string;
}

export type SkeletonProps = SkeletonProperties & HTMLAttributes<HTMLDivElement>;

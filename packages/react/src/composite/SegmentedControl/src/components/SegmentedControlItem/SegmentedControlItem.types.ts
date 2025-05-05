import { ReactNode, HTMLAttributes } from "react";

export interface SegmentedControlItemProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Label of the segment.
   */
  label: string;
  /**
   * Content of the segment.
   */
  children?: ReactNode;
} 
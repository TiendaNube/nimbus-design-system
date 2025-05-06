import React, {
  ButtonHTMLAttributes,
  CSSProperties,
  PropsWithChildren,
} from "react";
import { SegmentedControlButtonSkeletonProps } from "./components/SegmentedControlButtonSkeleton/SegmentedControlButtonSkeleton.types";

export type SegmentedControlButtonProperties = PropsWithChildren<{
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Custom style
   */
  style?: CSSProperties;
  /**
   * Label of the segment.
   */
  label: string;
  /**
   * Determines if segment is active.
   * @default false
   */
  active?: boolean;
  /**
   * Position of the segment inside the segmented control.
   */
  index: number;
  /**
   * Function executed when clicking the segment.
   * @TJS-type (index: number) => void;
   */
  setActiveSegment: (index: number) => void;
  /**
   * Whether the segment is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Determines if segment spans all available width.
   * @default false
   */
  fullWidth?: boolean;
}> &
  ButtonHTMLAttributes<HTMLButtonElement>;

export interface SegmentedControlButtonComponents {
  Skeleton: React.FC<SegmentedControlButtonSkeletonProps>;
}

import { type ButtonHTMLAttributes, type PropsWithChildren } from "react";
import type React from "react";
import type { SegmentedControlButtonSkeletonProps } from "./components/SegmentedControlButtonSkeleton/SegmentedControlButtonSkeleton.types";

export type SegmentedControlButtonProperties = PropsWithChildren<{
  /**
   * Unique identifier for the segment button.
   * Required for proper state management and accessibility.
   */
  id: string;
  /**
   * Label of the segment used for accessibility.
   */
  label?: string;
  /**
   * Determines if segment spans all available width.
   * @default false
   */
  fullWidth?: boolean;
}>;

export type SegmentedControlButtonProps = SegmentedControlButtonProperties &
  ButtonHTMLAttributes<HTMLButtonElement>;

export interface SegmentedControlButtonComponents {
  Skeleton: React.FC<SegmentedControlButtonSkeletonProps>;
}

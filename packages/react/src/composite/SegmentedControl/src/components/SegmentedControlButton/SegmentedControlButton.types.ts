import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";
import type { SegmentedControlButtonSkeletonProps } from "./components/SegmentedControlButtonSkeleton/SegmentedControlButtonSkeleton.types";

export type SegmentedControlButtonProperties = PropsWithChildren<{
  /**
   * Label of the segment.
   */
  label: string;
  /**
   * Determines if segment is active.
   * @default false
   */
  selected?: boolean;
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

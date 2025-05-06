import React, { CSSProperties, PropsWithChildren } from "react";
import { PolymorphicForwardRefComponent } from "@nimbus-ds/typings";
import { SegmentedControlButtonSkeletonProps } from "./components/SegmentedControlButtonSkeleton/SegmentedControlButtonSkeleton.types";

export type SegmentedControlButtonBaseProps = PropsWithChildren<{
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
}>;

export interface SegmentedControlButtonComponents {
  Skeleton: React.FC<SegmentedControlButtonSkeletonProps>;
}

// Forward declaration to be defined after the component is created
// This will be properly set after the component definition
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SegmentedControlButtonProperties = PolymorphicForwardRefComponent<
  "button" | "a",
  SegmentedControlButtonBaseProps
>;

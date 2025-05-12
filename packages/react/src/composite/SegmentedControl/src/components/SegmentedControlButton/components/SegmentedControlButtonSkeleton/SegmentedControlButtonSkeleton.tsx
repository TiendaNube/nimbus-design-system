import React from "react";
import { Skeleton } from "@nimbus-ds/skeleton";
import { SegmentedControlButtonSkeletonProps } from "./SegmentedControlButtonSkeleton.types";

/**
 * Skeleton loader for SegmentedControlButton component
 * @component
 * @example
 * <SegmentedControlButtonSkeleton width="100px" height="40px" />
 */
const SegmentedControlButtonSkeleton: React.FC<SegmentedControlButtonSkeletonProps> = ({
  width = "100%",
  height = "2rem",
  ...props
}) => (
  <Skeleton
    width={width}
    height={height}
    borderRadius="0.5rem"
    {...props}
  />
);

export { SegmentedControlButtonSkeleton };

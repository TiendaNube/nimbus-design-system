import React from "react";
import { Skeleton } from "@nimbus-ds/skeleton";

import { type SelectSkeletonProps } from "./selectSkeleton.types";

const dimensions = {
  medium: { height: "2.25rem", borderRadius: "0.5rem" },
  small: { height: "1.625rem", borderRadius: "0.375rem" },
} as const;

const SelectSkeleton: React.FC<SelectSkeletonProps> = ({
  className,
  width,
  size = "medium",
  "data-testid": dataTestId,
}) => (
  <Skeleton
    className={className}
    width={width ?? "15rem"}
    height={dimensions[size].height}
    borderRadius={dimensions[size].borderRadius}
    data-testid={dataTestId}
  />
);

export { SelectSkeleton };

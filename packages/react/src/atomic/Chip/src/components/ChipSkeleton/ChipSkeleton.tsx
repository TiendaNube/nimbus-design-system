import React from "react";

import { Skeleton } from "@nimbus-ds/skeleton";
import { type ChipSkeletonProps } from "./chipSkeleton.types";

const ChipSkeleton: React.FC<ChipSkeletonProps> = ({
  className,
  width,
  height,
  "data-testid": dataTestId,
}) => (
  <Skeleton
    className={className}
    width={width ?? "4.375rem"}
    height={height ?? "1.5rem"}
    borderRadius="0.25rem"
    data-testid={dataTestId}
  />
);

export { ChipSkeleton };

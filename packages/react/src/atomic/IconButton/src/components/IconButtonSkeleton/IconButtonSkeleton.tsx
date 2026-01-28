import React from "react";

import { Skeleton } from "@nimbus-ds/skeleton";
import type { IconButtonSkeletonProps } from "./iconButtonSkeleton.types";

const IconButtonSkeleton: React.FC<IconButtonSkeletonProps> = ({
  width,
  height,
  "data-testid": dataTestId,
}) => (
  <Skeleton
    width={width ?? "2.75rem"}
    height={height ?? "2.75rem"}
    borderRadius="100%"
    data-testid={dataTestId}
  />
);

export { IconButtonSkeleton };

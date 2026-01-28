import React from "react";
import { Skeleton } from "@nimbus-ds/skeleton";

import type { MultiSelectSkeletonProps } from "./multiSelectSkeleton.types";

const MultiSelectSkeleton: React.FC<MultiSelectSkeletonProps> = ({
  width,
  "data-testid": dataTestId,
}) => (
  <Skeleton
    width={width ?? "15rem"}
    height="2.25rem"
    borderRadius="0.5rem"
    data-testid={dataTestId}
  />
);

export { MultiSelectSkeleton };

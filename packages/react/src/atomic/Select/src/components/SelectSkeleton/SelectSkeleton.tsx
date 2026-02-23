import React from "react";
import { Skeleton } from "@nimbus-ds/skeleton";

import { type SelectSkeletonProps } from "./selectSkeleton.types";

const SelectSkeleton: React.FC<SelectSkeletonProps> = ({
  className,
  width,
  "data-testid": dataTestId,
}) => (
  <Skeleton
    className={className}
    width={width ?? "15rem"}
    height="2.25rem"
    borderRadius="0.5rem"
    data-testid={dataTestId}
  />
);

export { SelectSkeleton };

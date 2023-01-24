import React from "react";

import { Skeleton } from "@nimbus-ds/skeleton";
import { TagSkeletonProps } from "./tagSkeleton.types";

const TagSkeleton: React.FC<TagSkeletonProps> = ({
  width,
  height,
  "data-testid": dataTestId,
}) => (
  <Skeleton
    width={width ?? "3.313rem"}
    height={height ?? "1.5rem"}
    borderRadius="0.813rem"
    data-testid={dataTestId}
  />
);

export { TagSkeleton };

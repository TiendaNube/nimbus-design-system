import React from "react";

import { Skeleton } from "@nimbus-ds/skeleton";
import { TextSkeletonProps } from "./textSkeleton.types";
import { sizes } from "./textSkeleton.definitions";

const TextSkeleton: React.FC<TextSkeletonProps> = ({
  size = "caption",
  width,
  height,
  "data-testid": dataTestId,
}) => (
  <Skeleton
    width={width ?? sizes[size].width}
    height={height ?? sizes[size].height}
    data-testid={dataTestId}
    borderRadius="4px"
  />
);

export { TextSkeleton };

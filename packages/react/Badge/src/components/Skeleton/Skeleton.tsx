import React from "react";

import { Skeleton as SkeletonBase } from "@nimbus-ds/skeleton";
import { SkeletonProps } from "./skeleton.types";

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  "data-testid": dataTestId,
}) => (
  <SkeletonBase
    width={width ?? "1.5rem"}
    height={height ?? "1.25rem"}
    borderRadius="0.813rem"
    data-testid={dataTestId}
  />
);

Skeleton.displayName = "Badge.Skeleton";
export { Skeleton };

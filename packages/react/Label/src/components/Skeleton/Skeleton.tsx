import React from "react";

import { Skeleton as SkeletonBase } from "@nimbus-ds/skeleton";
import { SkeletonProps } from "./skeleton.types";

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  "data-testid": dataTestId,
}) => (
  <SkeletonBase
    width={width ?? "4.375rem"}
    height={height ?? "1rem"}
    borderRadius="0"
    data-testid={dataTestId}
  />
);

Skeleton.displayName = "Label.Skeleton";

export { Skeleton };

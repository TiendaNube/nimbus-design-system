import React from "react";

import { Skeleton as SkeletonBase } from "@nimbus-ds/skeleton";
import { SkeletonProps } from "./skeleton.types";

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  "data-testid": dataTestId,
}) => (
  <SkeletonBase
    width={width ?? "1rem"}
    height={height ?? "1rem"}
    borderRadius="0.25rem"
    data-testid={dataTestId}
  />
);

export { Skeleton };
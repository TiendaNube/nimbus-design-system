import React from "react";

import { Skeleton as SkeletonBase } from "@nimbus-ds/skeleton";
import { SkeletonProps } from "./skeleton.types";

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  "data-testid": dataTestId,
}) => (
  <SkeletonBase
    width={width ?? "100%"}
    height={height ?? "4.875rem"}
    borderRadius="0.5rem"
    data-testid={dataTestId}
  />
);

Skeleton.displayName = "Alert.Skeleton";
export { Skeleton };

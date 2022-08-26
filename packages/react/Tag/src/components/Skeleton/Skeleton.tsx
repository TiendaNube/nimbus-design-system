import React from "react";

import { Skeleton as SkeletonBase } from "@nimbus-ds/skeleton";
import { SkeletonProps } from "./skeleton.types";

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  "data-testid": dataTestId,
}) => (
  <SkeletonBase
    width={width ?? "3.313rem"}
    height={height ?? "1.5rem"}
    borderRadius="0.813rem"
    data-testid={dataTestId}
  />
);

export { Skeleton };

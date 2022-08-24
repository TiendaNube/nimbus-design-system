import React from "react";

import { Skeleton as SkeletonBase } from "@nimbus-ds/skeleton";
import { SkeletonProps } from "./skeleton.types";
import { sizes } from "./skeleton.definitions";

const Skeleton: React.FC<SkeletonProps> = ({
  size = "caption",
  width,
  height,
  "data-testid": dataTestId,
}) => (
  <SkeletonBase
    width={width ?? sizes[size].width}
    height={height ?? sizes[size].height}
    data-testid={dataTestId}
    borderRadius="0.25rem"
  />
);

export { Skeleton };

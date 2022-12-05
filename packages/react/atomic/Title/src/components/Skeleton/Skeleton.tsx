import React from "react";

import { Skeleton as SkeletonBase } from "@nimbus-ds/skeleton";
import { SkeletonProps } from "./skeleton.types";
import { sizes } from "./skeleton.definitions";

const Skeleton: React.FC<SkeletonProps> = ({
  as = "h1",
  width,
  height,
  "data-testid": dataTestId,
}) => (
  <SkeletonBase
    width={width ?? sizes[as].width}
    height={height ?? sizes[as].height}
    data-testid={dataTestId}
    borderRadius="0.25rem"
  />
);

Skeleton.displayName = "Title.Skeleton";

export { Skeleton };

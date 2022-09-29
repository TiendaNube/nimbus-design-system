import React from "react";

import { Skeleton as SkeletonBase } from "@nimbus-ds/skeleton";
import { SkeletonProps } from "./skeleton.types";
import { sizes } from "./skeleton.definitions";

const Skeleton: React.FC<SkeletonProps> = ({
  fontSize = "caption",
  width,
  height,
  "data-testid": dataTestId,
}) => (
  <SkeletonBase
    width={width ?? sizes[fontSize].width}
    height={height ?? sizes[fontSize].height}
    data-testid={dataTestId}
    borderRadius="0.25rem"
  />
);

Skeleton.displayName = "Text.Skeleton";
export { Skeleton };

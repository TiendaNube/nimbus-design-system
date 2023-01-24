import React from "react";

import { Skeleton } from "@nimbus-ds/skeleton";
import { TextSkeletonProps } from "./textSkeleton.types";
import { sizes } from "./textSkeleton.definitions";

const TextSkeleton: React.FC<TextSkeletonProps> = ({
  fontSize = "caption",
  width,
  height,
  "data-testid": dataTestId,
}) => (
  <Skeleton
    width={width ?? sizes[fontSize].width}
    height={height ?? sizes[fontSize].height}
    data-testid={dataTestId}
    borderRadius="0.25rem"
  />
);

export { TextSkeleton };

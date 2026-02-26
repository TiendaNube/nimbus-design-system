import React from "react";

import { Skeleton } from "@nimbus-ds/skeleton";
import { type TextSkeletonProps } from "./textSkeleton.types";
import { sizes } from "./textSkeleton.definitions";

const TextSkeleton: React.FC<TextSkeletonProps> = ({
  className,
  fontSize = "caption",
  width,
  height,
  "data-testid": dataTestId,
}) => (
  <Skeleton
    className={className}
    width={width ?? sizes[fontSize].width}
    height={height ?? sizes[fontSize].height}
    data-testid={dataTestId}
    borderRadius="0.25rem"
  />
);

export { TextSkeleton };

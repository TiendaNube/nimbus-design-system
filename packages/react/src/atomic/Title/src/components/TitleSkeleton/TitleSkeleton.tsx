import React from "react";

import { Skeleton } from "@nimbus-ds/skeleton";
import { type TitleSkeletonProps } from "./titleSkeleton.types";
import { sizes } from "./titleSkeleton.definitions";

const TitleSkeleton: React.FC<TitleSkeletonProps> = ({
  className,
  as = "h1",
  width,
  height,
  "data-testid": dataTestId,
}) => (
  <Skeleton
    className={className}
    width={width ?? sizes[as].width}
    height={height ?? sizes[as].height}
    data-testid={dataTestId}
    borderRadius="0.25rem"
  />
);

export { TitleSkeleton };

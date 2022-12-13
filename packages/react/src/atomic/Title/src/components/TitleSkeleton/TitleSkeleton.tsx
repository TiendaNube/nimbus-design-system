import React from "react";

import { Skeleton } from "@nimbus-ds/skeleton";
import { TitleSkeletonProps } from "./titleSkeleton.types";
import { sizes } from "./titleSkeleton.definitions";

const TitleSkeleton: React.FC<TitleSkeletonProps> = ({
  as = "h1",
  width,
  height,
  "data-testid": dataTestId,
}) => (
  <Skeleton
    width={width ?? sizes[as].width}
    height={height ?? sizes[as].height}
    data-testid={dataTestId}
    borderRadius="0.25rem"
  />
);

TitleSkeleton.displayName = "Title.Skeleton";

export { TitleSkeleton };

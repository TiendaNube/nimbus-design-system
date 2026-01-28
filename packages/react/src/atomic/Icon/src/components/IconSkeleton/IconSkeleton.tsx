import React from "react";

import { Skeleton } from "@nimbus-ds/skeleton";
import { IconSkeletonProps } from "./iconSkeleton.types";

const IconSkeleton: React.FC<IconSkeletonProps> = ({
  width,
  height,
  "data-testid": dataTestId,
}) => (
  <Skeleton
    width={width ?? "1rem"}
    height={height ?? "1rem"}
    borderRadius="0.25rem"
    data-testid={dataTestId}
  />
);

export { IconSkeleton };

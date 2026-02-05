import React from "react";

import { Skeleton } from "@nimbus-ds/skeleton";
import { type BadgeSkeletonProps } from "./badgeSkeleton.types";

const BadgeSkeleton: React.FC<BadgeSkeletonProps> = ({
  width,
  height,
  "data-testid": dataTestId,
}) => (
  <Skeleton
    width={width ?? "1.5rem"}
    height={height ?? "1.25rem"}
    borderRadius="0.813rem"
    data-testid={dataTestId}
  />
);

export { BadgeSkeleton };

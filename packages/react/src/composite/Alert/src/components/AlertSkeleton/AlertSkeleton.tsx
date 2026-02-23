import React from "react";

import { Skeleton } from "@nimbus-ds/skeleton";
import { type AlertSkeletonProps } from "./alertSkeleton.types";

const AlertSkeleton: React.FC<AlertSkeletonProps> = ({
  className,
  width,
  height,
  "data-testid": dataTestId,
}) => (
  <Skeleton
    className={className}
    width={width ?? "100%"}
    height={height ?? "4.875rem"}
    borderRadius="0.5rem"
    data-testid={dataTestId}
  />
);

export { AlertSkeleton };

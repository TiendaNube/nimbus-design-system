import React from "react";

import { Skeleton } from "@nimbus-ds/skeleton";
import { AlertSkeletonProps } from "./alertSkeleton.types";

const AlertSkeleton: React.FC<AlertSkeletonProps> = ({
  width,
  height,
  "data-testid": dataTestId,
}) => (
  <Skeleton
    width={width ?? "100%"}
    height={height ?? "4.875rem"}
    borderRadius="0.5rem"
    data-testid={dataTestId}
  />
);

AlertSkeleton.displayName = "Alert.Skeleton";
export { AlertSkeleton };

import React from "react";

import { Skeleton } from "@nimbus-ds/skeleton";
import type { LabelSkeletonProps } from "./labelSkeleton.types";

const LabelSkeleton: React.FC<LabelSkeletonProps> = ({
  width,
  height,
  "data-testid": dataTestId,
}) => (
  <Skeleton
    width={width ?? "4.375rem"}
    height={height ?? "1rem"}
    borderRadius="0"
    data-testid={dataTestId}
  />
);

export { LabelSkeleton };

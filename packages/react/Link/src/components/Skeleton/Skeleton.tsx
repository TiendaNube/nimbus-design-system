import React from "react";

import { Skeleton as SkeletonBase } from "@nimbus-ds/skeleton";
import { SkeletonProps } from "./skeleton.types";

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  "data-testid": dataTestId,
}) => (
  <SkeletonBase
    width={width ?? "4.75rem"}
    height="1.125rem"
    borderRadius="0.25rem"
    data-testid={dataTestId}
  />
);

Skeleton.displayName = "Button.Skeleton";
export { Skeleton };

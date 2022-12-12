import React from "react";

import { Skeleton as SkeletonBase } from "@nimbus-ds/skeleton";
import { SkeletonProps } from "./skeleton.types";

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  "data-testid": dataTestId,
}) => (
  <SkeletonBase
    data-testid={dataTestId}
    width={width ?? "100%"}
    height="2rem"
    borderRadius="0.5rem"
  />
);

export { Skeleton };

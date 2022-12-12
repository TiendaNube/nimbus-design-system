import React from "react";

import { Skeleton as SkeletonBase } from "@nimbus-ds/skeleton";
import { SkeletonProps } from "./skeleton.types";

const Skeleton: React.FC<SkeletonProps> = ({ "data-testid": dataTestId }) => (
  <SkeletonBase
    width="2.75rem"
    height="2.75rem"
    borderRadius="100%"
    data-testid={dataTestId}
  />
);

export { Skeleton };

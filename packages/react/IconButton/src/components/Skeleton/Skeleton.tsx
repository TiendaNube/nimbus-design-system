import React from "react";

import { Skeleton as SkeletonBase } from "@nimbus-ds/skeleton";
import { SkeletonProps } from "./skeleton.types";

const Skeleton: React.FC<SkeletonProps> = ({ "data-testid": dataTestId }) => (
  <SkeletonBase
    width="2rem"
    height="2rem"
    borderRadius="1.25rem"
    data-testid={dataTestId}
  />
);

export { Skeleton };

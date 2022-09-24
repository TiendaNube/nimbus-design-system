import React from "react";
import { Skeleton as SkeletonBase } from "@nimbus-ds/skeleton";
import { checkbox } from "@nimbus-ds/styles";

import { SkeletonProps } from "./skeleton.types";

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  "data-testid": dataTestId,
}) => (
  <div className={checkbox.style.container}>
    <SkeletonBase width="1rem" height="1rem" borderRadius="0.25rem" />
    <SkeletonBase
      width={width ?? "2rem"}
      height="1rem"
      borderRadius="0.25rem"
      data-testid={dataTestId}
    />
  </div>
);

export { Skeleton };

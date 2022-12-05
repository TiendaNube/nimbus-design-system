import React from "react";
import { Skeleton as SkeletonBase } from "@nimbus-ds/skeleton";
import { toggle } from "@nimbus-ds/styles";

import { SkeletonProps } from "./skeleton.types";

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  "data-testid": dataTestId,
}) => (
  <div className={toggle.style.container}>
    <SkeletonBase
      width="2rem"
      height="1rem"
      borderRadius="0.5rem"
      data-testid="toggle-skeleton"
    />
    <SkeletonBase
      width={width ?? "2rem"}
      height="1rem"
      borderRadius="0.25rem"
      data-testid={dataTestId}
    />
  </div>
);

export { Skeleton };

import React from "react";
import { Skeleton } from "@nimbus-ds/skeleton";
import { toggle } from "@nimbus-ds/styles";

import { ToggleSkeletonProps } from "./toggleSkeleton.types";

const ToggleSkeleton: React.FC<ToggleSkeletonProps> = ({
  width,
  "data-testid": dataTestId,
}) => (
  <div className={toggle.classnames.container}>
    <Skeleton
      width="2rem"
      height="1rem"
      borderRadius="0.5rem"
      data-testid="toggle-skeleton"
    />
    <Skeleton
      width={width ?? "2rem"}
      height="1rem"
      borderRadius="0.25rem"
      data-testid={dataTestId}
    />
  </div>
);

export { ToggleSkeleton };

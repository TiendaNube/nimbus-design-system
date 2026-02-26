import React from "react";
import { Skeleton } from "@nimbus-ds/skeleton";
import { checkbox } from "@nimbus-ds/styles";

import { type CheckboxSkeletonProps } from "./checkboxSkeleton.types";

const CheckboxSkeleton: React.FC<CheckboxSkeletonProps> = ({
  className,
  width,
  "data-testid": dataTestId,
}) => (
  <div className={[className, checkbox.classnames.container].join(" ")}>
    <Skeleton width="1rem" height="1rem" borderRadius="0.25rem" />
    <Skeleton
      width={width ?? "2rem"}
      height="1rem"
      borderRadius="0.25rem"
      data-testid={dataTestId}
    />
  </div>
);

export { CheckboxSkeleton };

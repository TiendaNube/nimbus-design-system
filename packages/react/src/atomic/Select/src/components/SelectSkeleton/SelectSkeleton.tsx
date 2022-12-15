import React from "react";
import { Skeleton } from "@nimbus-ds/skeleton";

import { SelectSkeletonProps } from "./selectSkeleton.types";

const SelectSkeleton: React.FC<SelectSkeletonProps> = ({
  width,
  "data-testid": dataTestId,
}) => (
  <Skeleton
    width={width ?? "15rem"}
    height="2.25rem"
    borderRadius="0.5rem"
    data-testid={dataTestId}
  />
);

SelectSkeleton.displayName = "Select.Skeleton";

export { SelectSkeleton };

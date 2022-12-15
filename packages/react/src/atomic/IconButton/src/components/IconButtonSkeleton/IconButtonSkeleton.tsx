import React from "react";

import { Skeleton } from "@nimbus-ds/skeleton";
import { IconButtonSkeletonProps } from "./iconButtonSkeleton.types";

const IconButtonSkeleton: React.FC<IconButtonSkeletonProps> = ({
  "data-testid": dataTestId,
}) => (
  <Skeleton
    width="2.75rem"
    height="2.75rem"
    borderRadius="100%"
    data-testid={dataTestId}
  />
);

export { IconButtonSkeleton };

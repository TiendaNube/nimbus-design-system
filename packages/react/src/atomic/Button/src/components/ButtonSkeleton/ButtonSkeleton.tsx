import React from "react";

import { Skeleton } from "@nimbus-ds/skeleton";
import { ButtonSkeletonProps } from "./buttonSkeleton.types";

const ButtonSkeleton: React.FC<ButtonSkeletonProps> = ({
  width,
  "data-testid": dataTestId,
}) => (
  <Skeleton
    width={width ?? "4.75rem"}
    height="2rem"
    borderRadius="0.5rem"
    data-testid={dataTestId}
  />
);

export { ButtonSkeleton };

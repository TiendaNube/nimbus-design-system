import React from "react";

import { Skeleton } from "@nimbus-ds/skeleton";
import type { InputSkeletonProps } from "./inputSkeleton.types";

const InputSkeleton: React.FC<InputSkeletonProps> = ({
  width,
  "data-testid": dataTestId,
}) => (
  <Skeleton
    data-testid={dataTestId}
    width={width ?? "100%"}
    height="2rem"
    borderRadius="0.5rem"
  />
);

export { InputSkeleton };

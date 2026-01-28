import React from "react";
import { Skeleton } from "@nimbus-ds/skeleton";

import { type TextareaSkeletonProps } from "./textareaSkeleton.types";

const TextareaSkeleton: React.FC<TextareaSkeletonProps> = ({
  width,
  "data-testid": dataTestId,
}) => (
  <Skeleton
    width={width ?? "15rem"}
    height="3.375rem"
    borderRadius="0.5rem"
    data-testid={dataTestId}
  />
);

export { TextareaSkeleton };

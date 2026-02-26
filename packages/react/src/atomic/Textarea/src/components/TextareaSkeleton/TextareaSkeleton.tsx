import React from "react";
import { Skeleton } from "@nimbus-ds/skeleton";

import { type TextareaSkeletonProps } from "./textareaSkeleton.types";

const TextareaSkeleton: React.FC<TextareaSkeletonProps> = ({
  className,
  width,
  "data-testid": dataTestId,
}) => (
  <Skeleton
    className={className}
    width={width ?? "15rem"}
    height="3.375rem"
    borderRadius="0.5rem"
    data-testid={dataTestId}
  />
);

export { TextareaSkeleton };

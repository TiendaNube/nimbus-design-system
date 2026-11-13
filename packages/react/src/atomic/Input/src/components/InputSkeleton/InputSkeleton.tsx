import React from "react";

import { Skeleton } from "@nimbus-ds/skeleton";
import { themeVars } from "@nimbus-ds/styles";
import { type InputSkeletonProps } from "./inputSkeleton.types";

const InputSkeleton: React.FC<InputSkeletonProps> = ({
  className,
  width,
  "data-testid": dataTestId,
}) => (
  <Skeleton
    className={className}
    data-testid={dataTestId}
    width={width ?? "100%"}
    height={themeVars.components.input.skeleton.height}
    borderRadius={themeVars.components.input.skeleton.borderRadius}
  />
);

export { InputSkeleton };

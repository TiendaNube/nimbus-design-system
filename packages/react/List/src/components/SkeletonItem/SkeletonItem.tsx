import React from "react";

import { Skeleton as SkeletonBase } from "@nimbus-ds/skeleton";
import { SkeletonItemProps } from "./skeletonitem.types";

const SkeletonItem: React.FC<SkeletonItemProps> = ({
  width,
  height,
  "data-testid": dataTestId,
}) => (
  <SkeletonBase
    width={width ?? "6rem"}
    height={height ?? "1.125rem"}
    borderRadius="0.25rem"
    data-testid={dataTestId}
  />
);

export { SkeletonItem };

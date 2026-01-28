import React from "react";

import { Skeleton } from "@nimbus-ds/skeleton";
import { type LinkSkeletonProps } from "./linkSkeleton.types";

const LinkSkeleton: React.FC<LinkSkeletonProps> = ({
  width,
  "data-testid": dataTestId,
}) => (
  <Skeleton
    width={width ?? "4.75rem"}
    height="1.125rem"
    borderRadius="0.25rem"
    data-testid={dataTestId}
  />
);

export { LinkSkeleton };

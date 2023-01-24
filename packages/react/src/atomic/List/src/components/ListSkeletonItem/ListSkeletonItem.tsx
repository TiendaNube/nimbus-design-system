import React from "react";

import { Skeleton } from "@nimbus-ds/skeleton";
import { ListSkeletonItemProps } from "./listSkeletonitem.types";

const ListSkeletonItem: React.FC<ListSkeletonItemProps> = ({
  width,
  height,
  "data-testid": dataTestId,
}) => (
  <Skeleton
    width={width ?? "6rem"}
    height={height ?? "1.125rem"}
    borderRadius="0.25rem"
    data-testid={dataTestId}
  />
);

export { ListSkeletonItem };

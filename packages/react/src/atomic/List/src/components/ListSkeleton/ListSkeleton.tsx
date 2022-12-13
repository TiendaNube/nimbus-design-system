import React from "react";
import { list } from "@nimbus-ds/styles";

import { ListSkeletonProps } from "./listSkeleton.types";

const ListSkeleton: React.FC<ListSkeletonProps> = ({
  className: _className,
  style: _style,
  children,
  "data-testid": dataTestId,
  ...rest
}) => (
  <div {...rest} className={list.style.skeleton} data-testid={dataTestId}>
    {children}
  </div>
);

ListSkeleton.displayName = "List.Skeleton";

export { ListSkeleton };

import React from "react";
import { list } from "@nimbus-ds/styles";

import { type ListSkeletonProps } from "./listSkeleton.types";

const ListSkeleton: React.FC<ListSkeletonProps> = ({
  className: _className,
  style: _style,
  children,
  "data-testid": dataTestId,
  ...rest
}) => (
  <div {...rest} className={list.classnames.skeleton} data-testid={dataTestId}>
    {children}
  </div>
);

export { ListSkeleton };

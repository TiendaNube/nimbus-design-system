import React from "react";
import { list } from "@nimbus-ds/styles";

import { SkeletonProps } from "./skeleton.types";

const Skeleton: React.FC<SkeletonProps> = ({
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

Skeleton.displayName = "List.Skeleton";

export { Skeleton };

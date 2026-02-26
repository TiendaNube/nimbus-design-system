import React from "react";
import { list } from "@nimbus-ds/styles";

import { type ListSkeletonProps } from "./listSkeleton.types";

const ListSkeleton: React.FC<ListSkeletonProps> = ({
  className,
  style: _style,
  children,
  "data-testid": dataTestId,
  ...rest
}) => (
  <div
    {...rest}
    className={[className, list.classnames.skeleton].filter(Boolean).join(" ")}
    data-testid={dataTestId}
  >
    {children}
  </div>
);

export { ListSkeleton };

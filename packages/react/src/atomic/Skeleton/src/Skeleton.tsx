import React from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { skeleton, vars } from "@nimbus-ds/styles";

import { type SkeletonProps } from "./skeleton.types";

const Skeleton: React.FC<SkeletonProps> = ({
  className,
  style: _style,
  height,
  width,
  borderRadius = "0",
  ...rest
}) => (
  <div
    className={[className, skeleton.classnames.base].filter(Boolean).join(" ")}
    style={assignInlineVars({
      [vars.width]: width,
      [vars.height]: height,
      [vars.borderRadius]: borderRadius,
    })}
    {...rest}
  />
);

Skeleton.displayName = "Skeleton";
export { Skeleton };

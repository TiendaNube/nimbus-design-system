import React from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { skeleton, utils } from "@nimbus-ds/styles";

import { SkeletonProps } from "./skeleton.types";

const Skeleton: React.FC<SkeletonProps> = ({
  className: _className,
  style: _style,
  height,
  width,
  borderRadius = "0",
  ...rest
}) => (
  <div
    className={skeleton.style}
    style={assignInlineVars({
      [utils.vars.width]: width,
      [utils.vars.height]: height,
      [utils.vars.borderRadius]: borderRadius,
    })}
    {...rest}
  />
);

export { Skeleton };

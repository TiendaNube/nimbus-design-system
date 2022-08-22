import React from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";

import {
  skeleton,
  width as widthVAR,
  height as heightVAR,
  borderRadius as borderRadiusVAR,
} from "@nimbus-ds/styles";
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
    className={skeleton}
    style={assignInlineVars({
      [widthVAR]: width,
      [heightVAR]: height,
      [borderRadiusVAR]: borderRadius,
    })}
    {...rest}
  />
);

export { Skeleton };

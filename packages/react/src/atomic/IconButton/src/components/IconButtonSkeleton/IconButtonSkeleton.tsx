import React from "react";

import { Skeleton } from "@nimbus-ds/skeleton";
import { type IconButtonSkeletonProps } from "./iconButtonSkeleton.types";

/** Matches `IconButton` default `size` and `shape.border.radius["1-5"]` in `@nimbus-ds/styles`. */
const ICON_BUTTON_SKELETON_SIZE = "1.75rem";

/** Same token as `nimbus-iconButton` base `borderRadius` (`radius["1-5"]`, 6px at 16px root). */
const ICON_BUTTON_SKELETON_RADIUS = "0.375rem";

const IconButtonSkeleton: React.FC<IconButtonSkeletonProps> = ({
  className,
  width,
  height,
  "data-testid": dataTestId,
}) => (
  <Skeleton
    className={className}
    width={width ?? ICON_BUTTON_SKELETON_SIZE}
    height={height ?? ICON_BUTTON_SKELETON_SIZE}
    borderRadius={ICON_BUTTON_SKELETON_RADIUS}
    data-testid={dataTestId}
  />
);

export { IconButtonSkeleton };

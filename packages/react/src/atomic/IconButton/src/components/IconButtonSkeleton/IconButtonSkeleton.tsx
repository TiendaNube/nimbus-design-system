import React from "react";

import { Skeleton } from "@nimbus-ds/skeleton";
import { themeVars, useTheme } from "@nimbus-ds/styles";
import { type IconButtonSkeletonProps } from "./iconButtonSkeleton.types";
import {
  NORTEUI_ICON_BUTTON_SIZE,
  isNorteUiTheme,
} from "../../iconButton.definitions";

const IconButtonSkeleton: React.FC<IconButtonSkeletonProps> = ({
  className,
  width,
  height,
  "data-testid": dataTestId,
}) => {
  // Under Norte UI the skeleton matches the default IconButton: 28px with the
  // base radius. Every other theme keeps the 44px circle.
  const { currentTheme } = useTheme();
  const isNorteUi = isNorteUiTheme(currentTheme);
  const defaultSize = isNorteUi ? NORTEUI_ICON_BUTTON_SIZE : "2.75rem";

  return (
    <Skeleton
      className={className}
      width={width ?? defaultSize}
      height={height ?? defaultSize}
      borderRadius={isNorteUi ? themeVars.shape.border.radius.base : "100%"}
      data-testid={dataTestId}
    />
  );
};

export { IconButtonSkeleton };

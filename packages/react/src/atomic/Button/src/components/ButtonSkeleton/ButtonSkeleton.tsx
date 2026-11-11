import React from "react";

import { Skeleton } from "@nimbus-ds/skeleton";
import { themeVars } from "@nimbus-ds/styles";
import { type ButtonSkeletonProps } from "./buttonSkeleton.types";

const ButtonSkeleton: React.FC<ButtonSkeletonProps> = ({
  className,
  width,
  "data-testid": dataTestId,
}) => (
  <Skeleton
    className={className}
    width={width ?? "4.75rem"}
    // Same per-theme values as the medium Button, so the skeleton matches it
    // in every theme (2rem / 0.5rem in base, dark, next and next-dark).
    height={themeVars.components.button.medium.height}
    borderRadius={themeVars.components.button.medium.radius}
    data-testid={dataTestId}
  />
);

export { ButtonSkeleton };

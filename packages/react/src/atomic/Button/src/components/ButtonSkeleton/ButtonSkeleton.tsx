import React from "react";

import { Skeleton } from "@nimbus-ds/skeleton";
import { themeVars } from "@nimbus-ds/styles";
import { type ButtonSkeletonProps } from "./buttonSkeleton.types";

// Same per-theme values as the medium Button, so the skeleton matches it in
// every theme (2rem / 0.5rem in base, dark, next and next-dark). The optional
// access keeps the previous size if an older @nimbus-ds/styles without
// `components.button` is installed (for example, a Button RC published alone).
const mediumButton = (
  themeVars as {
    components?: { button?: typeof themeVars.components.button };
  }
).components?.button?.medium;

const ButtonSkeleton: React.FC<ButtonSkeletonProps> = ({
  className,
  width,
  "data-testid": dataTestId,
}) => (
  <Skeleton
    className={className}
    width={width ?? "4.75rem"}
    height={mediumButton?.height ?? "2rem"}
    borderRadius={mediumButton?.radius ?? "0.5rem"}
    data-testid={dataTestId}
  />
);

export { ButtonSkeleton };

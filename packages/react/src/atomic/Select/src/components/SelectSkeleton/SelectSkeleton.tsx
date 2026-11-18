import React from "react";
import { Skeleton } from "@nimbus-ds/skeleton";
import { themeVars } from "@nimbus-ds/styles";

import { type SelectSkeletonProps } from "./selectSkeleton.types";

// Previous sizes, kept if an older @nimbus-ds/styles without
// `components.select` is installed (for example, a Select RC published alone).
const fallback = {
  medium: { height: "2.25rem", borderRadius: "0.5rem" },
  small: { height: "1.75rem", borderRadius: "0.375rem" },
} as const;

const skeleton = (
  themeVars as {
    components?: { select?: typeof themeVars.components.select };
  }
).components?.select?.skeleton;

const SelectSkeleton: React.FC<SelectSkeletonProps> = ({
  className,
  width,
  size = "medium",
  "data-testid": dataTestId,
}) => (
  <Skeleton
    className={className}
    width={width ?? "15rem"}
    height={skeleton?.[size].height ?? fallback[size].height}
    borderRadius={skeleton?.[size].borderRadius ?? fallback[size].borderRadius}
    data-testid={dataTestId}
  />
);

export { SelectSkeleton };

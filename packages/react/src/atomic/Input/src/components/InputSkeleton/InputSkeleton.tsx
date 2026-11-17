import React from "react";

import { Skeleton } from "@nimbus-ds/skeleton";
import { themeVars } from "@nimbus-ds/styles";
import { type InputSkeletonProps } from "./inputSkeleton.types";

// The optional access keeps the previous size (2rem / 0.5rem) if an older
// @nimbus-ds/styles without `components.input` is installed (for example, an
// Input RC published alone).
const skeleton = (
  themeVars as {
    components?: { input?: typeof themeVars.components.input };
  }
).components?.input?.skeleton;

const InputSkeleton: React.FC<InputSkeletonProps> = ({
  className,
  width,
  "data-testid": dataTestId,
}) => (
  <Skeleton
    className={className}
    data-testid={dataTestId}
    width={width ?? "100%"}
    height={skeleton?.height ?? "2rem"}
    borderRadius={skeleton?.borderRadius ?? "0.5rem"}
  />
);

export { InputSkeleton };

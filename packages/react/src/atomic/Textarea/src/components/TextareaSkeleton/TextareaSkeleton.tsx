import React from "react";
import { Skeleton } from "@nimbus-ds/skeleton";
import { themeVars } from "@nimbus-ds/styles";

import { type TextareaSkeletonProps } from "./textareaSkeleton.types";

// The optional access keeps the previous size (3.375rem / 0.5rem) if an older
// @nimbus-ds/styles without `components.textarea` is installed (for example, a
// Textarea RC published alone).
const skeleton = (
  themeVars as {
    components?: { textarea?: typeof themeVars.components.textarea };
  }
).components?.textarea?.skeleton;

const TextareaSkeleton: React.FC<TextareaSkeletonProps> = ({
  className,
  width,
  "data-testid": dataTestId,
}) => (
  <Skeleton
    className={className}
    width={width ?? "15rem"}
    height={skeleton?.height ?? "3.375rem"}
    borderRadius={skeleton?.borderRadius ?? "0.5rem"}
    data-testid={dataTestId}
  />
);

export { TextareaSkeleton };

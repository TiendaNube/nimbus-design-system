import React from "react";

import { Skeleton } from "@nimbus-ds/skeleton";
import { type BadgeSkeletonProps } from "./badgeSkeleton.types";

const BadgeSkeleton: React.FC<BadgeSkeletonProps> = ({
  className,
  width,
  height,
  type = "text",
  "data-testid": dataTestId,
}) => {
  const isDot = type === "dot";

  return (
    <Skeleton
      className={className}
      width={width ?? (isDot ? "0.5rem" : "1.5rem")}
      height={height ?? (isDot ? "0.5rem" : "1.25rem")}
      borderRadius={isDot ? "9999px" : "0.25rem"}
      data-testid={dataTestId}
    />
  );
};

export { BadgeSkeleton };

import React from "react";
import { Skeleton } from "@nimbus-ds/skeleton";
import { ProgressBarSkeletonProperties } from "./ProgressBarSkeleton.types";

const ProgressBarSkeleton: React.FC<ProgressBarSkeletonProperties> = ({
  width = "100%",
  ...rest
}) => <Skeleton width={width} height="0.5rem" {...rest} />;

export { ProgressBarSkeleton };

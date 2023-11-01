import { HTMLAttributes } from "react";
import { SkeletonProps } from "@nimbus-ds/skeleton";

export type MultiSelectSkeletonSkeletonProperties = Partial<
  Pick<SkeletonProps, "width" | "data-testid">
>;

export type MultiSelectSkeletonSkeletonProps =
  MultiSelectSkeletonSkeletonProperties & HTMLAttributes<HTMLDivElement>;

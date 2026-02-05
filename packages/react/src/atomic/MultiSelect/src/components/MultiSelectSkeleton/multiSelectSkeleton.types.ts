import { type HTMLAttributes } from "react";
import { type SkeletonProps } from "@nimbus-ds/skeleton";

export type MultiSelectSkeletonProperties = Partial<
  Pick<SkeletonProps, "width" | "data-testid">
>;

export type MultiSelectSkeletonProps = MultiSelectSkeletonProperties &
  HTMLAttributes<HTMLDivElement>;

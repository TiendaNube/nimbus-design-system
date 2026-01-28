import type { SkeletonProps } from "@nimbus-ds/skeleton";

export type SelectSkeletonProperties = Partial<
  Pick<SkeletonProps, "width" | "data-testid">
>;

export type SelectSkeletonProps = SelectSkeletonProperties;

import type { SkeletonProps } from "@nimbus-ds/skeleton";

export type ToggleSkeletonProperties = Partial<
  Pick<SkeletonProps, "width" | "data-testid">
>;

export type ToggleSkeletonProps = ToggleSkeletonProperties;

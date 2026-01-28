import type { SkeletonProps } from "@nimbus-ds/skeleton";

export type InputSkeletonProperties = Partial<
  Pick<SkeletonProps, "width" | "data-testid">
>;

export type InputSkeletonProps = InputSkeletonProperties;

import type { SkeletonProps } from "@nimbus-ds/skeleton";

export type CheckboxSkeletonProperties = Partial<
  Pick<SkeletonProps, "width" | "data-testid">
>;

export type CheckboxSkeletonProps = CheckboxSkeletonProperties;

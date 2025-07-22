import { SkeletonProps } from "@nimbus-ds/skeleton";

export type ProgressBarSkeletonProperties = Partial<
  Pick<SkeletonProps, "width" | "data-testid">
>;

export type ProgressBarSkeletonProps = ProgressBarSkeletonProperties;

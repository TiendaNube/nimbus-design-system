import { type SkeletonProps } from "@nimbus-ds/skeleton";

export type ProgressBarSkeletonProperties = Partial<
  Pick<SkeletonProps, "width" | "height" | "data-testid">
>;

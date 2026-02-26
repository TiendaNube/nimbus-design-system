import { type SkeletonProps } from "@nimbus-ds/skeleton";

export type ToggleSkeletonProperties = Partial<
  Pick<SkeletonProps, "width" | "className" | "data-testid">
>;

export type ToggleSkeletonProps = ToggleSkeletonProperties;

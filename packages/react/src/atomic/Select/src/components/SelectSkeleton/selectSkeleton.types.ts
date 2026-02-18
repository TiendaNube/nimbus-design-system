import { type SkeletonProps } from "@nimbus-ds/skeleton";

export type SelectSkeletonProperties = Partial<
  Pick<SkeletonProps, "width" | "className" | "data-testid">
>;

export type SelectSkeletonProps = SelectSkeletonProperties;

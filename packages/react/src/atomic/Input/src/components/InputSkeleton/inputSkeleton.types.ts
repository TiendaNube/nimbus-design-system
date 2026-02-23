import { type SkeletonProps } from "@nimbus-ds/skeleton";

export type InputSkeletonProperties = Partial<
  Pick<SkeletonProps, "width" | "className" | "data-testid">
>;

export type InputSkeletonProps = InputSkeletonProperties;

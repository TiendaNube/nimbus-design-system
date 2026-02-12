import { type SkeletonProps } from "@nimbus-ds/skeleton";

export type ButtonSkeletonProperties = Partial<
  Pick<SkeletonProps, "width" | "className" | "data-testid">
>;

export type ButtonSkeletonProps = ButtonSkeletonProperties;

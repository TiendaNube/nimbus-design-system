import { SkeletonProps } from "@nimbus-ds/skeleton";

export type ButtonSkeletonProperties = Partial<
  Pick<SkeletonProps, "width" | "data-testid">
>;

export type ButtonSkeletonProps = ButtonSkeletonProperties;

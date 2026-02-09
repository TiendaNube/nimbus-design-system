import { type SkeletonProps } from "@nimbus-ds/skeleton";

export type AlertSkeletonProperties = Partial<
  Pick<SkeletonProps, "width" | "height" | "data-testid">
>;

export type AlertSkeletonProps = AlertSkeletonProperties;

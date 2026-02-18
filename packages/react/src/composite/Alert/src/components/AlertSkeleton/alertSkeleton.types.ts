import { type SkeletonProps } from "@nimbus-ds/skeleton";

export type AlertSkeletonProperties = Partial<
  Pick<SkeletonProps, "width" | "height" | "className" | "data-testid">
>;

export type AlertSkeletonProps = AlertSkeletonProperties;

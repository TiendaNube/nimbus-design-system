import { type SkeletonProps } from "@nimbus-ds/skeleton";

export type CheckboxSkeletonProperties = Partial<
  Pick<SkeletonProps, "width" | "className" | "data-testid">
>;

export type CheckboxSkeletonProps = CheckboxSkeletonProperties;

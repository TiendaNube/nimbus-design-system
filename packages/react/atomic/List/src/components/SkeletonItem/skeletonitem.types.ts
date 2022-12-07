import { SkeletonProps as SkeletonBaseProps } from "@nimbus-ds/skeleton";

export type SkeletonItemProps = Partial<Pick<SkeletonBaseProps, "width">> &
  Partial<Pick<SkeletonBaseProps, "height">> & {
    "data-testid"?: string;
  };
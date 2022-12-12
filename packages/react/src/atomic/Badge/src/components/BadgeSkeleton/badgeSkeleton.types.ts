import { SkeletonProps } from "@nimbus-ds/skeleton";

export type BadgeSkeletonProps = Partial<Pick<SkeletonProps, "width">> &
  Partial<Pick<SkeletonProps, "height">> & {
    "data-testid"?: string;
  };

import { SkeletonProps as SkeletonBaseProps } from "@nimbus-ds/skeleton";

export type SkeletonProps = Partial<Pick<SkeletonBaseProps, "width">> & {
  "data-testid"?: string;
};

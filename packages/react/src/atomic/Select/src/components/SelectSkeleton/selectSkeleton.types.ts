import { SkeletonProps } from "@nimbus-ds/skeleton";

export type SelectSkeletonProps = Partial<Pick<SkeletonProps, "width">> & {
  "data-testid"?: string;
};

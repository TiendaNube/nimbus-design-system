import { SkeletonProps } from "@nimbus-ds/skeleton";

export type LinkSkeletonProps = Partial<Pick<SkeletonProps, "width">> & {
  "data-testid"?: string;
};

import { SkeletonProps } from "@nimbus-ds/skeleton";

export type ButtonSkeletonProps = Partial<Pick<SkeletonProps, "width">> & {
  "data-testid"?: string;
};

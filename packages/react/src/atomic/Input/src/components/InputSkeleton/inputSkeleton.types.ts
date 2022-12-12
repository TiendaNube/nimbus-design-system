import { SkeletonProps } from "@nimbus-ds/skeleton";

export type InputSkeletonProps = Partial<Pick<SkeletonProps, "width">> & {
  "data-testid"?: string;
};

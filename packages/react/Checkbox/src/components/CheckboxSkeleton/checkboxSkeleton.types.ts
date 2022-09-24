import { SkeletonProps } from "@nimbus-ds/skeleton";

export type CheckboxSkeletonProps = Partial<Pick<SkeletonProps, "width">> & {
  "data-testid"?: string;
};

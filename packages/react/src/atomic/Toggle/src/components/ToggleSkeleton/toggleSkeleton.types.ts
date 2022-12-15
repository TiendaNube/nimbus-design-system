import { SkeletonProps } from "@nimbus-ds/skeleton";

export type ToggleSkeletonProps = Partial<Pick<SkeletonProps, "width">> & {
  "data-testid"?: string;
};

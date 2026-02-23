import { type SkeletonProps } from "@nimbus-ds/skeleton";

export type LinkSkeletonProperties = Partial<
  Pick<SkeletonProps, "width" | "className" | "data-testid">
>;

export type LinkSkeletonProps = LinkSkeletonProperties;

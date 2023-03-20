import { SkeletonProps } from "@nimbus-ds/skeleton";

export type LinkSkeletonProperties = Partial<
  Pick<SkeletonProps, "width" | "data-testid">
>;

export type LinkSkeletonProps = LinkSkeletonProperties;

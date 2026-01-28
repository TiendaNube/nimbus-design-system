import { SkeletonProps } from "@nimbus-ds/skeleton";

export type IconButtonSkeletonProperties = Partial<
  Pick<SkeletonProps, "width" | "height">
> & {
  /**
   * This is an attribute used to identify a DOM node for testing purposes.
   */
  "data-testid"?: string;
};

export type IconButtonSkeletonProps = IconButtonSkeletonProperties;

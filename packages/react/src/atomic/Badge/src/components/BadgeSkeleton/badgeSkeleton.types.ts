import { type SkeletonProps } from "@nimbus-ds/skeleton";

export type BadgeSkeletonProperties = Partial<
  Pick<SkeletonProps, "width" | "height" | "className">
> & {
  /**
   * This is an attribute used to identify a DOM node for testing purposes.
   */
  "data-testid"?: string;
};

export type BadgeSkeletonProps = BadgeSkeletonProperties;

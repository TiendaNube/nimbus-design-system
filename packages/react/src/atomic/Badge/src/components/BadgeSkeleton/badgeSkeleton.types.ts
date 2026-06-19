import { type SkeletonProps } from "@nimbus-ds/skeleton";

export type BadgeSkeletonProperties = Partial<
  Pick<SkeletonProps, "width" | "height" | "className">
> & {
  /**
   * Change the badge skeleton type between a text counter and a dot indicator.
   * @default text
   */
  type?: "text" | "dot";
  /**
   * This is an attribute used to identify a DOM node for testing purposes.
   */
  "data-testid"?: string;
};

export type BadgeSkeletonProps = BadgeSkeletonProperties;

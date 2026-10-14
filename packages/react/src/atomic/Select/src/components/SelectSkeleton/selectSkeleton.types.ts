import { type SkeletonProps } from "@nimbus-ds/skeleton";

export type SelectSkeletonProperties = Partial<
  Pick<SkeletonProps, "width" | "className" | "data-testid">
> & {
  /**
   * Change the visual size of the skeleton to match the select.
   * @default medium
   */
  size?: "medium" | "small";
};

export type SelectSkeletonProps = SelectSkeletonProperties;

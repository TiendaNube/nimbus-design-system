import { SkeletonProps } from "@nimbus-ds/skeleton";

export type ChipSkeletonProperties = Partial<Pick<SkeletonProps, "width">> &
  Partial<Pick<SkeletonProps, "height">> & {
    /**
     * This is an attribute used to identify a DOM node for testing purposes.
     */
    "data-testid"?: string;
  };

export type ChipSkeletonProps = ChipSkeletonProperties;

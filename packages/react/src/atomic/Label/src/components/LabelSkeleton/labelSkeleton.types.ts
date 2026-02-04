import { type SkeletonProps } from "@nimbus-ds/skeleton";

export type LabelSkeletonProperties = Partial<Pick<SkeletonProps, "width">> &
  Partial<Pick<SkeletonProps, "height">> & {
    /**
     * This is an attribute used to identify a DOM node for testing purposes.
     */
    "data-testid"?: string;
  };

export type LabelSkeletonProps = LabelSkeletonProperties;

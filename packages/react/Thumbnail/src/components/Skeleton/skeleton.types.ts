import { SkeletonProps as SkeletonBaseProps } from "@nimbus-ds/skeleton";
import { ThumbnailProps } from "../../thumbnail.types";

export type SkeletonProps = Partial<Pick<SkeletonBaseProps, "width">> &
  Partial<Pick<ThumbnailProps, "aspectRatio">> & {
    "data-testid"?: string;
  };

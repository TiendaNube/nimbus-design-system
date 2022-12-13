import { SkeletonProps } from "@nimbus-ds/skeleton";
import { ThumbnailProps } from "../../thumbnail.types";

export type ThumbnailSkeletonProps = Partial<Pick<SkeletonProps, "width">> &
  Partial<Pick<ThumbnailProps, "aspectRatio">> & {
    "data-testid"?: string;
  };

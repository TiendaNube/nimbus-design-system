import { SkeletonProps } from "@nimbus-ds/skeleton";
import { ThumbnailProps } from "../../thumbnail.types";

export type ThumbnailSkeletonProperties = Partial<
  Pick<ThumbnailProps, "aspectRatio">
> &
  Partial<Pick<SkeletonProps, "width" | "data-testid">>;

export type ThumbnailSkeletonProps = ThumbnailSkeletonProperties;

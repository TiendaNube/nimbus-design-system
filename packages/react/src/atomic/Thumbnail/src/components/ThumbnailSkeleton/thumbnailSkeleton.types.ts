import { type SkeletonProps } from "@nimbus-ds/skeleton";
import { type ThumbnailProps } from "../../thumbnail.types";

export type ThumbnailSkeletonProperties = Partial<
  Pick<ThumbnailProps, "aspectRatio">
> &
  Partial<Pick<SkeletonProps, "width" | "className" | "data-testid">>;

export type ThumbnailSkeletonProps = ThumbnailSkeletonProperties;

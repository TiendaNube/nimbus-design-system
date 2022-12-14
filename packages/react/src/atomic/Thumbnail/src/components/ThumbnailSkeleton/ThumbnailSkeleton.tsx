import React from "react";
import { thumbnail } from "@nimbus-ds/styles";
import { Skeleton } from "@nimbus-ds/skeleton";
import { ThumbnailSkeletonProps } from "./thumbnailSkeleton.types";

const ThumbnailSkeleton: React.FC<ThumbnailSkeletonProps> = ({
  width,
  aspectRatio = "1/1",
  "data-testid": dataTestId,
}) => (
  <div className={thumbnail.classnames.skeleton}>
    <div
      data-testid="thumbnail-skeleton-container"
      className={thumbnail.sprinkle({ aspectRatio })}
    >
      <Skeleton
        width={width ?? "6.5rem"}
        height="100%"
        borderRadius="0.5rem"
        data-testid={dataTestId}
      />
    </div>
  </div>
);

export { ThumbnailSkeleton };

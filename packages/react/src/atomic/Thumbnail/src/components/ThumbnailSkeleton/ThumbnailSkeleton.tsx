import React from "react";
import { thumbnail, vars } from "@nimbus-ds/styles";
import { Skeleton } from "@nimbus-ds/skeleton";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { ThumbnailSkeletonProps } from "./thumbnailSkeleton.types";

const ThumbnailSkeleton: React.FC<ThumbnailSkeletonProps> = ({
  width = "100%",
  aspectRatio = "1/1",
  "data-testid": dataTestId,
}) => (
  <div className={thumbnail.classnames.skeleton}>
    <div
      data-testid="thumbnail-skeleton-container"
      className={[
        thumbnail.sprinkle({ aspectRatio }),
        thumbnail.classnames.width,
      ].join(" ")}
      style={assignInlineVars({
        [vars.width]: width,
      })}
    >
      <Skeleton
        width="auto"
        height="100%"
        borderRadius="0.5rem"
        data-testid={dataTestId}
      />
    </div>
  </div>
);

export { ThumbnailSkeleton };

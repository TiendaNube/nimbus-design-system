import React from "react";
import { thumbnail } from "@nimbus-ds/styles";
import { Skeleton as SkeletonBase } from "@nimbus-ds/skeleton";
import { SkeletonProps } from "./skeleton.types";

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  aspectRatio = "1-1",
  "data-testid": dataTestId,
}) => (
  <div className={thumbnail.style.skeleton}>
    <div
      data-testid="thumbnail-skeleton-container"
      className={thumbnail.sprinkle({ aspectRatio })}
    >
      <SkeletonBase
        width={width ?? "6.5rem"}
        height="100%"
        borderRadius="0.5rem"
        data-testid={dataTestId}
      />
    </div>
  </div>
);

export { Skeleton };

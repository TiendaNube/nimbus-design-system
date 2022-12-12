import React from "react";
import { fileUploader } from "@nimbus-ds/styles";
import { Skeleton } from "@nimbus-ds/skeleton";
import { FileUploaderSkeletonProps } from "./fileUploaderSkeleton.types";

const FileUploaderSkeleton: React.FC<FileUploaderSkeletonProps> = ({
  width,
  aspectRatio = "1-1",
  height,
  "data-testid": dataTestId,
}) => (
  <div className={aspectRatio !== "none" ? fileUploader.style.skeleton : ""}>
    <div
      data-testid="file-uploader-skeleton-container"
      className={fileUploader.sprinkle({ aspectRatio })}
    >
      <Skeleton
        width={width ?? "6.5rem"}
        height={height || "100%"}
        borderRadius="0.5rem"
        data-testid={dataTestId}
      />
    </div>
  </div>
);

export { FileUploaderSkeleton };

import React from "react";
import { fileUploader } from "@nimbus-ds/styles";
import { Skeleton } from "@nimbus-ds/skeleton";
import { type FileUploaderSkeletonProps } from "./fileUploaderSkeleton.types";

const FileUploaderSkeleton: React.FC<FileUploaderSkeletonProps> = ({
  className,
  width,
  aspectRatio = "1/1",
  height,
  "data-testid": dataTestId,
}) => (
  <div
    className={[
      className,
      aspectRatio !== "none" ? fileUploader.classnames.skeleton : "",
    ]
      .filter(Boolean)
      .join(" ")}
  >
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

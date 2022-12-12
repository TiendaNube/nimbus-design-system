import { SkeletonProps } from "@nimbus-ds/skeleton";
import { FileUploaderProps } from "../../fileUploader.types";

export type FileUploaderSkeletonProps = Partial<Pick<SkeletonProps, "width">> &
  Partial<Pick<SkeletonProps, "height">> &
  Partial<Pick<FileUploaderProps, "aspectRatio">> & {
    "data-testid"?: string;
  };

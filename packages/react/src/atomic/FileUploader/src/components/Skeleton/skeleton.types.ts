import { SkeletonProps as SkeletonBaseProps } from "@nimbus-ds/skeleton";
import { FileUploaderProps } from "../../fileUploader.types";

export type SkeletonProps = Partial<Pick<SkeletonBaseProps, "width">> &
  Partial<Pick<SkeletonBaseProps, "height">> &
  Partial<Pick<FileUploaderProps, "aspectRatio">> & {
    "data-testid"?: string;
  };

import type { SkeletonProps } from "@nimbus-ds/skeleton";
import type { FileUploaderProps } from "../../fileUploader.types";

export type FileUploaderSkeletonProperties = Partial<
  Pick<SkeletonProps, "width">
> &
  Partial<Pick<SkeletonProps, "height">> &
  Partial<Pick<FileUploaderProps, "aspectRatio">> & {
    /**
     * This is an attribute used to identify a DOM node for testing purposes.
     */
    "data-testid"?: string;
  };

export type FileUploaderSkeletonProps = FileUploaderSkeletonProperties;

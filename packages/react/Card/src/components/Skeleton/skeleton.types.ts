import { SkeletonProps as SkeletonBaseProps } from "@nimbus-ds/skeleton";
import { FileUploaderProps } from "../../card.types";

export type SkeletonProps = Partial<Pick<SkeletonBaseProps, "width">> &
  Partial<Pick<SkeletonBaseProps, "height">> &
  Partial<Pick<FileUploaderProps, "aspectRatio">> & {
    "data-testid"?: string;
  };

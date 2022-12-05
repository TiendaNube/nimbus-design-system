import { SkeletonProps as SkeletonBaseProps } from "@nimbus-ds/skeleton";
import { TextProps } from "../../text.types";

export type SkeletonProps = Pick<TextProps, "fontSize"> &
  Partial<Pick<SkeletonBaseProps, "width">> &
  Partial<Pick<SkeletonBaseProps, "height">> & {
    "data-testid"?: string;
  };

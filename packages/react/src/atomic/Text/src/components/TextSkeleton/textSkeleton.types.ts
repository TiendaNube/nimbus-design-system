import { SkeletonProps } from "@nimbus-ds/skeleton";
import { TextProps } from "../../text.types";

export type TextSkeletonProps = Pick<TextProps, "fontSize"> &
  Partial<Pick<SkeletonProps, "width">> &
  Partial<Pick<SkeletonProps, "height">> & {
    "data-testid"?: string;
  };

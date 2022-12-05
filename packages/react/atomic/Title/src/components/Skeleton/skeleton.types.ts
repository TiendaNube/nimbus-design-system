import { SkeletonProps as SkeletonBaseProps } from "@nimbus-ds/skeleton";
import { TitleProps } from "../../title.types";

export type SkeletonProps = Pick<TitleProps, "as"> &
  Partial<Pick<SkeletonBaseProps, "width">> &
  Partial<Pick<SkeletonBaseProps, "height">> & {
    "data-testid"?: string;
  };

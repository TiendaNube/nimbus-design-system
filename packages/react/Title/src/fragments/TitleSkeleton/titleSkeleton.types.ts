import { SkeletonProps } from "@nimbus-ds/skeleton";
import { TitleProps } from "../../title.types";

export type TitleSkeletonProps = Pick<TitleProps, "as"> &
  Partial<Pick<SkeletonProps, "width">> &
  Partial<Pick<SkeletonProps, "height">> & {
    "data-testid"?: string;
  };

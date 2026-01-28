import type { SkeletonProps } from "@nimbus-ds/skeleton";
import type { TitleProps } from "../../title.types";

export type TitleSkeletonProperties = Pick<TitleProps, "as"> &
  Partial<Pick<SkeletonProps, "width" | "height" | "data-testid">>;

export type TitleSkeletonProps = TitleSkeletonProperties;

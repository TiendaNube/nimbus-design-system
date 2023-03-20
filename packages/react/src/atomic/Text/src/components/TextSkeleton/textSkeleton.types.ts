import { SkeletonProps } from "@nimbus-ds/skeleton";
import { TextProps } from "../../text.types";

export type TextSkeletonProperties = Pick<TextProps, "fontSize"> &
  Partial<Pick<SkeletonProps, "width" | "height" | "data-testid">>;

export type TextSkeletonProps = TextSkeletonProperties;

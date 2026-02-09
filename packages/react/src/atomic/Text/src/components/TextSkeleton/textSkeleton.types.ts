import { type SkeletonProps } from "@nimbus-ds/skeleton";
import { type text } from "@nimbus-ds/styles";

export type TextSkeletonProperties = {
  fontSize?: keyof typeof text.properties.fontSize;
} & Partial<Pick<SkeletonProps, "width" | "height" | "data-testid">>;

export type TextSkeletonProps = TextSkeletonProperties;

import { SkeletonProps } from "@nimbus-ds/skeleton";
import { text } from "@nimbus-ds/styles";

export type TextSkeletonProperties = {
  fontSize?: keyof typeof text.properties.fontSize;
} & Partial<Pick<SkeletonProps, "width" | "height" | "data-testid">>;

export type TextSkeletonProps = TextSkeletonProperties;

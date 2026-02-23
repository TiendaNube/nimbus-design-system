import { type SkeletonProps } from "@nimbus-ds/skeleton";

export type TextareaSkeletonProperties = Partial<
  Pick<SkeletonProps, "width" | "className" | "data-testid">
>;

export type TextareaSkeletonProps = TextareaSkeletonProperties;

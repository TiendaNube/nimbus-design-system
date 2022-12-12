import { SkeletonProps as SkeletonBaseProps } from "@nimbus-ds/skeleton";
import { RadioProps } from "../../radio.types";

export type SkeletonProps = Partial<Pick<SkeletonBaseProps, "width">> &
  Partial<Pick<RadioProps, "as">> & {
    "data-testid"?: string;
  };

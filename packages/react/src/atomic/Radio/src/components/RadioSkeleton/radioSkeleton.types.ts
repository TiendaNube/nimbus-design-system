import { SkeletonProps } from "@nimbus-ds/skeleton";
import { RadioProps } from "../../radio.types";

export type RadioSkeletonProps = Partial<Pick<SkeletonProps, "width">> &
  Partial<Pick<RadioProps, "as">> & {
    "data-testid"?: string;
  };

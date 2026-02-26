import { type SkeletonProps } from "@nimbus-ds/skeleton";
import { type RadioProps } from "../../radio.types";

export type RadioSkeletonProperties = Partial<
  Pick<SkeletonProps, "width" | "className">
> &
  Partial<Pick<RadioProps, "as">> & {
    /**
     * This is an attribute used to identify a DOM node for testing purposes.
     */
    "data-testid"?: string;
  };

export type RadioSkeletonProps = RadioSkeletonProperties;

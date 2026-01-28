import { SkeletonProps } from "@nimbus-ds/skeleton";
import { RadioProps } from "../../radio.types";

export type RadioSkeletonProperties = Partial<Pick<SkeletonProps, "width">> &
  Partial<Pick<RadioProps, "as">> & {
    /**
     * This is an attribute used to identify a DOM node for testing purposes.
     */
    "data-testid"?: string;
  };

export type RadioSkeletonProps = RadioSkeletonProperties;

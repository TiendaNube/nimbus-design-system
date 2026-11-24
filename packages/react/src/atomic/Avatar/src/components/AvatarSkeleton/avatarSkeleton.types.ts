import { type SkeletonProps } from "@nimbus-ds/skeleton";
import { type AvatarSize } from "../../avatar.types";

export type AvatarSkeletonProperties = Partial<
  Pick<SkeletonProps, "className">
> & {
  /**
   * Size of the avatar the skeleton stands in for.
   * @default medium
   */
  size?: AvatarSize;
  /**
   * This is an attribute used to identify a DOM node for testing purposes.
   */
  "data-testid"?: string;
};

export type AvatarSkeletonProps = AvatarSkeletonProperties;

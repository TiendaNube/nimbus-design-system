import React from "react";
import { Skeleton } from "@nimbus-ds/skeleton";

import { type AvatarSize } from "../../avatar.types";
import { type AvatarSkeletonProps } from "./avatarSkeleton.types";

/** Skeleton diameter per avatar size, matching the avatar theme values. */
export const AVATAR_SKELETON_SIZES: Record<AvatarSize, string> = {
  small: "1.25rem",
  medium: "1.5rem",
  large: "2.5rem"
};

const AvatarSkeleton: React.FC<AvatarSkeletonProps> = ({
  className,
  size = "medium",
  "data-testid": dataTestId
}) => (
  <Skeleton
    className={className}
    width={AVATAR_SKELETON_SIZES[size]}
    height={AVATAR_SKELETON_SIZES[size]}
    borderRadius="9999px"
    data-testid={dataTestId}
  />
);

export { AvatarSkeleton };

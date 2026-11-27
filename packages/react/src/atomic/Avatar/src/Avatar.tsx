import React from "react";
import { avatar } from "@nimbus-ds/styles";

import { type AvatarProps, type AvatarComponents } from "./avatar.types";
import { AvatarSkeleton } from "./components";

/**
 * Avatar shows the identity of a store, a person or an AI assistant with an
 * initial or an icon inside a circle.
 *
 * @example
 * <Avatar size="small">R</Avatar>
 */
const Avatar: React.FC<AvatarProps> & AvatarComponents = ({
  className,
  children,
  size = "medium",
  appearance = "neutral",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...rest
}: AvatarProps) => {
  const isDecorative = !ariaLabel && !ariaLabelledBy;

  return (
    <span
      {...rest}
      role={isDecorative ? undefined : "img"}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-hidden={isDecorative ? true : undefined}
      className={[
        className,
        avatar.classnames.base,
        avatar.classnames.size[size],
        avatar.classnames.appearance[appearance]
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
};

Avatar.Skeleton = AvatarSkeleton;
Avatar.displayName = "Avatar";
Avatar.Skeleton.displayName = "Avatar.Skeleton";

export { Avatar };

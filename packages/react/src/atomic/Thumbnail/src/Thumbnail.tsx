import React from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { CameraIcon } from "@tiendanube/icons";
import { thumbnail, utils } from "@nimbus-ds/styles";
import { Icon } from "@nimbus-ds/icon";

import { ThumbnailProps, ThumbnailComponents } from "./thumbnail.types";
import { ThumbnailSkeleton } from "./components";

const Thumbnail: React.FC<ThumbnailProps> & ThumbnailComponents = ({
  className: _className,
  style: _style,
  aspectRatio = "1-1",
  width = "100%",
  children,
  alt,
  src,
  ...rest
}: ThumbnailProps) => (
  <div
    className={thumbnail.style.container}
    style={assignInlineVars({
      [utils.vars.width]: width,
    })}
  >
    {children}
    {src && (
      <img
        {...rest}
        className={[
          thumbnail.style.image,
          thumbnail.sprinkle({ aspectRatio }),
        ].join(" ")}
        src={src}
        alt={alt}
      />
    )}
    {!src && (
      <div
        data-testid="thumbnail-empty"
        className={[
          thumbnail.style.placeholder,
          thumbnail.sprinkle({ aspectRatio }),
        ].join(" ")}
      >
        <Icon
          color="neutral.interactive"
          source={<CameraIcon size="large" />}
        />
      </div>
    )}
  </div>
);

Thumbnail.Skeleton = ThumbnailSkeleton;
Thumbnail.displayName = "Thumbnail";
Thumbnail.Skeleton.displayName = "Thumbnail.Skeleton";

export { Thumbnail };

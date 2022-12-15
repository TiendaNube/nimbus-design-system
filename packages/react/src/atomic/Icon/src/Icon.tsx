import React from "react";
import { icon } from "@nimbus-ds/styles";

import { IconProps, IconComponents } from "./icon.types";
import { IconSkeleton } from "./components";

const Icon: React.FC<IconProps> & IconComponents = ({
  className: _className,
  style: _style,
  color = "neutral.textLow",
  cursor = "auto",
  source,
  ...rest
}: IconProps) => (
  <div
    {...rest}
    className={[
      icon.sprinkle({ color, cursor }),
      icon.classnames.container,
    ].join(" ")}
  >
    {source}
  </div>
);

Icon.Skeleton = IconSkeleton;
Icon.displayName = "Icon";

export { Icon };

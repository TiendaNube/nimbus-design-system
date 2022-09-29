import React from "react";
import { iconButton } from "@nimbus-ds/styles";
import { Icon } from "@nimbus-ds/icon";

import { IconButtonProps, IconButtonComponents } from "./iconButton.types";
import { Skeleton } from "./components";

const IconButton: React.FC<IconButtonProps> & IconButtonComponents = ({
  className: _className,
  style: _style,
  as: As = "a",
  source,
  ...rest
}: IconButtonProps) => (
  <As {...rest} className={iconButton.style}>
    <Icon
      data-testid="icon-element"
      color="primary.interactive"
      source={source}
    />
  </As>
);

IconButton.Skeleton = Skeleton;

export { IconButton };

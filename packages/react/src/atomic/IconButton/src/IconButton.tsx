import React from "react";
import { iconButton } from "@nimbus-ds/styles";
import { Icon } from "@nimbus-ds/icon";

import { IconButtonProps, IconButtonComponents } from "./iconButton.types";
import { IconButtonSkeleton } from "./components";

const IconButton: React.FC<IconButtonProps> & IconButtonComponents = ({
  className: _className,
  style: _style,
  as: As = "button",
  size = "2.75rem",
  backgroundColor = {
    xs: "neutral.surface",
    active: "neutral.interactive",
    hover: "neutral.surfaceHighlight",
  },
  borderColor = {
    xs: "neutral.interactive",
    active: "neutral.interactivePressed",
    hover: "neutral.interactiveHover",
    focus: "primary.interactive",
  },
  source,
  ...rest
}: IconButtonProps) => {
  const { className, style, otherProps } = iconButton.sprinkle({
    ...(rest as Parameters<typeof iconButton.sprinkle>[0]),
    size,
    borderColor,
    backgroundColor,
  });

  return (
    <As
      className={[iconButton.classnames.container, className].join(" ")}
      style={style}
      {...otherProps}
    >
      <Icon
        data-testid="icon-element"
        color="neutral.textLow"
        cursor="pointer"
        source={source}
      />
    </As>
  );
};

IconButton.Skeleton = IconButtonSkeleton;
IconButton.displayName = "IconButton";
IconButton.Skeleton.displayName = "IconButton.Skeleton";

export { IconButton };

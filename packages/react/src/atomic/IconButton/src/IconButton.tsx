import React from "react";
import { iconButton } from "@nimbus-ds/styles";
import { Icon } from "@nimbus-ds/icon";

import type { IconButtonProps, IconButtonComponents } from "./iconButton.types";
import { IconButtonSkeleton } from "./components";

const IconButton: React.FC<IconButtonProps> & IconButtonComponents = ({
  className: _className,
  style: _style,
  as: As = "button",
  size = "2.75rem",
  backgroundColor = {
    xs: "neutral-surface",
    active: "neutral-interactive",
    hover: "neutral-surfaceHighlight",
  },
  borderColor = {
    xs: "neutral-interactive",
    active: "neutral-interactivePressed",
    hover: "neutral-interactiveHover",
    focus: "primary-interactive",
  },
  color = "neutral-textHigh",
  appearance,
  source,
  ...rest
}: IconButtonProps) => {
  const sprinkleProps = {
    size,
    ...(appearance !== "ai-generative" && {
      borderColor,
      backgroundColor,
    }),
  };

  const { className, style, otherProps } = iconButton.sprinkle({
    ...(rest as Parameters<typeof iconButton.sprinkle>[0]),
    ...sprinkleProps,
  });

  return (
    <As
      className={[
        className,
        appearance
          ? iconButton.classnames.appearance?.[appearance]
          : iconButton.classnames.base,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      {...otherProps}
    >
      <Icon
        data-testid="icon-element"
        color={color}
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

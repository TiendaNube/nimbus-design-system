import React from "react";
import { iconButton } from "@nimbus-ds/styles";
import { Icon } from "@nimbus-ds/icon";

import {
  type IconButtonProps,
  type IconButtonComponents,
} from "./iconButton.types";
import { IconButtonSkeleton } from "./components";

const IconButton: React.FC<IconButtonProps> & IconButtonComponents = ({
  className,
  style: _style,
  as: As = "button",
  size = "1.75rem",
  backgroundColor = {
    xs: "neutral-surface",
    active: "neutral-interactive",
    hover: "neutral-surfaceHighlight",
  },
  borderColor = {
    xs: "neutral-interactive",
    active: "neutral-interactivePressed",
    hover: "neutral-interactiveHover",
    focus: "neutral-interactive",
  },
  color = "neutral-textHigh",
  appearance,
  disabled,
  source,
  ...rest
}: IconButtonProps) => {
  const sprinkleProps = {
    size,
    ...(appearance !== "ai-generative" &&
      appearance !== "transparent" &&
      appearance !== "ai-secondary" && {
        borderColor,
        backgroundColor,
      }),
  };

  const {
    className: classNameStyles,
    style,
    otherProps,
  } = iconButton.sprinkle({
    ...(rest as Parameters<typeof iconButton.sprinkle>[0]),
    ...sprinkleProps,
  });

  const getDisabledIconColor = (): typeof color => {
    if (appearance === "ai-generative") return "neutral-surface";
    return "neutral-textDisabled";
  };

  const iconColor = disabled ? getDisabledIconColor() : color;

  return (
    <As
      className={[
        className,
        classNameStyles,
        appearance
          ? iconButton.classnames.appearance?.[appearance]
          : iconButton.classnames.base,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      disabled={disabled}
      {...otherProps}
    >
      <Icon
        data-testid="icon-element"
        color={iconColor}
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

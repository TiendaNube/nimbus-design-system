import React from "react";
import { iconButton, useTheme } from "@nimbus-ds/styles";
import { Icon } from "@nimbus-ds/icon";

import {
  type IconButtonProps,
  type IconButtonComponents,
} from "./iconButton.types";
import { IconButtonSkeleton } from "./components";
import {
  NORTEUI_ICON_BUTTON_SIZE,
  isNorteUiTheme,
} from "./iconButton.definitions";

const defaultBackgroundColor: IconButtonProps["backgroundColor"] = {
  xs: "neutral-surface",
  active: "neutral-interactive",
  hover: "neutral-surfaceHighlight",
};

const defaultBorderColor: IconButtonProps["borderColor"] = {
  xs: "neutral-interactive",
  active: "neutral-interactivePressed",
  hover: "neutral-interactiveHover",
  focus: "primary-interactive",
};

const IconButton: React.FC<IconButtonProps> & IconButtonComponents = ({
  className,
  style: _style,
  as: As = "button",
  size,
  backgroundColor,
  borderColor,
  color,
  appearance,
  source,
  ...rest
}: IconButtonProps) => {
  const { currentTheme } = useTheme();
  const isNorteUi = isNorteUiTheme(currentTheme);
  const isAiGenerative = appearance === "ai-generative";
  const isTransparent = backgroundColor === "transparent";

  // Norte UI only replaces values the consumer did not pass, so explicit
  // props keep working exactly as before in every theme.
  const sprinkleProps = {
    size: size ?? (isNorteUi ? NORTEUI_ICON_BUTTON_SIZE : "2.75rem"),
    ...(!isAiGenerative &&
      !isNorteUi && {
        borderColor: borderColor ?? defaultBorderColor,
        backgroundColor: backgroundColor ?? defaultBackgroundColor,
      }),
    ...(!isAiGenerative &&
      isNorteUi &&
      !isTransparent && {
        ...(borderColor !== undefined && { borderColor }),
        ...(backgroundColor !== undefined && { backgroundColor }),
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

  const norteUiClassnames = isNorteUi
    ? [
        iconButton.classnames.norteui,
        isAiGenerative && iconButton.classnames.norteuiAiGenerative,
        !isAiGenerative &&
          isTransparent &&
          iconButton.classnames.norteuiTransparent,
        !isAiGenerative &&
          backgroundColor === undefined &&
          iconButton.classnames.norteuiNeutral,
      ]
    : [];

  const iconColor =
    color ??
    (isNorteUi && rest.disabled ? "neutral-textDisabled" : "neutral-textHigh");

  return (
    <As
      className={[
        className,
        classNameStyles,
        appearance
          ? iconButton.classnames.appearance?.[appearance]
          : iconButton.classnames.base,
        ...norteUiClassnames,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
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

import React from "react";
import { iconButton, useTheme } from "@nimbus-ds/styles";
import { Icon } from "@nimbus-ds/icon";

import {
  type IconButtonProps,
  type IconButtonComponents,
} from "./iconButton.types";
import { IconButtonSkeleton } from "./components";
import {
  DEFAULT_ICON_BUTTON_SIZE,
  NORTEUI_ICON_BUTTON_SIZE,
  getColorSprinkles,
  getIconColor,
  getNorteUiClassnames,
  getNorteUiFill,
  isNorteUiTheme,
} from "./iconButton.definitions";

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

  const norteUiFill =
    isNorteUi && !isAiGenerative ? getNorteUiFill(backgroundColor) : undefined;

  // Norte UI only replaces values the consumer did not pass, so explicit
  // props keep working as before in every theme. Exception: under Norte UI
  // the default, transparent and ai-generativeSurface fills own the border,
  // so borderColor does not apply with them (see getNorteUiFill).
  const sprinkleProps = {
    size:
      size ?? (isNorteUi ? NORTEUI_ICON_BUTTON_SIZE : DEFAULT_ICON_BUTTON_SIZE),
    ...getColorSprinkles({
      isNorteUi,
      isAiGenerative,
      norteUiFill,
      backgroundColor,
      borderColor,
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

  const norteUiClassnames = getNorteUiClassnames({
    isNorteUi,
    isAiGenerative,
    norteUiFill,
    borderColor,
  });
  const iconColor = getIconColor({
    color,
    isNorteUi,
    norteUiFill,
    disabled: rest.disabled,
  });

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

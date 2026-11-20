import { style, styleVariants, globalStyle } from "@vanilla-extract/css";
import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { cursorProperties } from "../../../properties";
import { varsThemeBase } from "../../../themes";

const radioTheme = varsThemeBase.components.radio;

/* -------------------------------------------------------------------------------------------------
 * style as "base"
 * -----------------------------------------------------------------------------------------------*/

const base = style({
  borderStyle: "solid",
  display: "flex",
  borderWidth: varsThemeBase.shape.border.width[1],
  padding: `${varsThemeBase.spacing[1]} ${varsThemeBase.spacing["1-5"]}`,
  borderRadius: varsThemeBase.shape.border.radius[1],
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,
});

const container = style({
  position: "relative",
  display: "flex",
  alignItems: "flex-start",
  width: "fit-content",
  gap: varsThemeBase.spacing[1],
  borderStyle: "solid",
  borderColor: "transparent",
  borderWidth: varsThemeBase.shape.border.width[1],
  borderRadius: varsThemeBase.shape.border.radius[1],
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,
});

const container__content = styleVariants({
  radio: [
    {
      transition: `all ${varsThemeBase.motion.speed.fast} ease`,
      display: "flex",
      color: varsThemeBase.colors.neutral.textHigh,
    },
  ],
  button: [
    base,
    {
      backgroundColor: radioTheme.button.background,
      borderColor: varsThemeBase.colors.neutral.interactive,
      color: varsThemeBase.colors.neutral.textHigh,
      ":active": {
        backgroundColor: varsThemeBase.colors.neutral.interactive,
        borderColor: varsThemeBase.colors.neutral.interactiveHover,
      },
      ":hover": {
        background: radioTheme.button.hover.background,
        borderColor: radioTheme.button.hover.borderColor,
      },
    },
  ],
  disabled: [
    base,
    {
      cursor: "not-allowed",
      backgroundColor: radioTheme.button.disabled.background,
      borderColor: radioTheme.button.disabled.borderColor,
      color: varsThemeBase.colors.neutral.textDisabled,
    },
  ],
});

const container__input = style({
  position: "absolute",
  overflow: "hidden",
  opacity: 0,
  height: 0,
  width: 0,
});

/* -------------------------------------------------------------------------------------------------
 * style as "radio"
 * -----------------------------------------------------------------------------------------------*/

export const container__checkmark = style({
  minWidth: "0.875rem",
  minHeight: "0.875rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",

  borderStyle: "solid",
  borderWidth: varsThemeBase.shape.border.width[1],
  borderRadius: varsThemeBase.shape.border.radius.full,
  borderColor: varsThemeBase.colors.neutral.interactive,
  backgroundColor: varsThemeBase.colors.neutral.background,
});

export const container__checkicon = style({
  display: "none",
  width: radioTheme.dotSize,
  height: radioTheme.dotSize,
  borderRadius: varsThemeBase.shape.border.radius.full,
});

globalStyle(`${container__input}:checked ~ ${container__checkmark}`, {
  borderColor: varsThemeBase.colors.primary.interactive,
});

globalStyle(
  `${container__input}:checked ~ ${container__checkmark} ${container__checkicon}`,
  {
    display: "block",
    backgroundColor: varsThemeBase.colors.primary.interactive,
  }
);

// Before hover and pressed, which win over it while the radio is focused.
globalStyle(
  `${container__input}:focus-visible:enabled:not(:checked) ~ ${container__checkmark}`,
  {
    borderColor: radioTheme.focus.borderColor,
  }
);

globalStyle(
  `${container}:hover ${container__input}:enabled:not(:checked) ~ ${container__checkmark}`,
  {
    backgroundColor: radioTheme.hover.background,
    borderColor: radioTheme.hover.borderColor,
  }
);

globalStyle(
  `${container}:active ${container__input}:enabled:not(:checked) ~ ${container__checkmark}`,
  {
    backgroundColor: radioTheme.pressed.background,
    borderColor: radioTheme.pressed.borderColor,
  }
);

globalStyle(
  `${container}:hover ${container__input}:enabled:checked ~ ${container__checkmark}`,
  {
    borderColor: radioTheme.checked.hover.color,
  }
);

globalStyle(
  `${container}:hover ${container__input}:enabled:checked ~ ${container__checkmark} ${container__checkicon}`,
  {
    backgroundColor: radioTheme.checked.hover.color,
  }
);

globalStyle(
  `${container}:active ${container__input}:enabled:checked ~ ${container__checkmark}`,
  {
    borderColor: radioTheme.checked.pressed.color,
  }
);

globalStyle(
  `${container}:active ${container__input}:enabled:checked ~ ${container__checkmark} ${container__checkicon}`,
  {
    backgroundColor: radioTheme.checked.pressed.color,
  }
);

globalStyle(`${container__input}:disabled ~ ${container__checkmark}`, {
  backgroundColor: radioTheme.disabled.background,
  borderColor: radioTheme.disabled.borderColor,
});

globalStyle(`${container__input}:checked:disabled ~ ${container__checkmark}`, {
  backgroundColor: radioTheme.checkedDisabled.background,
  borderColor: radioTheme.checkedDisabled.borderColor,
});

globalStyle(
  `${container__input}:disabled ~ ${container__checkmark} ${container__checkicon}`,
  {
    backgroundColor: radioTheme.checkedDisabled.dotColor,
  }
);

globalStyle(`${container__input}:disabled ~ ${container__content.radio}`, {
  color: varsThemeBase.colors.neutral.textDisabled,
});

globalStyle(`${container} p`, {
  lineHeight: varsThemeBase.spacing[4],
});

globalStyle(`${container__content.radio} p`, {
  fontSize: radioTheme.label.fontSize,
});

globalStyle(`${container__input}:focus-visible ~ ${container__checkmark}`, {
  boxShadow: radioTheme.focus.boxShadow,
});

/* -------------------------------------------------------------------------------------------------
 * style as "button"
 * -----------------------------------------------------------------------------------------------*/

globalStyle(
  `${container__input}:focus-visible ~ ${container__content.button}`,
  {
    boxShadow: radioTheme.focus.boxShadow,
  }
);

// Unchecked border while focused. Hover and pressed keep their own border.
globalStyle(
  `${container__input}:focus-visible:not(:checked) ~ ${container__content.button}:not(:hover)`,
  {
    borderColor: radioTheme.button.focus.borderColor,
  }
);

globalStyle(`${container__input}:checked ~ ${container__content.button}`, {
  backgroundColor: varsThemeBase.colors.primary.interactive,
  borderColor: varsThemeBase.colors.primary.interactive,
  color: varsThemeBase.colors.neutral.background,
});

// Pressed while unchecked. The base values repeat the hover, which already
// won over :active.
globalStyle(
  `${container__input}:not(:checked) ~ ${container__content.button}:hover:active`,
  {
    background: radioTheme.button.pressed.background,
    borderColor: radioTheme.button.pressed.borderColor,
  }
);

globalStyle(
  `${container__input}:checked ~ ${container__content.button}:hover`,
  {
    backgroundColor: radioTheme.button.checked.hover.background,
    borderColor: radioTheme.button.checked.hover.background,
  }
);

globalStyle(
  `${container__input}:checked ~ ${container__content.button}:hover:active`,
  {
    backgroundColor: radioTheme.button.checked.pressed.background,
    borderColor: radioTheme.button.checked.pressed.background,
  }
);

globalStyle(`${container__input}:checked ~ ${container__content.disabled}`, {
  backgroundColor: radioTheme.button.checkedDisabled.background,
  borderColor: radioTheme.button.checkedDisabled.borderColor,
  color: radioTheme.button.checkedDisabled.color,
});

export const styles = {
  base,
  container,
  container__content,
  container__input,
  container__checkmark,
  container__checkicon,
};

/* -------------------------------------------------------------------------------------------------
 * Sprinkle
 * -----------------------------------------------------------------------------------------------*/

const properties = {
  cursor: cursorProperties,
};

const sprinkle = createSprinkles(
  defineProperties({
    properties,
  })
);

export const radioSprinkle = {
  sprinkle,
  properties,
};

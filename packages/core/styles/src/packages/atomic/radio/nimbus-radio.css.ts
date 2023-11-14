import { style, styleVariants, globalStyle } from "@vanilla-extract/css";
import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { cursorProperties } from "../../../properties";
import { varsThemeBase } from "../../../themes";

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
  ":focus-within": {
    boxShadow: varsThemeBase.utils.focus,
  },
});

const container__content = styleVariants({
  radio: [
    {
      transition: `all ${varsThemeBase.motion.speed.fast} ease`,
      display: "flex",
      color: varsThemeBase.colors.neutral.textLow,
    },
  ],
  button: [
    base,
    {
      backgroundColor: varsThemeBase.colors.neutral.surface,
      borderColor: varsThemeBase.colors.neutral.interactive,
      color: varsThemeBase.colors.neutral.textLow,
      ":active": {
        backgroundColor: varsThemeBase.colors.neutral.interactive,
        borderColor: varsThemeBase.colors.neutral.interactiveHover,
      },
      ":hover": {
        background: varsThemeBase.colors.neutral.surfaceHighlight,
        borderColor: varsThemeBase.colors.neutral.interactivePressed,
      },
    },
  ],
  disabled: [
    base,
    {
      cursor: "not-allowed",
      backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
      borderColor: varsThemeBase.colors.neutral.surfaceHighlight,
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
  width: "0.563rem",
  height: "0.563rem",
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

globalStyle(`${container__input}:disabled ~ ${container__checkmark}`, {
  backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
  borderColor: varsThemeBase.colors.neutral.interactive,
});

globalStyle(
  `${container__input}:disabled ~ ${container__checkmark} ${container__checkicon}`,
  {
    backgroundColor: varsThemeBase.colors.neutral.textDisabled,
  }
);

globalStyle(`${container__input}:disabled ~ ${container__content.radio}`, {
  color: varsThemeBase.colors.neutral.textDisabled,
});

globalStyle(`${container} p`, {
  lineHeight: varsThemeBase.spacing[4],
});

/* -------------------------------------------------------------------------------------------------
 * style as "button"
 * -----------------------------------------------------------------------------------------------*/

globalStyle(`${container__input}:checked ~ ${container__content.button}`, {
  backgroundColor: varsThemeBase.colors.primary.interactive,
  borderColor: varsThemeBase.colors.primary.interactive,
  color: varsThemeBase.colors.neutral.background,
});

globalStyle(`${container__input}:checked ~ ${container__content.disabled}`, {
  backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
  borderColor: varsThemeBase.colors.neutral.surfaceHighlight,
  color: varsThemeBase.colors.neutral.textDisabled,
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

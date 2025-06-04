import { style } from "@vanilla-extract/css";
import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { varsThemeBase } from "../../../themes";

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

const container = style({
  display: "flex",
  alignItems: "center",
  width: "100%",
  gap: varsThemeBase.spacing[2],
  flexWrap: "wrap",
});

const item = style({
  display: "flex",
  alignItems: "center",
  gap: varsThemeBase.spacing[2],
  position: "relative",
  cursor: "pointer",
});

const item_disabled = style({
  cursor: "default",
});

const item__icon = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "1.5rem",
  height: "1.5rem",
  borderRadius: varsThemeBase.shape.border.radius.full,
  fontSize: varsThemeBase.fontSize.body.caption,
  fontWeight: varsThemeBase.fontWeight.medium,
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,
  flexShrink: 0,
});

const item__line = style({
  height: varsThemeBase.shape.border.width[2],
  backgroundColor: varsThemeBase.colors.neutral.interactive,
  flex: 1,
  maxWidth: "44px",
});

// State variants for the icon
const item__icon_current = style({
  backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
  color: varsThemeBase.colors.neutral.textLow,
});

const item__icon_selected = style({
  backgroundColor: varsThemeBase.colors.primary.interactive,
  color: varsThemeBase.colors.neutral.background,
});

const item__icon_completed = style({
  backgroundColor: varsThemeBase.colors.success.interactive,
  color: varsThemeBase.colors.neutral.background,
  cursor: "pointer",
  ":hover": {
    backgroundColor: varsThemeBase.colors.success.interactiveHover,
    borderColor: varsThemeBase.colors.success.interactiveHover,
  },
});

const item__icon_pending = style({
  backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
  color: varsThemeBase.colors.neutral.textDisabled,
});

export const styles = {
  container,
  item,
  item_disabled,
  item__icon,
  item__line,
  item__icon_current,
  item__icon_completed,
  item__icon_pending,
  item__icon_selected,
};

/* -------------------------------------------------------------------------------------------------
 * Sprinkle
 * -----------------------------------------------------------------------------------------------*/

const stepperProperties = {};

export const stepperSprinkle = {
  sprinkle: createSprinkles(
    defineProperties({
      properties: stepperProperties,
    })
  ),
  properties: stepperProperties,
};

import { style } from "@vanilla-extract/css";
import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { baseColors } from "../../../properties";
import { varsThemeBase } from "../../../themes";

/* -------------------------------------------------------------------------------------------------
 * Styles
 * -----------------------------------------------------------------------------------------------*/

const header = style({
  width: "100%",
  cursor: "pointer",
  backgroundColor: varsThemeBase.colors.neutral.background,
  padding: varsThemeBase.sizes[4],
  border: "none",
});

const header_active = style({
  backgroundColor: varsThemeBase.colors.neutral.surface,
});

const header__content = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const header__description = style({
  width: "100%",
  display: "flex",
  alignItems: "flex-start",
  gap: varsThemeBase.sizes["2,5"],
});

const header__title = style({
  display: "flex",
  flexDirection: "column",
  gap: varsThemeBase.sizes[1],
});

const body = style({
  width: "100%",
  cursor: "pointer",
  display: "flex",
  backgroundColor: varsThemeBase.colors.neutral.surface,
  boxSizing: "border-box",
  padding: varsThemeBase.sizes[4],
  paddingTop: 0,
  fontFamily: varsThemeBase.fontFamily.centranube,
});

export const styles = {
  header,
  header__content,
  header__description,
  header__title,
  header_active,
  body,
};

/* -------------------------------------------------------------------------------------------------
 * Sprinkles
 * -----------------------------------------------------------------------------------------------*/

const border = {
  none: "none",
  base: `1px solid ${baseColors["neutral.surfaceHighlight"]}`,
};

const properties = {
  borderTop: border,
  borderBottom: border,
};

const sprinkle = createSprinkles(
  defineProperties({
    properties,
  })
);

export const accordionSprinkle = {
  sprinkle,
  properties,
};

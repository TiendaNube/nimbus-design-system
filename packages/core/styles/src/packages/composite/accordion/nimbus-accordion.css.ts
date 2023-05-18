import { style } from "@vanilla-extract/css";
import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { baseColors } from "../../../properties";
import { varsThemeBase } from "../../../themes";

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

const header = style({
  width: "100%",
  cursor: "pointer",
  backgroundColor: varsThemeBase.colors.neutral.background,
  padding: varsThemeBase.spacing[4],
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
  gap: varsThemeBase.spacing["2-5"],
});

const header__title = style({
  display: "flex",
  flexDirection: "column",
  gap: varsThemeBase.spacing[1],
});

const body = style({
  width: "100%",
  cursor: "pointer",
  display: "flex",
  backgroundColor: varsThemeBase.colors.neutral.surface,
  boxSizing: "border-box",
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
 * Sprinkle
 * -----------------------------------------------------------------------------------------------*/

const border = {
  none: "none",
  base: `1px solid ${baseColors["neutral-surfaceHighlight"]}`,
};

const padding = {
  none: "none",
  base: `0px ${varsThemeBase.spacing[4]} ${varsThemeBase.spacing[4]} ${varsThemeBase.spacing[4]}`,
};

const properties = {
  borderTop: border,
  borderBottom: border,
  padding,
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

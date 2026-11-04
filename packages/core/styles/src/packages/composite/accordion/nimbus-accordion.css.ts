import { style } from "@vanilla-extract/css";
import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { baseColors } from "../../../properties";
import { varsThemeBase } from "../../../themes";

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

/**
 * Inherits the parent's radius (e.g. a Card) so the first and last child, which paint their own
 * background, can follow the rounded corners instead of covering them. Without a rounded parent
 * the inherited radius is 0, so a standalone Accordion is unchanged.
 */
const container = style({
  borderRadius: "inherit",
});

const roundedEdges = {
  "&:first-child": {
    borderTopLeftRadius: "inherit",
    borderTopRightRadius: "inherit",
  },
  "&:last-child": {
    borderBottomLeftRadius: "inherit",
    borderBottomRightRadius: "inherit",
  },
};

const header = style({
  width: "100%",
  cursor: "pointer",
  backgroundColor: varsThemeBase.colors.neutral.background,
  padding: varsThemeBase.spacing[4],
  border: "none",
  selectors: roundedEdges,
});

const header_static = style({
  width: "100%",
  cursor: "default",
  backgroundColor: varsThemeBase.colors.neutral.background,
  padding: varsThemeBase.spacing[4],
  border: "none",
  boxSizing: "border-box",
  selectors: roundedEdges,
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
  fontFamily: varsThemeBase.fontFamily.sans,
  selectors: roundedEdges,
});

export const styles = {
  container,
  header,
  header_static,
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

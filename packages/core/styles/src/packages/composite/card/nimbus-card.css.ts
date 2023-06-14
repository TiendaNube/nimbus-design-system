import { style } from "@vanilla-extract/css";
import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import {
  backgroundColorProperties,
  paddingProperties,
} from "../../../properties";
import { varsThemeBase } from "../../../themes";

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

const container = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minHeight: "1.5rem",
  justifyContent: "center",
  gap: varsThemeBase.spacing[4],
  borderRadius: varsThemeBase.shape.border.radius[2],
  boxShadow: varsThemeBase.shadow.level[2],
  boxSizing: "border-box",
  overflow: "hidden",
});

const container__footer = style({
  display: "flex",
  gap: varsThemeBase.spacing[2],
});

export const styles = {
  container,
  container__footer,
};

/* -------------------------------------------------------------------------------------------------
 * Sprinkle
 * -----------------------------------------------------------------------------------------------*/

const cardBackgroundColorProperties = {
  "primary-surface": backgroundColorProperties["primary-surface"],
  "primary-surfaceHighlight":
    backgroundColorProperties["primary-surfaceHighlight"],
  "success-surface": backgroundColorProperties["success-surface"],
  "success-surfaceHighlight":
    backgroundColorProperties["success-surfaceHighlight"],
  "danger-surface": backgroundColorProperties["danger-surface"],
  "danger-surfaceHighlight":
    backgroundColorProperties["danger-surfaceHighlight"],
  "warning-surface": backgroundColorProperties["warning-surface"],
  "warning-surfaceHighlight":
    backgroundColorProperties["warning-surfaceHighlight"],
  "neutral-background": backgroundColorProperties["neutral-background"],
  "neutral-surface": backgroundColorProperties["neutral-surface"],
  "neutral-surfaceHighlight":
    backgroundColorProperties["neutral-surfaceHighlight"],
};

const cardProperties = {
  backgroundColor: cardBackgroundColorProperties,
  padding: paddingProperties,
};

export const cardSprinkle = {
  sprinkle: createSprinkles(
    defineProperties({
      properties: cardProperties,
    })
  ),
  properties: cardProperties,
};

const cardHeaderProperties = {
  padding: {
    base: `${varsThemeBase.spacing[4]} ${varsThemeBase.spacing[4]} 0 ${varsThemeBase.spacing[4]}`,
    small: `${varsThemeBase.spacing[2]} ${varsThemeBase.spacing[2]} 0 ${varsThemeBase.spacing[2]}`,
    none: "0",
  },
};

export const cardHeaderSprinkle = {
  sprinkle: createSprinkles(
    defineProperties({
      properties: cardHeaderProperties,
    })
  ),
  properties: cardHeaderProperties,
};

const cardBodyProperties = {
  padding: {
    base: `0 ${varsThemeBase.spacing[4]}`,
    small: `0 ${varsThemeBase.spacing[2]}`,
    none: "0",
  },
};

export const cardBodySprinkle = {
  sprinkle: createSprinkles(
    defineProperties({
      properties: cardBodyProperties,
    })
  ),
  properties: cardBodyProperties,
};

const cardFooterProperties = {
  padding: {
    base: `0 ${varsThemeBase.spacing[4]} ${varsThemeBase.spacing[4]} ${varsThemeBase.spacing[4]}`,
    small: `0 ${varsThemeBase.spacing[2]} ${varsThemeBase.spacing[2]} ${varsThemeBase.spacing[2]}`,
    none: "0",
  },
};

export const cardFooterSprinkle = {
  sprinkle: createSprinkles(
    defineProperties({
      properties: cardFooterProperties,
    })
  ),
  properties: cardFooterProperties,
};

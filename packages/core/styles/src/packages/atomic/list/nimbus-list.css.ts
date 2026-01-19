import { style as vanillaStyle, createVar } from "@vanilla-extract/css";
import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

import { varsThemeBase } from "../../../themes";

/* -------------------------------------------------------------------------------------------------
 * CSS Variables
 * -----------------------------------------------------------------------------------------------*/

export const paddingInlineStart = createVar();

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

export const container = vanillaStyle({
  display: "flex",
  flexDirection: "column",
  margin: "0",
  gap: varsThemeBase.spacing[1],
  paddingInlineStart,
});

export const container__item = vanillaStyle({
  lineHeight: varsThemeBase.lineWeight.body.base,
  fontSize: varsThemeBase.fontSize.body.base,
  fontFamily: varsThemeBase.fontFamily.sans,
  color: varsThemeBase.colors.neutral.textLow,
  position: "relative",
  selectors: {
    "&::marker": {
      color: varsThemeBase.colors.neutral.surfaceHighlight,
    },
  },
});

export const skeleton = vanillaStyle({
  display: "flex",
  flexDirection: "column",
  gap: varsThemeBase.spacing[1],
});

export const styles = {
  container,
  container__item,
  skeleton,
};

/* -------------------------------------------------------------------------------------------------
 * Sprinkle
 * -----------------------------------------------------------------------------------------------*/

const listPaddingProperties = {
  "0-5": varsThemeBase.spacing["0-5"],
  "1": varsThemeBase.spacing[1],
  "2": varsThemeBase.spacing[2],
  "3": varsThemeBase.spacing[3],
  "4": varsThemeBase.spacing[4],
  "5": varsThemeBase.spacing[5],
  "6": varsThemeBase.spacing[6],
  "7": varsThemeBase.spacing[7],
  "8": varsThemeBase.spacing[8],
};

const properties = {
  padding: listPaddingProperties,
};

const sprinkle = createSprinkles(
  defineProperties({
    properties: {
      padding: listPaddingProperties,
    },
  })
);

export const listSprinkle = {
  sprinkle,
  properties,
};

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

const properties = {
  backgroundColor: cardBackgroundColorProperties,
  padding: paddingProperties,
};

const sprinkle = createSprinkles(
  defineProperties({
    properties,
  })
);

export const cardSprinkle = {
  sprinkle,
  properties,
};

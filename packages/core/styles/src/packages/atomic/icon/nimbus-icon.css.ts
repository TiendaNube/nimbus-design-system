import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { style } from "@vanilla-extract/css";
import { cursorProperties, colorProperties } from "../../../properties";

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

const base = style({
  display: "flex",
  alignItems: "center",
});

export const styles = {
  base,
};

/* -------------------------------------------------------------------------------------------------
 * Sprinkle
 * -----------------------------------------------------------------------------------------------*/

const iconColorProperties = {
  currentColor: "currentColor",
  "primary-surface": colorProperties["primary-surface"],
  "primary-interactive": colorProperties["primary-interactive"],
  "primary-textLow": colorProperties["primary-textLow"],
  "primary-textHigh": colorProperties["primary-textHigh"],

  "success-surface": colorProperties["success-surface"],
  "success-interactive": colorProperties["success-textLow"],
  "success-textLow": colorProperties["success-textLow"],
  "success-textHigh": colorProperties["success-textHigh"],

  "warning-surface": colorProperties["warning-surface"],
  "warning-interactive": colorProperties["warning-interactive"],
  "warning-textLow": colorProperties["warning-textLow"],
  "warning-textHigh": colorProperties["warning-textHigh"],

  "danger-surface": colorProperties["danger-surface"],
  "danger-interactive": colorProperties["danger-interactive"],
  "danger-textLow": colorProperties["danger-textLow"],
  "danger-textHigh": colorProperties["danger-textHigh"],

  "neutral-background": colorProperties["neutral-background"],
  "neutral-surface": colorProperties["neutral-surface"],
  "neutral-interactive": colorProperties["neutral-interactive"],
  "neutral-textLow": colorProperties["neutral-textLow"],
  "neutral-textDisabled": colorProperties["neutral-textDisabled"],
  "neutral-textHigh": colorProperties["neutral-textHigh"],
  "ai-gradientPurpleHigh": colorProperties["ai-gradientPurpleHigh"],

  // This color will be overwritten by the Icon SVG gradient processor
  "ai-generative": "currentColor",
};

const properties = {
  color: iconColorProperties,
  cursor: cursorProperties,
};

const sprinkle = createSprinkles(
  defineProperties({
    properties,
  })
);

export const iconSprinkle = {
  sprinkle,
  properties,
};

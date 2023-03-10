import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { style, globalStyle, keyframes } from "@vanilla-extract/css";
import { vars } from "../../../utils";
import { colorProperties } from "../../../properties";

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

const rotateAnimation = keyframes({
  "100%": {
    transform: "rotate(360deg)",
  },
});

const dashAnimation = keyframes({
  "0%": {
    strokeDasharray: "1, 150",
    strokeDashoffset: "0",
  },
  "50%": {
    strokeDasharray: "90, 150",
    strokeDashoffset: "-35",
  },
  "100%": {
    strokeDasharray: "90, 150",
    strokeDashoffset: "-124",
  },
});

const base = style({
  animation: `${rotateAnimation} 2s linear infinite`,
  width: vars.width,
  height: vars.height,
});

globalStyle(`${base} circle`, {
  stroke: "currentcolor",
  animation: `${dashAnimation} 1.5s ease-in-out infinite`,
});

export const styles = {
  base,
};

/* -------------------------------------------------------------------------------------------------
 * Sprinkle
 * -----------------------------------------------------------------------------------------------*/

const spinnerColorProperties = {
  currentColor: "currentColor",
  "primary-surface": colorProperties["primary-surface"],
  "primary-interactive": colorProperties["primary-interactive"],
  "primary-textLow": colorProperties["primary-textLow"],

  "success-surface": colorProperties["success-surface"],
  "success-interactive": colorProperties["success-textLow"],
  "success-textLow": colorProperties["success-textLow"],

  "danger-surface": colorProperties["danger-surface"],
  "danger-interactive": colorProperties["danger-interactive"],
  "danger-textLow": colorProperties["danger-textLow"],

  "neutral-background": colorProperties["neutral-background"],
  "neutral-surface": colorProperties["neutral-surface"],
  "neutral-interactive": colorProperties["neutral-interactive"],
  "neutral-textLow": colorProperties["neutral-textLow"],
};

const properties = {
  color: spinnerColorProperties,
};

const sprinkle = createSprinkles(
  defineProperties({
    properties,
  })
);

export const spinnerSprinkle = {
  sprinkle,
  properties,
};

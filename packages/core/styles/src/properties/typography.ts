import { colorProperties } from "./css";

/**
 * Colors available for the typographic components (Text and Title).
 * ⚠️ Shared by BOTH components: any change here affects the two of them.
 */
export const typographyColorProperties = {
  currentColor: "currentColor",

  "primary-surface": colorProperties["primary-surface"],
  "primary-interactive": colorProperties["primary-interactive"],
  "primary-textLow": colorProperties["primary-textLow"],
  "primary-textHigh": colorProperties["primary-textHigh"],

  "success-surface": colorProperties["success-surface"],
  "success-interactive": colorProperties["success-textLow"],
  "success-interactivePressed": colorProperties["success-interactivePressed"],
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
  "neutral-textDisabled": colorProperties["neutral-textDisabled"],
  "neutral-textLow": colorProperties["neutral-textLow"],
  "neutral-textHigh": colorProperties["neutral-textHigh"],
};

/**
 * Gradient color, exclusive to Text
 */
export const typographyAiColors = {
  "ai-generative": "transparent",
} as const;

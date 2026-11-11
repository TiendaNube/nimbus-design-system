import { style, styleVariants } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";

const baseDot = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  width: varsThemeBase.spacing["2"],
  height: varsThemeBase.spacing["2"],

  boxSizing: "border-box",
  borderRadius: varsThemeBase.shape.border.radius.full,
});

export const dot = styleVariants({
  primary: [
    baseDot,
    { backgroundColor: varsThemeBase.components.badge.dot.primary.background },
  ],
  success: [
    baseDot,
    { backgroundColor: varsThemeBase.components.badge.dot.success.background },
  ],
  warning: [
    baseDot,
    { backgroundColor: varsThemeBase.components.badge.dot.warning.background },
  ],
  danger: [
    baseDot,
    { backgroundColor: varsThemeBase.components.badge.dot.danger.background },
  ],
  neutral: [
    baseDot,
    { backgroundColor: varsThemeBase.components.badge.dot.neutral.background },
  ],
  "ai-generative": [
    baseDot,
    {
      backgroundColor:
        varsThemeBase.components.badge.dot.aiGenerative.background,
    },
  ],
});

const base = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  width: "fit-content",
  minWidth: varsThemeBase.spacing["4"],

  padding: `0 ${varsThemeBase.spacing[1]}`,
  boxSizing: "border-box",
  borderRadius: varsThemeBase.shape.border.radius["1"],

  lineHeight: varsThemeBase.lineWeight.body.caption,
  fontSize: varsThemeBase.fontSize.body.caption,
  fontFamily: varsThemeBase.fontFamily.sans,
});

export const surface = styleVariants({
  primary: [
    base,
    {
      backgroundColor:
        varsThemeBase.components.badge.surface.primary.background,
      color: varsThemeBase.components.badge.surface.primary.color,
    },
  ],
  success: [
    base,
    {
      backgroundColor:
        varsThemeBase.components.badge.surface.success.background,
      color: varsThemeBase.components.badge.surface.success.color,
    },
  ],
  warning: [
    base,
    {
      backgroundColor:
        varsThemeBase.components.badge.surface.warning.background,
      color: varsThemeBase.components.badge.surface.warning.color,
    },
  ],
  danger: [
    base,
    {
      backgroundColor: varsThemeBase.components.badge.surface.danger.background,
      color: varsThemeBase.components.badge.surface.danger.color,
    },
  ],
  neutral: [
    base,
    {
      backgroundColor:
        varsThemeBase.components.badge.surface.neutral.background,
      color: varsThemeBase.components.badge.surface.neutral.color,
    },
  ],
  "ai-generative": [
    base,
    {
      backgroundColor:
        varsThemeBase.components.badge.surface.aiGenerative.background,
      color: varsThemeBase.components.badge.surface.aiGenerative.color,
    },
  ],
});

export const light = styleVariants({
  primary: [
    base,
    {
      backgroundColor: varsThemeBase.components.badge.light.primary.background,
      color: varsThemeBase.components.badge.light.primary.color,
    },
  ],
  success: [
    base,
    {
      backgroundColor: varsThemeBase.components.badge.light.success.background,
      color: varsThemeBase.components.badge.light.success.color,
    },
  ],
  warning: [
    base,
    {
      backgroundColor: varsThemeBase.components.badge.light.warning.background,
      color: varsThemeBase.components.badge.light.warning.color,
    },
  ],
  danger: [
    base,
    {
      backgroundColor: varsThemeBase.components.badge.light.danger.background,
      color: varsThemeBase.components.badge.light.danger.color,
    },
  ],
  neutral: [
    base,
    {
      backgroundColor: varsThemeBase.components.badge.light.neutral.background,
      color: varsThemeBase.components.badge.light.neutral.color,
    },
  ],
  "ai-generative": [
    base,
    {
      backgroundColor:
        varsThemeBase.components.badge.light.aiGenerative.background,
      color: varsThemeBase.components.badge.light.aiGenerative.color,
    },
  ],
});

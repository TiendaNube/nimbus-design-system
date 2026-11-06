import { style as vanillaStyle, styleVariants } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";

const { neutral, aiGenerative } = varsThemeBase.components.chip;

export const base = vanillaStyle({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "default",

  padding: `${varsThemeBase.spacing[1]} ${varsThemeBase.spacing[2]}`,
  gap: varsThemeBase.spacing[1],
  height: "1.5rem",
  width: "fit-content",
  boxSizing: "border-box",

  lineHeight: varsThemeBase.lineWeight.body.caption,
  fontSize: varsThemeBase.fontSize.body.caption,
  fontFamily: varsThemeBase.fontFamily.sans,
  background: neutral.background,
  color: neutral.color,

  borderStyle: "solid",
  borderRadius: varsThemeBase.components.chip.borderRadius,
  borderWidth: varsThemeBase.shape.border.width[1],
  borderColor: neutral.borderColor,
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,

  ":hover": {
    background: neutral.hover.background,
    borderColor: neutral.hover.borderColor,
  },
  ":focus": {
    borderColor: neutral.focus.borderColor,
    boxShadow: neutral.focus.boxShadow,
  },
  ":active": {
    background: neutral.pressed.background,
    borderColor: neutral.pressed.borderColor,
  },
});

export const chip_close_icon_container = vanillaStyle({
  background: "transparent",
  border: "none",
  padding: 0,
  fontSize: 0,
  cursor: "pointer",
});

const appearance = styleVariants({
  "ai-generative": [
    base,
    {
      transition: `box-shadow ${varsThemeBase.motion.speed.fast} ease`,
      color: aiGenerative.color,
      background: [varsThemeBase.colors.neutral.surface, aiGenerative.background],
      borderColor: "transparent",
      ":hover": {
        background: [
          varsThemeBase.colors.neutral.surface,
          aiGenerative.hover.background,
        ],
        borderColor: "transparent",
      },
      ":active": {
        background: [
          varsThemeBase.colors.aiGenerative.surfaceHighlight,
          aiGenerative.pressed.background,
        ],
        borderColor: "transparent",
      },
    },
  ],
});

export const aiGenerated = vanillaStyle([
  appearance["ai-generative"],
  {
    boxShadow: aiGenerative.boxShadow,
    ":focus": {
      borderColor: aiGenerative.focus.borderColor,
      boxShadow: aiGenerative.focus.boxShadow,
    },
  },
]);

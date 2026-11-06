import { style, styleVariants } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";

const base = style({
  margin: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "fit-content",
  height: "1.25rem",
  boxSizing: "border-box",
  gap: varsThemeBase.spacing[1],
  padding: `${varsThemeBase.spacing["0-5"]} ${varsThemeBase.spacing[2]}`,
  borderStyle: "solid",
  borderWidth: varsThemeBase.shape.border.width[1],
  borderRadius: varsThemeBase.shape.border.radius.full,
  lineHeight: varsThemeBase.lineWeight.body.caption,
  fontSize: varsThemeBase.fontSize.body.caption,
  fontFamily: varsThemeBase.fontFamily.sans,
});

export const appearance = styleVariants({
  primary: [
    base,
    {
      color: varsThemeBase.colors.primary.textLow,
      backgroundColor: varsThemeBase.components.tag.primary.background,
      borderColor: varsThemeBase.components.tag.primary.borderColor,
    },
  ],
  success: [
    base,
    {
      color: varsThemeBase.colors.success.textLow,
      backgroundColor: varsThemeBase.components.tag.success.background,
      borderColor: varsThemeBase.components.tag.success.borderColor,
    },
  ],
  warning: [
    base,
    {
      color: varsThemeBase.colors.warning.textLow,
      backgroundColor: varsThemeBase.components.tag.warning.background,
      borderColor: varsThemeBase.components.tag.warning.borderColor,
    },
  ],
  danger: [
    base,
    {
      color: varsThemeBase.colors.danger.textLow,
      backgroundColor: varsThemeBase.components.tag.danger.background,
      borderColor: varsThemeBase.components.tag.danger.borderColor,
    },
  ],
  neutral: [
    base,
    {
      color: varsThemeBase.colors.neutral.textHigh,
      backgroundColor: varsThemeBase.components.tag.neutral.background,
      borderColor: varsThemeBase.components.tag.neutral.borderColor,
    },
  ],
  "ai-generative": [
    base,
    {
      color: varsThemeBase.components.tag.aiGenerative.color,
      background: [
        varsThemeBase.colors.neutral.surface,
        varsThemeBase.components.tag.aiGenerative.background,
      ],
      borderColor: varsThemeBase.components.tag.aiGenerative.borderColor,
    },
  ],
});

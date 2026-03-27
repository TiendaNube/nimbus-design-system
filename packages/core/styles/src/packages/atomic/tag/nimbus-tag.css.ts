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
  border: "none",
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
      backgroundColor: varsThemeBase.colors.primary.surfaceDisabled,
    },
  ],
  success: [
    base,
    {
      color: varsThemeBase.colors.success.textLow,
      backgroundColor: varsThemeBase.colors.success.surfaceDisabled,
    },
  ],
  warning: [
    base,
    {
      color: varsThemeBase.colors.warning.textLow,
      backgroundColor: varsThemeBase.colors.warning.surfaceDisabled,
    },
  ],
  danger: [
    base,
    {
      color: varsThemeBase.colors.danger.textLow,
      backgroundColor: varsThemeBase.colors.danger.surfaceDisabled,
    },
  ],
  neutral: [
    base,
    {
      color: varsThemeBase.colors.neutral.textHigh,
      backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
    },
  ],
  "ai-generative": [
    base,
    {
      color: varsThemeBase.colors.aiGenerative.textHigh,
      backgroundColor: varsThemeBase.colors.aiGenerative.surface,
    },
  ],
});

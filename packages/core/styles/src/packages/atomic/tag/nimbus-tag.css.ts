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
  padding: `${varsThemeBase.spacing["0,5"]} ${varsThemeBase.spacing[2]}`,
  borderStyle: "solid",
  borderWidth: varsThemeBase.shape.border.width[1],
  borderRadius: varsThemeBase.shape.border.radius.full,
  lineHeight: varsThemeBase.lineWeight.body.caption,
  fontSize: varsThemeBase.fontSize.body.caption,
  fontFamily: varsThemeBase.fontFamily.centranube,
});

export const appearance = styleVariants({
  primary: [
    base,
    {
      color: varsThemeBase.colors.primary.textLow,
      backgroundColor: varsThemeBase.colors.primary.surface,
      borderColor: varsThemeBase.colors.primary.surfaceHighlight,
    },
  ],
  success: [
    base,
    {
      color: varsThemeBase.colors.success.textLow,
      backgroundColor: varsThemeBase.colors.success.surface,
      borderColor: varsThemeBase.colors.success.surfaceHighlight,
    },
  ],
  warning: [
    base,
    {
      color: varsThemeBase.colors.warning.textLow,
      backgroundColor: varsThemeBase.colors.warning.surface,
      borderColor: varsThemeBase.colors.warning.surfaceHighlight,
    },
  ],
  danger: [
    base,
    {
      color: varsThemeBase.colors.danger.textLow,
      backgroundColor: varsThemeBase.colors.danger.surface,
      borderColor: varsThemeBase.colors.danger.surfaceHighlight,
    },
  ],
  neutral: [
    base,
    {
      color: varsThemeBase.colors.neutral.textLow,
      backgroundColor: varsThemeBase.colors.neutral.surface,
      borderColor: varsThemeBase.colors.neutral.surfaceHighlight,
    },
  ],
});

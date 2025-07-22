import { style, styleVariants } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";
import { gradients } from "../../../gradients";

const base = style({
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "0.5rem", 
  borderRadius: varsThemeBase.shape.border.radius.full,
  backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
  overflow: "hidden",
  position: "relative",
});

const fill = style({
  height: "100%",
  borderRadius: varsThemeBase.shape.border.radius.full,
  transition: `width ${varsThemeBase.motion.speed.slow} ease`,
  minWidth: "0.5rem", 
});

export const container = base;

export const appearance = styleVariants({
  primary: [
    fill,
    {
      backgroundColor: varsThemeBase.colors.primary.interactive,
    },
  ],
  success: [
    fill,
    {
      backgroundColor: varsThemeBase.colors.success.interactive,
    },
  ],
  warning: [
    fill,
    {
      backgroundColor: varsThemeBase.colors.warning.interactive,
    },
  ],
  danger: [
    fill,
    {
      backgroundColor: varsThemeBase.colors.danger.interactive,
    },
  ],
  neutral: [
    fill,
    {
      backgroundColor: varsThemeBase.colors.neutral.interactive,
    },
  ],
  "ai-gradient": [
    fill,
    {
      backgroundImage: gradients.aiGradient,
    },
  ],
}); 

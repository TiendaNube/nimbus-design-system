import { createVar, style, styleVariants } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";
import { gradients } from "../../../gradients";

export const fillColorVar = createVar();

const base = style({
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "0.5rem", // 8px
  borderRadius: varsThemeBase.shape.border.radius.full,
  overflow: "hidden",
  position: "relative",
});

export const containerNoOverflow = style({
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "0.5rem", // 8px
  borderRadius: varsThemeBase.shape.border.radius.full,
  position: "relative",
});

const fill = style({
  height: "100%",
  borderRadius: varsThemeBase.shape.border.radius.full,
  transition: `width ${varsThemeBase.motion.speed.slow} ease`,
  minWidth: "0.5rem",
});

export const container = base;

export const backgroundColor = styleVariants({
  "neutral-surfaceDisabled": {
    backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
  },
  "neutral-background": {
    backgroundColor: varsThemeBase.colors.neutral.background,
  },
});

export const appearance = styleVariants({
  primary: [
    fill,
    {
      backgroundColor: varsThemeBase.colors.primary.interactive,
      vars: { [fillColorVar]: varsThemeBase.colors.primary.interactive },
    },
  ],
  success: [
    fill,
    {
      backgroundColor: varsThemeBase.colors.success.interactive,
      vars: { [fillColorVar]: varsThemeBase.colors.success.interactive },
    },
  ],
  warning: [
    fill,
    {
      backgroundColor: varsThemeBase.colors.warning.interactive,
      vars: { [fillColorVar]: varsThemeBase.colors.warning.interactive },
    },
  ],
  danger: [
    fill,
    {
      backgroundColor: varsThemeBase.colors.danger.interactive,
      vars: { [fillColorVar]: varsThemeBase.colors.danger.interactive },
    },
  ],
  neutral: [
    fill,
    {
      backgroundColor: varsThemeBase.colors.neutral.interactive,
      vars: { [fillColorVar]: varsThemeBase.colors.neutral.interactive },
    },
  ],
  "ai-generative": [
    fill,
    {
      backgroundImage: gradients.aiGenerativeInteractive,
      vars: { [fillColorVar]: varsThemeBase.colors.primary.interactive },
    },
  ],
});

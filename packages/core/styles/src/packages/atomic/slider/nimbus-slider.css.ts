import { style, styleVariants } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";

const baseTrack = style({
  position: "relative",
  width: "100%",
  height: "0.5rem",
  borderRadius: varsThemeBase.shape.border.radius.full,
  backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
});

const baseFill = style({
  position: "absolute",
  height: "100%",
  borderRadius: varsThemeBase.shape.border.radius.full,
  transition: `left ${varsThemeBase.motion.speed.fast} ease`,
});

const baseThumb = style({
  position: "absolute",
  width: "1rem",
  height: "1rem",
  borderRadius: varsThemeBase.shape.border.radius.full,
  backgroundColor: varsThemeBase.colors.primary.interactive,
  border: "none",
  cursor: "pointer",
  transform: "translateX(-50%)",
  top: "-0.25rem",
  transition: `box-shadow ${varsThemeBase.motion.speed.fast} ease`,
  zIndex: 2,
  ":hover": {
    boxShadow: `0 0 0 4px ${varsThemeBase.colors.primary.surface}`,
  },
  ":focus": {
    outline: "none",
    boxShadow: varsThemeBase.utils.focus,
  },
  ":active": {
    boxShadow: `0 0 0 6px ${varsThemeBase.colors.primary.surface}`,
  },
});

const thumbDisabled = style({
  backgroundColor: varsThemeBase.colors.neutral.textDisabled,
  cursor: "not-allowed",
  ":hover": {
    boxShadow: "none",
  },
  ":focus": {
    outline: "none",
    boxShadow: "none",
  },
  ":active": {
    boxShadow: "none",
  },
});

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: varsThemeBase.spacing[2],
  width: "100%",
});

export const trackContainer = style({
  position: "relative",
  width: "100%",
  paddingTop: varsThemeBase.spacing[2],
  paddingBottom: varsThemeBase.spacing[2],
});

export const track = baseTrack;

export const fill = styleVariants({
  primary: [
    baseFill,
    {
      backgroundColor: varsThemeBase.colors.primary.interactive,
    },
  ],
  success: [
    baseFill,
    {
      backgroundColor: varsThemeBase.colors.success.interactive,
    },
  ],
  warning: [
    baseFill,
    {
      backgroundColor: varsThemeBase.colors.warning.interactive,
    },
  ],
  danger: [
    baseFill,
    {
      backgroundColor: varsThemeBase.colors.danger.interactive,
    },
  ],
  neutral: [
    baseFill,
    {
      backgroundColor: varsThemeBase.colors.neutral.interactive,
    },
  ],
});

export const thumb = baseThumb;
export const thumb_disabled = thumbDisabled;

export const inputsContainer = style({
  display: "flex",
  alignItems: "flex-end",
  gap: varsThemeBase.spacing[2],
  width: "100%",
});

export const inputWrapper = style({
  flex: 1,
});

export const inputSeparator = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "2rem",
  color: varsThemeBase.colors.neutral.textLow,
  fontSize: varsThemeBase.fontSize.body.base,
  fontFamily: varsThemeBase.fontFamily.sans,
});

export const rangeLabels = style({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  color: varsThemeBase.colors.neutral.textLow,
  fontSize: varsThemeBase.fontSize.body.caption,
  fontFamily: varsThemeBase.fontFamily.sans,
});

import { style, styleVariants } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";

// Named constants for slider dimensions using theme tokens
const TRACK_HEIGHT = varsThemeBase.spacing[2]; // 0.5rem (8px)
const THUMB_SIZE = varsThemeBase.spacing[4]; // 1rem (16px)
const THUMB_OFFSET = varsThemeBase.spacing[1]; // 0.25rem (4px) - used as negative offset
const INPUT_SEPARATOR_HEIGHT = varsThemeBase.spacing[8]; // 2rem (32px)

const baseTrack = style({
  position: "relative",
  width: "100%",
  height: TRACK_HEIGHT,
  borderRadius: varsThemeBase.shape.border.radius.full,
  backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
});

const baseFill = style({
  position: "absolute",
  height: "100%",
  borderRadius: varsThemeBase.shape.border.radius.full,
  transition: `left ${varsThemeBase.motion.speed.fast} ease`,
});

export const thumbWrapper = style({
  position: "absolute",
  transform: "translateX(-50%)",
  top: `calc(-1 * ${THUMB_OFFSET})`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  zIndex: 2,
});

const baseThumb = style({
  width: THUMB_SIZE,
  height: THUMB_SIZE,
  borderRadius: varsThemeBase.shape.border.radius.full,
  backgroundColor: varsThemeBase.colors.primary.interactive,
  border: "none",
  cursor: "pointer",
  transition: `box-shadow ${varsThemeBase.motion.speed.fast} ease`,
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

export const thumbValue = style({
  marginTop: varsThemeBase.spacing[1],
  fontSize: varsThemeBase.fontSize.body.caption,
  fontWeight: varsThemeBase.fontWeight.medium,
  color: varsThemeBase.colors.primary.interactive,
  fontFamily: varsThemeBase.fontFamily.sans,
  whiteSpace: "nowrap",
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
  paddingBottom: varsThemeBase.spacing[4],
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
  minHeight: INPUT_SEPARATOR_HEIGHT,
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

export const sliderRow = style({
  display: "flex",
  alignItems: "center",
  gap: varsThemeBase.spacing[3],
  width: "100%",
});

export const labelContainer = style({
  marginBottom: varsThemeBase.spacing[1],
});

export const label = style({
  fontSize: varsThemeBase.fontSize.body.caption,
  color: varsThemeBase.colors.neutral.textLow,
  fontFamily: varsThemeBase.fontFamily.sans,
});

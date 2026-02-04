import { style, styleVariants, createVar } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";

export const fillLeftVar = createVar();
export const fillRightVar = createVar();
export const thumbLeftVar = createVar();

const baseTrack = style({
  position: "relative",
  width: "100%",
  height: varsThemeBase.spacing[1],
  borderRadius: varsThemeBase.shape.border.radius.full,
});

const baseFill = style({
  position: "absolute",
  height: "100%",
  borderRadius: varsThemeBase.shape.border.radius.full,
  left: fillLeftVar,
  right: fillRightVar,
});

export const thumbWrapper = style({
  position: "absolute",
  transform: "translateX(-50%)",
  top: `calc(-1 * ${varsThemeBase.spacing["1-5"]})`,
  left: thumbLeftVar,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  zIndex: 2,
});

const baseThumb = style({
  width: varsThemeBase.spacing[4],
  height: varsThemeBase.spacing[4],
  borderRadius: varsThemeBase.shape.border.radius.full,
  backgroundColor: varsThemeBase.colors.neutral.background,
  border: `2px solid ${varsThemeBase.colors.primary.interactive}`,
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
  backgroundColor: varsThemeBase.colors.neutral.background,
  border: `2px solid ${varsThemeBase.colors.neutral.surfaceHighlight}`,
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

const fillDisabled = style([
  baseFill,
  {
    backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
  },
]);

export const container = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const trackContainer = style({
  position: "relative",
  width: "100%",
  paddingTop: varsThemeBase.spacing[2],
  paddingBottom: varsThemeBase.spacing[3],
});

export const track = styleVariants({
  default: [
    baseTrack,
    {
      backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
    },
  ],
  disabled: [
    baseTrack,
    {
      backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
      cursor: "not-allowed",
    },
  ],
});

export const track_disabled = track.disabled;
export const fill_disabled = fillDisabled;

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
  minHeight: varsThemeBase.spacing[8],
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

export const labelsContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

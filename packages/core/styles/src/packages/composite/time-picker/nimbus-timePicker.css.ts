import { style, styleVariants, globalStyle } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";

/* -------------------------------------------------------------------------------------------------
 * Style - Panel
 * -----------------------------------------------------------------------------------------------*/

const panel = style({
  display: "flex",
  flexDirection: "row",
  backgroundColor: varsThemeBase.colors.neutral.background,
  borderRadius: varsThemeBase.shape.border.radius[2],
  boxShadow: varsThemeBase.shadow.level[2],
  padding: varsThemeBase.spacing[2],
  gap: varsThemeBase.spacing[2],
  boxSizing: "border-box",
  zIndex: varsThemeBase.zIndex[800],
});

/* -------------------------------------------------------------------------------------------------
 * Style - Column (Scroll Mode)
 * -----------------------------------------------------------------------------------------------*/

const column = style({
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  overflowX: "hidden",
  scrollBehavior: "smooth",
  height: "240px",
  minWidth: "56px",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

const columnLabel = style({
  padding: `${varsThemeBase.spacing[1]} ${varsThemeBase.spacing[2]}`,
  fontFamily: varsThemeBase.fontFamily.sans,
  fontSize: varsThemeBase.fontSize.body.caption,
  fontWeight: varsThemeBase.fontWeight.medium,
  color: varsThemeBase.colors.neutral.textLow,
  backgroundColor: varsThemeBase.colors.neutral.background,
  textAlign: "center",
});

/* -------------------------------------------------------------------------------------------------
 * Style - Option (Time Items)
 * -----------------------------------------------------------------------------------------------*/

const optionBase = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: `${varsThemeBase.spacing[2]} ${varsThemeBase.spacing[3]}`,
  fontFamily: varsThemeBase.fontFamily.sans,
  fontSize: varsThemeBase.fontSize.body.base,
  fontWeight: varsThemeBase.fontWeight.regular,
  lineHeight: varsThemeBase.lineWeight.body.base,
  borderRadius: varsThemeBase.shape.border.radius[1],
  scrollSnapAlign: "center",
  cursor: "pointer",
  transition: `background-color ${varsThemeBase.motion.speed.fast} ease, color ${varsThemeBase.motion.speed.fast} ease`,
  userSelect: "none",
  minHeight: "36px",
  boxSizing: "border-box",
  border: "none",
  outline: "none",
  selectors: {
    "&:focus-visible": {
      boxShadow: varsThemeBase.utils.focus,
    },
  },
});

const optionState = styleVariants({
  default: [
    optionBase,
    {
      backgroundColor: "transparent",
      color: varsThemeBase.colors.neutral.textLow,
      selectors: {
        "&:hover": {
          backgroundColor: varsThemeBase.colors.neutral.surface,
          color: varsThemeBase.colors.neutral.textHigh,
        },
        "&:active": {
          backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
        },
      },
    },
  ],
  current: [
    optionBase,
    {
      backgroundColor: varsThemeBase.colors.primary.surface,
      border: `${varsThemeBase.shape.border.width[1]} solid ${varsThemeBase.colors.primary.surfaceHighlight}`,
      color: varsThemeBase.colors.neutral.textHigh,
      selectors: {
        "&:hover": {
          backgroundColor: varsThemeBase.colors.primary.surfaceHighlight,
        },
      },
    },
  ],
  selected: [
    optionBase,
    {
      backgroundColor: varsThemeBase.colors.primary.interactive,
      color: varsThemeBase.colors.neutral.background,
      fontWeight: varsThemeBase.fontWeight.medium,
      selectors: {
        "&:hover": {
          backgroundColor: varsThemeBase.colors.primary.interactiveHover,
        },
        "&:active": {
          backgroundColor: varsThemeBase.colors.primary.interactivePressed,
        },
      },
    },
  ],
  disabled: [
    optionBase,
    {
      backgroundColor: "transparent",
      color: varsThemeBase.colors.neutral.textDisabled,
      cursor: "not-allowed",
      selectors: {
        "&:hover": {
          backgroundColor: "transparent",
        },
      },
    },
  ],
});

/* -------------------------------------------------------------------------------------------------
 * Style - Dropdown List (Dropdown Mode)
 * -----------------------------------------------------------------------------------------------*/

const dropdownList = style({
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  overflowX: "hidden",
  maxHeight: "280px",
  minWidth: "100px",
  gap: varsThemeBase.spacing["0-5"],
  scrollbarWidth: "thin",
  boxSizing: "border-box",
});

globalStyle(`${dropdownList}::-webkit-scrollbar`, {
  width: "4px",
});

globalStyle(`${dropdownList}::-webkit-scrollbar-track`, {
  background: varsThemeBase.colors.neutral.surface,
  borderRadius: varsThemeBase.shape.border.radius.full,
});

globalStyle(`${dropdownList}::-webkit-scrollbar-thumb`, {
  background: varsThemeBase.colors.neutral.surfaceHighlight,
  borderRadius: varsThemeBase.shape.border.radius.full,
});

/* -------------------------------------------------------------------------------------------------
 * Style - AM/PM Toggle
 * -----------------------------------------------------------------------------------------------*/

const ampmContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: varsThemeBase.spacing[1],
  padding: `${varsThemeBase.spacing[1]} 0`,
});

const ampmButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: `${varsThemeBase.spacing[2]} ${varsThemeBase.spacing[3]}`,
  fontFamily: varsThemeBase.fontFamily.sans,
  fontSize: varsThemeBase.fontSize.body.caption,
  fontWeight: varsThemeBase.fontWeight.medium,
  lineHeight: varsThemeBase.lineWeight.body.caption,
  borderRadius: varsThemeBase.shape.border.radius[1],
  cursor: "pointer",
  transition: `background-color ${varsThemeBase.motion.speed.fast} ease, color ${varsThemeBase.motion.speed.fast} ease`,
  userSelect: "none",
  minWidth: "40px",
  minHeight: "32px",
  boxSizing: "border-box",
  border: "none",
  outline: "none",
  selectors: {
    "&:focus-visible": {
      boxShadow: varsThemeBase.utils.focus,
    },
  },
});

const ampmState = styleVariants({
  default: [
    ampmButton,
    {
      backgroundColor: "transparent",
      color: varsThemeBase.colors.neutral.textLow,
      selectors: {
        "&:hover": {
          backgroundColor: varsThemeBase.colors.neutral.surface,
          color: varsThemeBase.colors.neutral.textHigh,
        },
      },
    },
  ],
  selected: [
    ampmButton,
    {
      backgroundColor: varsThemeBase.colors.primary.interactive,
      color: varsThemeBase.colors.neutral.background,
      selectors: {
        "&:hover": {
          backgroundColor: varsThemeBase.colors.primary.interactiveHover,
        },
      },
    },
  ],
});

/* -------------------------------------------------------------------------------------------------
 * Style - Divider
 * -----------------------------------------------------------------------------------------------*/

const divider = style({
  width: varsThemeBase.shape.border.width[1],
  backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
  alignSelf: "stretch",
  margin: `${varsThemeBase.spacing[2]} 0`,
});

/* -------------------------------------------------------------------------------------------------
 * Style - Gradient Overlays (for scroll indication)
 * -----------------------------------------------------------------------------------------------*/

const gradientOverlay = style({
  position: "absolute",
  left: 0,
  right: 0,
  height: varsThemeBase.spacing[6],
  pointerEvents: "none",
  zIndex: varsThemeBase.zIndex[100],
});

const gradientPosition = styleVariants({
  top: [
    gradientOverlay,
    {
      top: 0,
      background: `linear-gradient(to bottom, ${varsThemeBase.colors.neutral.background}, transparent)`,
    },
  ],
  bottom: [
    gradientOverlay,
    {
      bottom: 0,
      background: `linear-gradient(to top, ${varsThemeBase.colors.neutral.background}, transparent)`,
    },
  ],
});

/* -------------------------------------------------------------------------------------------------
 * Style - Column Wrapper (with gradients)
 * -----------------------------------------------------------------------------------------------*/

const columnWrapper = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
});

/* -------------------------------------------------------------------------------------------------
 * Export
 * -----------------------------------------------------------------------------------------------*/

export const timePickerStyles = {
  classnames: {
    panel,
    column,
    columnLabel,
    columnWrapper,
    optionState,
    dropdownList,
    ampmContainer,
    ampmState,
    divider,
    gradientPosition,
  },
};

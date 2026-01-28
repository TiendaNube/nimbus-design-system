import { style, styleVariants } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";

const PANEL_HEIGHT = "160px";
const ITEM_HEIGHT = varsThemeBase.spacing[8];

/* -------------------------------------------------------------------------------------------------
 * Style - Panel
 * -----------------------------------------------------------------------------------------------*/

const panel = style({
  display: "flex",
  flexDirection: "row",
  backgroundColor: varsThemeBase.colors.neutral.background,
  borderRadius: varsThemeBase.shape.border.radius[2],
  boxShadow: varsThemeBase.shadow.level[3],
  padding: `${varsThemeBase.spacing[1]} ${varsThemeBase.spacing[2]}`,
  gap: varsThemeBase.spacing[1],
  boxSizing: "border-box",
  zIndex: varsThemeBase.zIndex[800],
});

const panelDropdown = style({
  padding: `${varsThemeBase.spacing[1]} 0 ${varsThemeBase.spacing[1]} ${varsThemeBase.spacing[1]}`,
});

/* -------------------------------------------------------------------------------------------------
 * Style - Buttons
 * -----------------------------------------------------------------------------------------------*/

const buttonBase = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: `${varsThemeBase.spacing[2]} ${varsThemeBase.spacing[3]}`,
  fontFamily: varsThemeBase.fontFamily.sans,
  fontSize: varsThemeBase.fontSize.body.base,
  fontWeight: varsThemeBase.fontWeight.regular,
  height: ITEM_HEIGHT,
});

/* -------------------------------------------------------------------------------------------------
 * Style - Column (Scroll Mode)
 * -----------------------------------------------------------------------------------------------*/

const column = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: PANEL_HEIGHT,
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

const optionBase = style([
  buttonBase,
  {
    borderRadius: varsThemeBase.shape.border.radius[1],
    scrollSnapAlign: "center",
    cursor: "pointer",
    transition: `background-color ${varsThemeBase.motion.speed.fast} ease, color ${varsThemeBase.motion.speed.fast} ease`,
    userSelect: "none",
    boxSizing: "border-box",
    border: "none",
    outline: "none",
    selectors: {
      "&:focus-visible": {
        boxShadow: varsThemeBase.utils.focus,
      },
    },
  },
]);

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
      cursor: "default",
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
});

/* -------------------------------------------------------------------------------------------------
 * Style - AM/PM Toggle
 * -----------------------------------------------------------------------------------------------*/

const ampmContainer = style({
  display: "grid",
  gridTemplateRows: `repeat(5, 1fr)`,
  justifyContent: "center",
  height: PANEL_HEIGHT,
});

const amButtonState = styleVariants({
  default: {
    gridRow: 3,
  },
  PM: {
    gridRow: 2,
  },
  AM: {
    gridRow: 3,
  },
});

const pmButtonState = styleVariants({
  default: {
    gridRow: 4,
  },
  PM: {
    gridRow: 3,
  },
  AM: {
    gridRow: 4,
  },
});

/* -------------------------------------------------------------------------------------------------
 * Style - Divider
 * -----------------------------------------------------------------------------------------------*/

const divider = style({
  alignContent: "center",
  ":after": {
    content: ":",
    display: "block",
    margin: `${varsThemeBase.spacing[2]} 0`,
  },
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
  display: "flex",
  flexDirection: "column",
  height: PANEL_HEIGHT,
});

/* -------------------------------------------------------------------------------------------------
 * Style - Dropdown Wrapper
 * -----------------------------------------------------------------------------------------------*/

const dropdownWrapper = style({
  display: "flex",
  flexDirection: "column",
  height: PANEL_HEIGHT,
  minWidth: "100px",
  overflowY: "auto",
});

const dropdownScrollContainer = style({
  display: "flex",
  flexDirection: "row",
  height: PANEL_HEIGHT,
  overflowY: "auto",
  gap: varsThemeBase.spacing[1],
  paddingRight: varsThemeBase.spacing[2],
  scrollbarWidth: "thin",
});

const dropdownAmPmSticky = style({
  position: "sticky",
  top: "50%",
  transform: "translateY(-50%)",
  height: "fit-content",
  alignSelf: "flex-start",
});

/* -------------------------------------------------------------------------------------------------
 * Style - Dropdown Columns Wrapper
 * -----------------------------------------------------------------------------------------------*/

const dropdownColumnsWrapper = style({
  position: "relative",
  display: "flex",
  flex: 1,
});

/* -------------------------------------------------------------------------------------------------
 * Style - Scroll Pane Item Wrapper
 * -----------------------------------------------------------------------------------------------*/

const scrollPaneItemWrapper = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

/* -------------------------------------------------------------------------------------------------
 * Style - Input Cursor
 * -----------------------------------------------------------------------------------------------*/

const inputCursor = styleVariants({
  enabled: {
    cursor: "pointer",
  },
  disabled: {
    cursor: "default",
  },
});

/* -------------------------------------------------------------------------------------------------
 * Export
 * -----------------------------------------------------------------------------------------------*/

export const timePickerStyles = {
  classnames: {
    panel,
    panelDropdown,
    column,
    columnLabel,
    columnWrapper,
    dropdownWrapper,
    dropdownScrollContainer,
    dropdownAmPmSticky,
    dropdownColumnsWrapper,
    scrollPaneItemWrapper,
    inputCursor,
    optionState,
    dropdownList,
    ampmContainer,
    amButtonState,
    pmButtonState,
    divider,
    gradientPosition,
  },
  ITEM_HEIGHT,
};

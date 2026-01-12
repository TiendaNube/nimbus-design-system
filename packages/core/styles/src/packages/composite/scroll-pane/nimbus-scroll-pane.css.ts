import { style, styleVariants, globalStyle } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

const scrollArea = style({
  display: "flex",
  overflow: "hidden",
  scrollBehavior: "smooth",
  boxSizing: "border-box",
  flex: 1,
});

const scrollAreaHidden = style({
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

const direction = styleVariants({
  horizontal: {
    flexDirection: "row",
    overflowX: "auto",
    overflowY: "hidden",
  },
  vertical: {
    flexDirection: "column",
    overflowX: "hidden",
    overflowY: "auto",
  },
});

const gradient = style({
  position: "absolute",
  pointerEvents: "none",
  zIndex: varsThemeBase.zIndex[100],
});

const gradientVariants = styleVariants({
  "horizontal-left": {
    left: 0,
    top: 0,
    bottom: 0,
    width: varsThemeBase.spacing[8],
    background: `linear-gradient(to right, ${varsThemeBase.colors.neutral.background}, transparent)`,
  },
  "horizontal-right": {
    right: 0,
    top: 0,
    bottom: 0,
    width: varsThemeBase.spacing[8],
    background: `linear-gradient(to left, ${varsThemeBase.colors.neutral.background}, transparent)`,
  },
  "vertical-top": {
    top: 0,
    left: 0,
    right: 0,
    height: varsThemeBase.spacing[8],
    background: `linear-gradient(to bottom, ${varsThemeBase.colors.neutral.background}, transparent)`,
  },
  "vertical-bottom": {
    bottom: 0,
    left: 0,
    right: 0,
    height: varsThemeBase.spacing[8],
    background: `linear-gradient(to top, ${varsThemeBase.colors.neutral.background}, transparent)`,
  },
});

const arrow = style({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: varsThemeBase.zIndex[200],
});

const arrowVariants = styleVariants({
  "horizontal-left": {
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
  },
  "horizontal-right": {
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
  },
  "vertical-top": {
    top: varsThemeBase.spacing[2],
    left: "50%",
    transform: "translateX(-50%)",
  },
  "vertical-bottom": {
    bottom: varsThemeBase.spacing[2],
    left: "50%",
    transform: "translateX(-50%)",
  },
});

const item = style({});

globalStyle(`${item} *:focus-visible`, {
  boxShadow: "none",
  border: `${varsThemeBase.shape.border.width[2]} solid ${varsThemeBase.colors.primary.surfaceHighlight}`,
});

export const scrollPaneStyles = {
  classnames: {
    scrollArea,
    scrollAreaHidden,
    direction,
    gradient,
    gradientVariants,
    arrow,
    arrowVariants,
    item,
  },
};

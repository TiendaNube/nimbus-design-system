import { style, globalStyle } from "@vanilla-extract/css";
import {
  createRainbowSprinkles,
  defineProperties as defineRainbowProperties,
} from "rainbow-sprinkles";
import {
  paddingProperties,
  backgroundColorProperties,
} from "../../../properties";
import { mediaQueries, varsThemeBase } from "../../../themes";

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

const container__wrapper = style({
  overflowX: "auto",
  width: "100%",
  paddingBottom: varsThemeBase.spacing["0-5"],
  borderRadius: varsThemeBase.shape.border.radius[2],
  boxShadow: varsThemeBase.shadow.level[2],
});

const container = style({
  backgroundColor: varsThemeBase.colors.neutral.background,
  color: varsThemeBase.colors.neutral.textHigh,
  borderCollapse: "collapse",
  borderSpacing: 0,
  fontFamily: varsThemeBase.fontFamily.sans,
  // 'clip' to maintain border-radius clipping while allowing position:sticky to work on fixed columns.
  overflow: "clip",
  width: "100%",
  tableLayout: "fixed",
});

const container__head = style({
  fontWeight: varsThemeBase.fontWeight.medium,
  fontSize: varsThemeBase.fontSize.body.base,
  lineHeight: varsThemeBase.lineWeight.body.base,
});

const container__body = style({
  fontWeight: varsThemeBase.fontWeight.regular,
  fontSize: varsThemeBase.fontSize.body.base,
  lineHeight: varsThemeBase.lineWeight.body.base,
});

const container__row = style({
  borderColor: varsThemeBase.colors.neutral.surface,
  borderStyle: "solid",
  borderWidth: `${varsThemeBase.shape.border.width[1]} 0 ${varsThemeBase.shape.border.width[1]} 0`,
  transition: `background-color ${varsThemeBase.motion.speed.fast} ease-in-out`,
});

const container__cell = style({
  verticalAlign: "top",
  boxSizing: "content-box",
});

const container__cell_fixed = style({
  position: "sticky",
  zIndex: 30,
  backgroundColor: `var(--nimbus-table-row-bg, ${varsThemeBase.colors.neutral.background})`,
  transition: `background-color ${varsThemeBase.motion.speed.fast} ease-in-out`,
});

globalStyle(`${container__row}:hover ${container__cell_fixed}`, {
  backgroundColor: `var(--nimbus-table-row-bg-hover, var(--nimbus-table-row-bg, ${varsThemeBase.colors.neutral.background}))`,
});

globalStyle(`${container__row}:active ${container__cell_fixed}`, {
  backgroundColor: `var(--nimbus-table-row-bg-active, var(--nimbus-table-row-bg, ${varsThemeBase.colors.neutral.background}))`,
});

/* -------------------------------------------------------------------------------------------------
 * Fixed columns dividers
 * -----------------------------------------------------------------------------------------------*/

const container__cell_fixed_left = style({});
const container__cell_fixed_right = style({});

/**
 * Shadow for left-fixed columns - only visible when content is scrolled underneath.
 * The data-scroll-left attribute is set on the wrapper when scrollLeft > 0.
 */
globalStyle(
  `${container__wrapper}[data-scroll-left] ${container__cell_fixed_left}::after`,
  {
    content: '""',
    position: "absolute",
    top: 0,
    right: "-1px",
    bottom: 0,
    width: "1px",
    backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
    boxShadow: `2px 0 4px 0 ${varsThemeBase.colors.neutral.surfaceHighlight}`,
    pointerEvents: "none",
  }
);

/**
 * Shadow for right-fixed columns - only visible when there is more content to scroll.
 * The data-scroll-right attribute is set on the wrapper when scrollLeft < maxScrollLeft.
 */
globalStyle(
  `${container__wrapper}[data-scroll-right] ${container__cell_fixed_right}::before`,
  {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-1px",
    bottom: 0,
    width: "1px",
    backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
    boxShadow: `-2px 0 4px 0 ${varsThemeBase.colors.neutral.surfaceHighlight}`,
    pointerEvents: "none",
  }
);

globalStyle(`${container} th`, {
  fontWeight: "unset",
  textAlign: "unset",
});

/* -------------------------------------------------------------------------------------------------
 * Sticky Scrollbar
 * -----------------------------------------------------------------------------------------------*/

const container__wrapper_hidden_scrollbar = style({
  scrollbarWidth: "none",
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

const sticky_scrollbar_footer = style({
  position: "sticky",
  bottom: 0,
  left: 0,
  width: "100%",
  zIndex: 40,
  backgroundColor: varsThemeBase.colors.neutral.background,
  boxShadow: `0 -1px 0 0 ${varsThemeBase.colors.neutral.surfaceHighlight}`,
});

const sticky_scrollbar_track = style({
  overflowX: "auto",

  selectors: {
    "&::-webkit-scrollbar": {
      WebkitAppearance: "none",
      width: "1px",
      height: varsThemeBase.spacing["2"],
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: varsThemeBase.shape.border.radius[2],
      backgroundColor: varsThemeBase.colors.neutral.interactive,
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: varsThemeBase.colors.neutral.interactiveHover,
    },
  },
});

const sticky_scrollbar_inner = style({
  height: "1px",
});

export const styles = {
  container__wrapper,
  container__wrapper_hidden_scrollbar,
  container,
  container__head,
  container__body,
  container__row,
  container__cell,
  container__cell_fixed,
  container__cell_fixed_left,
  container__cell_fixed_right,
  sticky_scrollbar_footer,
  sticky_scrollbar_track,
  sticky_scrollbar_inner,
};

/* -------------------------------------------------------------------------------------------------
 * Sprinkle
 * -----------------------------------------------------------------------------------------------*/

const tableRowBackgroundColorProperties = {
  transparent: "transparent",
  "neutral-background": backgroundColorProperties["neutral-background"],
  "neutral-surface": backgroundColorProperties["neutral-surface"],
  "neutral-surfaceHighlight":
    backgroundColorProperties["neutral-surfaceHighlight"],
  "primary-surface": backgroundColorProperties["primary-surface"],
  "primary-surfaceHighlight":
    backgroundColorProperties["primary-surfaceHighlight"],
};

const defineProperties = defineRainbowProperties({
  conditions: {
    xs: {
      "@media": mediaQueries.xs(),
    },
    md: {
      "@media": mediaQueries.md(),
    },
    lg: {
      "@media": mediaQueries.lg(),
    },
    xl: {
      "@media": mediaQueries.xl(),
    },
    rest: {},
    hover: { selector: "&:hover" },
    active: { selector: "&:active" },
    focus: { selector: "&:focus" },
  },
  defaultCondition: "rest",
  staticProperties: {},
  dynamicProperties: {
    width: true,
    maxWidth: true,
    minWidth: true,
    backgroundColor: tableRowBackgroundColorProperties,
    padding: paddingProperties,
  },
});

const sprinkle = createRainbowSprinkles(defineProperties);

const properties = {
  backgroundColor: tableRowBackgroundColorProperties,
  padding: paddingProperties,
};

export const tableSprinkle = {
  sprinkle,
  properties,
};

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
});

const container = style({
  backgroundColor: varsThemeBase.colors.neutral.background,
  borderColor: varsThemeBase.colors.neutral.surface,
  color: varsThemeBase.colors.neutral.textHigh,
  boxShadow: varsThemeBase.shadow.level[2],
  borderCollapse: "collapse",
  borderRadius: varsThemeBase.shape.border.radius[2],
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
  /**
   * Use CSS variable for row background with fallback to table default.
   * This allows fixed cells to match the row's background color when set.
   */
  backgroundColor: `var(--nimbus-table-row-bg, ${varsThemeBase.colors.neutral.background})`,
});

/* -------------------------------------------------------------------------------------------------
 * Fixed columns dividers
 * -----------------------------------------------------------------------------------------------*/

const container__cell_fixed_left = style({});

/**
 * Using ::after ensures the separator stays visible when content scrolls under the fixed column,
 * as it sits on top of the cell content and adjacent cells.
 */
globalStyle(`${container__cell_fixed_left}::after`, {
  content: '""',
  position: "absolute",
  top: 0,
  right: "-1px",
  bottom: 0,
  width: "1px",
  backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
  boxShadow: `2px 0 4px 0 ${varsThemeBase.colors.neutral.surfaceHighlight}`,
  pointerEvents: "none",
});

const container__cell_fixed_right = style({});

globalStyle(`${container__cell_fixed_right}::before`, {
  content: '""',
  position: "absolute",
  top: 0,
  left: "-1px",
  bottom: 0,
  width: "1px",
  backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
  boxShadow: `-2px 0 4px 0 ${varsThemeBase.colors.neutral.surfaceHighlight}`,
  pointerEvents: "none",
});

globalStyle(`${container} th`, {
  fontWeight: "unset",
  textAlign: "unset",
});

export const styles = {
  container__wrapper,
  container,
  container__head,
  container__body,
  container__row,
  container__cell,
  container__cell_fixed,
  container__cell_fixed_left,
  container__cell_fixed_right,
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

import { globalStyle, style } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";
import { thinScrollbarAlways } from "../../../utils/scrollbar.css";
import { chip_close_icon_container } from "../../atomic/chip/nimbus-chip.css";

/** Height of the field, border included: the height of `Input`. */
const FIELD_MIN_HEIGHT = "34px";
/** Height of a plain row, the create row, the back control and the title row. */
const ROW_HEIGHT = "26px";
/** Height of an enriched row and of a result row with a path line. */
const ENRICHED_ROW_HEIGHT = "44px";
/** Width and height of the trailing control. */
const TRAILING_SIZE = "24px";
/** Maximum height of the list before it scrolls. */
const LIST_MAX_HEIGHT = "220px";
/** Maximum height of the list of a hierarchy before it scrolls. */
const LIST_MAX_HEIGHT_HIERARCHICAL = "280px";

/* -------------------------------------------------------------------------------------------------
 * Style - Field
 * -----------------------------------------------------------------------------------------------*/

export const root = style({
  position: "relative",
  width: "100%"
});

/**
 * Layout of the field. The border, background, focus ring and `appearance`
 * colors come from the `Input` container classes it is combined with.
 */
export const field = style({
  boxSizing: "border-box",
  minHeight: FIELD_MIN_HEIGHT,
  paddingRight: varsThemeBase.spacing[1],
  cursor: "text",
  alignItems: "center"
});

export const fieldMultiple = style({
  padding: varsThemeBase.spacing[1],
  alignItems: "center"
});

export const fieldDisabled = style({
  cursor: "not-allowed"
});

export const content = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  flex: "1 1 auto",
  minWidth: 0,
  gap: varsThemeBase.spacing[1]
});

export const inputBox = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  flex: "1 1 auto",
  minWidth: 0
});

export const inputBoxMultiple = style({
  flex: "1 1 48px",
  minWidth: "32px"
});

export const input = style({
  boxSizing: "border-box",
  width: "100%",
  minWidth: 0,
  height: "2rem",
  margin: 0,
  padding: varsThemeBase.spacing[2],
  border: "none",
  outline: "none",
  background: "transparent",
  fontFamily: varsThemeBase.fontFamily.sans,
  fontSize: varsThemeBase.fontSize.body.base,
  fontWeight: varsThemeBase.fontWeight.regular,
  color: varsThemeBase.colors.neutral.textHigh,
  textOverflow: "ellipsis",
  "::placeholder": {
    color: varsThemeBase.colors.neutral.textLow
  },
  ":disabled": {
    color: varsThemeBase.colors.neutral.textDisabled,
    cursor: "not-allowed"
  }
});

export const inputMultiple = style({
  height: "1.5rem",
  padding: 0
});

/** Hides the text of the input while its path is painted over it. */
export const inputPathHidden = style({
  color: "transparent",
  textShadow: "none"
});

/** Path of a selected hierarchical value, painted over the input. */
export const valuePath = style({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  padding: `0 ${varsThemeBase.spacing[2]}`,
  pointerEvents: "none",
  overflow: "hidden",
  fontFamily: varsThemeBase.fontFamily.sans,
  fontSize: varsThemeBase.fontSize.body.base,
  color: varsThemeBase.colors.neutral.textHigh
});

/**
 * Truncates the start of the path: the block is right-to-left so the ellipsis
 * is painted at its start, and its content is left-to-right.
 */
export const valuePathText = style({
  display: "block",
  flex: "1 1 auto",
  minWidth: 0,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  direction: "rtl",
  textAlign: "left"
});

export const valuePathInner = style({
  direction: "ltr",
  unicodeBidi: "embed"
});

export const valuePathSeparator = style({
  display: "inline-flex",
  verticalAlign: "middle",
  margin: `0 ${varsThemeBase.spacing["0-5"]}`
});

export const fieldTag = style({
  display: "inline-flex",
  flexShrink: 0,
  marginRight: varsThemeBase.spacing[1]
});

/* -------------------------------------------------------------------------------------------------
 * Style - Trailing control
 * -----------------------------------------------------------------------------------------------*/

export const trailing = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  alignSelf: "center",
  width: TRAILING_SIZE,
  height: TRAILING_SIZE,
  padding: 0,
  margin: 0,
  border: "none",
  background: "transparent",
  appearance: "none",
  borderRadius: varsThemeBase.shape.border.radius[2]
});

export const trailingButton = style({
  cursor: "pointer",
  ":focus-visible": {
    outline: "none",
    boxShadow: varsThemeBase.utils.focus
  }
});

/** Keyboard focus ring of the remove button of a chip. */
globalStyle(`${field} ${chip_close_icon_container}:focus-visible`, {
  outline: "none",
  borderRadius: varsThemeBase.shape.border.radius[1],
  boxShadow: varsThemeBase.utils.focus
});

/* -------------------------------------------------------------------------------------------------
 * Style - List
 * -----------------------------------------------------------------------------------------------*/

/**
 * The list: it holds the back control, the level title and the scrolling
 * region, and it is as tall as the maximum height allows.
 */
export const list = style({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  alignSelf: "stretch",
  gap: varsThemeBase.spacing[1],
  width: "100%",
  maxHeight: LIST_MAX_HEIGHT,
  padding: varsThemeBase.spacing[2]
});

export const listHierarchical = style({
  maxHeight: LIST_MAX_HEIGHT_HIERARCHICAL
});

/**
 * The scrolling region: it reaches the edges of the list so its scrollbar sits
 * at the edge, and keeps the list padding inside so no row is covered.
 */
export const scroller = style([
  thinScrollbarAlways,
  {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto",
    minHeight: 0,
    margin: `0 calc(${varsThemeBase.spacing[2]} * -1)`,
    padding: `0 ${varsThemeBase.spacing[2]}`,
    overflowY: "auto",
    outline: "none",
    ":focus-visible": {
      boxShadow: `inset ${varsThemeBase.utils.focus}`
    }
  }
]);

export const group = style({
  display: "flex",
  flexDirection: "column",
  gap: varsThemeBase.spacing[1],
  margin: 0,
  padding: 0
});

export const divider = style({
  flexShrink: 0,
  height: "1px",
  width: "100%",
  backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight
});

export const row = style({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: varsThemeBase.spacing[2],
  flexShrink: 0,
  width: "100%",
  minHeight: ROW_HEIGHT,
  margin: 0,
  padding: `0 ${varsThemeBase.spacing[2]}`,
  border: "none",
  borderRadius: varsThemeBase.shape.border.radius[2],
  backgroundColor: varsThemeBase.colors.neutral.background,
  fontFamily: varsThemeBase.fontFamily.sans,
  textAlign: "left",
  cursor: "pointer",
  selectors: {
    "&:hover": {
      backgroundColor: varsThemeBase.colors.primary.surface
    },
    '&[aria-selected="true"]': {
      backgroundColor: varsThemeBase.colors.primary.surface
    },
    '&[data-active="true"]': {
      backgroundColor: varsThemeBase.colors.primary.surfaceHighlight
    },
    '&[aria-disabled="true"]': {
      backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
      cursor: "not-allowed"
    }
  }
});

export const rowEnriched = style({
  minHeight: ENRICHED_ROW_HEIGHT,
  padding: `${varsThemeBase.spacing[1]} ${varsThemeBase.spacing[2]}`
});

export const rowBody = style({
  display: "flex",
  flexDirection: "column",
  flex: "1 1 auto",
  minWidth: 0
});

export const rowLine = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: varsThemeBase.spacing[2]
});

export const rowEnd = style({
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  gap: varsThemeBase.spacing[1]
});

export const rowPath = style({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: varsThemeBase.spacing["0-5"]
});

export const backControl = style({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: varsThemeBase.spacing[2],
  flexShrink: 0,
  width: "100%",
  minHeight: ROW_HEIGHT,
  margin: 0,
  padding: `0 ${varsThemeBase.spacing[2]}`,
  border: "none",
  background: "transparent",
  fontFamily: varsThemeBase.fontFamily.sans,
  textAlign: "left",
  cursor: "pointer"
});

export const titlePlain = style({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  width: "100%",
  minHeight: ROW_HEIGHT,
  padding: `0 ${varsThemeBase.spacing[2]}`
});

export const status = style({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  width: "100%",
  minHeight: ROW_HEIGHT,
  padding: `0 ${varsThemeBase.spacing[2]}`
});

/** Visually hidden text, still available to assistive technology. */
export const visuallyHidden = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  margin: "-1px",
  padding: 0,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0
});

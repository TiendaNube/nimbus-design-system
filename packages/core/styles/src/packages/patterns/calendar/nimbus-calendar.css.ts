import { style } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

const table = style({
  width: "100%",
  borderCollapse: "collapse",
  border: 0,
});

const head = style({
  backgroundColor: varsThemeBase.colors.neutral.surface,
  borderTop: `1px solid ${varsThemeBase.colors.neutral.surfaceHighlight}`,
  display: "flex",
});

const head_stickyWeekdays = style({
  display: "none",
});

const body = style({
  display: "flex",
  flexDirection: "column",
});

const row = style({
  display: "flex",
  flex: 1,
  padding: `0 ${varsThemeBase.spacing[4]}`,
});

const cell = style({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  width: "100%",
});

const cell__head = style([
  cell,
  {
    fontSize: varsThemeBase.fontSize.body.caption,
    fontWeight: varsThemeBase.fontWeight.medium,
    fontFamily: varsThemeBase.fontFamily.sans,
    color: varsThemeBase.colors.neutral.textLow,
    width: varsThemeBase.spacing[8],
    height: varsThemeBase.spacing[8],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
]);

const day = style({
  appearance: "none",
  border: "none",
  background: "transparent",
  color: varsThemeBase.colors.neutral.textLow,
  fontSize: varsThemeBase.fontSize.body.caption,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: `all ${varsThemeBase.motion.speed.fast} ease-in-out`,
  textAlign: "center",
  borderRadius: varsThemeBase.shape.border.radius[1],
  width: varsThemeBase.spacing[8],
  height: varsThemeBase.spacing[8],

  ":hover": {
    backgroundColor: varsThemeBase.colors.neutral.surface,
  },
});

const day_fullWidth = style([
  day,
  {
    width: "100%",
  },
]);

const day_disabled = style([
  day,
  {
    backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
    color: varsThemeBase.colors.neutral.textDisabled,
    pointerEvents: "none",
    cursor: "not-allowed",
  },
]);

const day_today = style([
  day,
  {
    backgroundColor: varsThemeBase.colors.primary.surface,
    outline: `1px solid ${varsThemeBase.colors.primary.surfaceHighlight}`,
    outlineOffset: "-1px",
    color: varsThemeBase.colors.primary.textLow,

    ":hover": {
      backgroundColor: varsThemeBase.colors.primary.surfaceHighlight,
      outlineColor: varsThemeBase.colors.primary.interactive,
      color: varsThemeBase.colors.primary.textHigh,
    },
  },
]);

const day_outside = style([
  day,
  {
    color: varsThemeBase.colors.neutral.textDisabled,
  },
]);

const day_selected = style([
  day,
  {
    backgroundColor: varsThemeBase.colors.primary.interactive,
    color: varsThemeBase.colors.neutral.background,
    outline: "none",

    ":hover": {
      backgroundColor: varsThemeBase.colors.primary.interactiveHover,
    },
  },
]);

const day__start = style([
  day,
  {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
]);

const day__middle = style([
  day,
  {
    backgroundColor: varsThemeBase.colors.primary.surface,
    color: varsThemeBase.colors.primary.interactive,
    borderRadius: 0,

    ":hover": {
      backgroundColor: varsThemeBase.colors.primary.surfaceHighlight,
      color: varsThemeBase.colors.primary.interactiveHover,
    },
  },
]);

const day__end = style([
  day,
  {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
]);

const caption = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: varsThemeBase.spacing[2],
  position: "relative",
  paddingBottom: varsThemeBase.spacing[2],
  paddingLeft: varsThemeBase.spacing[4],
  paddingRight: varsThemeBase.spacing[4],
  fontSize: varsThemeBase.fontSize.body.highlight,
  fontWeight: varsThemeBase.fontWeight.medium,
});

const nav = style({
  display: "flex",
  gap: varsThemeBase.spacing[2],
});

const nav__button = style({
  appearance: "none",
  border: `1px solid ${varsThemeBase.colors.neutral.interactive}`,
  borderRadius: "100%",
  backgroundColor: varsThemeBase.colors.neutral.surface,
  color: varsThemeBase.colors.neutral.textLow,
  cursor: "pointer",
  transition: `all ${varsThemeBase.motion.speed.base} ease-in-out`,
  height: "2rem",
  width: "2rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  ":disabled": {
    backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
    borderColor: varsThemeBase.colors.neutral.surfaceHighlight,
    color: varsThemeBase.colors.neutral.textDisabled,
    cursor: "not-allowed",
  },

  selectors: {
    "&:not(:disabled):hover": {
      backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
      borderColor: varsThemeBase.colors.neutral.interactiveHover,
    },
  },
});

const months = style({
  display: "flex",
  flexDirection: "column",
  gap: varsThemeBase.spacing[4],
});

const caption_start = style({
  paddingTop: varsThemeBase.spacing[4],
});

const caption_end = style({
  paddingBottom: varsThemeBase.spacing[4],
});

export const styles = {
  table,
  head,
  head_stickyWeekdays,
  body,
  row,
  cell,
  cell__head,
  day,
  day_fullWidth,
  day_disabled,
  day_today,
  day_outside,
  day__start,
  day__middle,
  day__end,
  day_selected,
  caption,
  nav,
  nav__button,
  months,
  caption_start,
  caption_end,
};

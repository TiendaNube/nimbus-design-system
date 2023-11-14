import { style, styleVariants } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

const base__container = style({
  position: "relative",
  borderStyle: "solid",
  borderColor: varsThemeBase.colors.neutral.interactive,
  borderRadius: varsThemeBase.shape.border.radius[2],
  borderWidth: varsThemeBase.shape.border.width[1],
  paddingBottom: 0,
  ":focus-within": {
    outline: "none",
    boxShadow: varsThemeBase.utils.focus,
  },
  "@media": {
    "screen and (max-width: 672px)": {
      paddingBottom: varsThemeBase.spacing["3-5"],
    },
  },
});

export const container = styleVariants({
  neutral: [
    base__container,
    {
      background: varsThemeBase.colors.neutral.background,
      borderColor: varsThemeBase.colors.neutral.interactive,
      ":focus-within": {
        borderColor: varsThemeBase.colors.primary.interactiveHover,
      },
    },
  ],
  success: [
    base__container,
    {
      background: varsThemeBase.colors.success.surface,
      borderColor: varsThemeBase.colors.success.interactive,
      ":focus-within": {
        borderColor: varsThemeBase.colors.success.interactiveHover,
      },
    },
  ],
  warning: [
    base__container,
    {
      background: varsThemeBase.colors.warning.surface,
      borderColor: varsThemeBase.colors.warning.interactive,
      ":focus-within": {
        borderColor: varsThemeBase.colors.warning.interactiveHover,
      },
    },
  ],
  danger: [
    base__container,
    {
      background: varsThemeBase.colors.danger.surface,
      borderColor: varsThemeBase.colors.danger.interactive,
      ":focus-within": {
        borderColor: varsThemeBase.colors.danger.interactiveHover,
      },
    },
  ],
});

const toolbar = style({
  padding: varsThemeBase.spacing[2],
  verticalAlign: "middle",
  overflow: "auto",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  gap: varsThemeBase.spacing[2],
  position: "sticky",
  top: "0",
  boxShadow: `0px -2px 0px 0px ${varsThemeBase.colors.neutral.surfaceDisabled} inset`,
});

const content = style({
  fontFamily: varsThemeBase.fontFamily.sans,
  fontSize: varsThemeBase.fontSize.body.highlight,
  minHeight: "150px",
  padding: varsThemeBase.spacing["2-5"],
  overflow: "auto",
  resize: "vertical",
  outline: "none",
});

const placeholder = style({
  fontSize: varsThemeBase.fontSize.body.base,
  fontFamily: varsThemeBase.fontFamily.sans,
  color: varsThemeBase.colors.neutral.textDisabled,
  overflow: "hidden",
  position: "absolute",
  textOverflow: "ellipsis",
  top: varsThemeBase.spacing["2-5"],
  left: varsThemeBase.spacing["2-5"],
  userSelect: "none",
  whiteSpace: "nowrap",
  display: "inline-block",
  pointerEvents: "none",
});

const text__italic = style({
  fontStyle: "italic",
});

const nested_list__item = style({
  listStyleType: "none",
  ":before": {
    display: "none",
  },
  ":after": {
    display: "none",
  },
});

export const styles = {
  container,
  toolbar,
  placeholder,
  content,
  text__italic,
  nested_list__item,
};

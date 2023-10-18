import { style, styleVariants } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

const base__toolbar = style({
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
  borderStyle: "solid",
  borderColor: varsThemeBase.colors.neutral.interactive,
  borderRadius: varsThemeBase.shape.border.radius[2],
  borderWidth: varsThemeBase.shape.border.width[1],
  borderBottomWidth: 0,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  boxShadow: `0px -2px 0px 0px ${varsThemeBase.colors.neutral.surfaceDisabled} inset`,
});

const base__content = style({
  fontFamily: varsThemeBase.fontFamily.centranube,
  fontSize: varsThemeBase.fontSize.body.highlight,
  minHeight: "150px",
  borderStyle: "solid",
  borderRadius: varsThemeBase.shape.border.radius[2],
  borderWidth: varsThemeBase.shape.border.width[1],
  borderTopWidth: "0",
  borderTopLeftRadius: "0",
  borderTopRightRadius: "0",
  borderColor: varsThemeBase.colors.neutral.interactive,
  padding: varsThemeBase.spacing["2-5"],
  overflow: "auto",
  resize: "vertical",
  outline: "none",
});

const placeholder = style({
  fontSize: varsThemeBase.fontSize.body.base,
  fontFamily: varsThemeBase.fontFamily.centranube,
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

export const toolbar = styleVariants({
  neutral: [
    base__toolbar,
    {
      background: varsThemeBase.colors.neutral.background,
      borderColor: varsThemeBase.colors.neutral.interactive,
    },
  ],
  success: [
    base__toolbar,
    {
      background: varsThemeBase.colors.success.surface,
      borderColor: varsThemeBase.colors.success.interactive,
    },
  ],
  warning: [
    base__toolbar,
    {
      background: varsThemeBase.colors.warning.surface,
      borderColor: varsThemeBase.colors.warning.interactive,
    },
  ],
  danger: [
    base__toolbar,
    {
      background: varsThemeBase.colors.danger.surface,
      borderColor: varsThemeBase.colors.danger.interactive,
    },
  ],
});

export const content = styleVariants({
  neutral: [
    base__content,
    {
      background: varsThemeBase.colors.neutral.background,
      borderColor: varsThemeBase.colors.neutral.interactive,
    },
  ],
  success: [
    base__content,
    {
      background: varsThemeBase.colors.success.surface,
      borderColor: varsThemeBase.colors.success.interactive,
    },
  ],
  warning: [
    base__content,
    {
      background: varsThemeBase.colors.warning.surface,
      borderColor: varsThemeBase.colors.warning.interactive,
    },
  ],
  danger: [
    base__content,
    {
      background: varsThemeBase.colors.danger.surface,
      borderColor: varsThemeBase.colors.danger.interactive,
    },
  ],
});

export const styles = {
  toolbar,
  placeholder,
  content,
  text__italic,
  nested_list__item,
};

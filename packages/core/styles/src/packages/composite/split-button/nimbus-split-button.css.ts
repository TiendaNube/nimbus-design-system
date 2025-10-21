import { style, styleVariants } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";

const baseButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "2rem",
  textDecoration: "none",
  cursor: "pointer",
  boxSizing: "border-box",
  padding: `${varsThemeBase.spacing[2]} ${varsThemeBase.spacing[4]}`,
  gap: varsThemeBase.spacing[1],
  fontWeight: varsThemeBase.fontWeight.medium,
  lineHeight: varsThemeBase.lineWeight.body.base,
  fontSize: varsThemeBase.fontSize.body.base,
  fontFamily: varsThemeBase.fontFamily.sans,
  borderWidth: varsThemeBase.shape.border.width[1],
  borderStyle: "solid",
  transition: `background-color ${varsThemeBase.motion.speed.fast} ease`,
  ":disabled": {
    color: varsThemeBase.colors.neutral.textDisabled,
    cursor: "default",
  },
  ":focus-visible": {
    boxShadow: `inset ${varsThemeBase.utils.focus}`,
    outline: "none",
  },
});

const basePrimary = style([
  baseButton,
  {
    width: "fit-content",
    borderTopLeftRadius: varsThemeBase.shape.border.radius[2],
    borderBottomLeftRadius: varsThemeBase.shape.border.radius[2],
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
]);

const baseSecondary = style([
  baseButton,
  {
    width: "2rem",
    minWidth: "2rem",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: varsThemeBase.shape.border.radius[2],
    borderBottomRightRadius: varsThemeBase.shape.border.radius[2],
    padding: varsThemeBase.spacing[2],
  },
]);

const createAppearanceStyles = (
  background: string,
  borderColor: string,
  textColor: string,
  hoverBackground: string,
  hoverBorderColor: string,
  activeBackground: string,
  activeBorderColor: string,
  disabledBackground: string,
  disabledBorderColor: string,
  focusBorderColor: string
) => ({
  background,
  borderColor,
  borderRightWidth: "2px",
  borderRightColor: hoverBorderColor,
  color: textColor,
  ":hover": {
    background: hoverBackground,
    borderColor: hoverBorderColor,
  },
  ":active": {
    background: activeBackground,
    borderColor: activeBorderColor,
  },
  ":disabled": {
    background: disabledBackground,
    borderColor: disabledBorderColor,
  },
  ":focus": {
    borderColor: focusBorderColor,
  },
});

export const primaryAppearance = styleVariants({
  primary: [
    basePrimary,
    createAppearanceStyles(
      varsThemeBase.colors.primary.interactive,
      varsThemeBase.colors.primary.interactive,
      varsThemeBase.colors.neutral.background,
      varsThemeBase.colors.primary.interactiveHover,
      varsThemeBase.colors.primary.interactiveHover,
      varsThemeBase.colors.primary.interactivePressed,
      varsThemeBase.colors.primary.interactivePressed,
      varsThemeBase.colors.neutral.surfaceDisabled,
      varsThemeBase.colors.primary.surfaceHighlight,
      varsThemeBase.colors.primary.interactiveHover
    ),
  ],
});

export const secondaryAppearance = styleVariants({
  primary: [
    baseSecondary,
    createAppearanceStyles(
      varsThemeBase.colors.primary.interactive,
      varsThemeBase.colors.primary.interactive,
      varsThemeBase.colors.neutral.background,
      varsThemeBase.colors.primary.interactiveHover,
      varsThemeBase.colors.primary.interactiveHover,
      varsThemeBase.colors.primary.interactivePressed,
      varsThemeBase.colors.primary.interactivePressed,
      varsThemeBase.colors.neutral.surfaceDisabled,
      varsThemeBase.colors.primary.surfaceHighlight,
      varsThemeBase.colors.primary.interactiveHover
    ),
  ],
});

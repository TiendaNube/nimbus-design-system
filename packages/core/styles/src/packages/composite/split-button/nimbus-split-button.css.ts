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

const createAppearanceStyles = () => ({
  background: varsThemeBase.colors.primary.interactive,
  borderColor: varsThemeBase.colors.primary.interactive,
  color: varsThemeBase.colors.neutral.background,
  ":hover": {
    background: varsThemeBase.colors.primary.interactiveHover,
    borderColor: varsThemeBase.colors.primary.interactiveHover,
  },
  ":active": {
    background: varsThemeBase.colors.primary.interactivePressed,
    borderColor: varsThemeBase.colors.primary.interactivePressed,
  },
  ":disabled": {
    background: varsThemeBase.colors.neutral.surfaceDisabled,
    borderColor: varsThemeBase.colors.primary.surfaceHighlight,
  },
  ":focus": {
    borderColor: varsThemeBase.colors.primary.interactiveHover,
  },
});

export const primaryAppearance = styleVariants({
  primary: [
    basePrimary,
    {
      ...createAppearanceStyles(),
      borderRightColor: varsThemeBase.colors.primary.interactiveHover,
      borderRightWidth: "2px",
    },
  ],
});

export const secondaryAppearance = styleVariants({
  primary: [baseSecondary, createAppearanceStyles()],
});

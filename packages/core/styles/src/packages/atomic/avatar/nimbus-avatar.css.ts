import { globalStyle, style, styleVariants } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";

const { avatar: tokens } = varsThemeBase.components;

export const base = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,

  boxSizing: "border-box",
  borderRadius: varsThemeBase.shape.border.radius.full,
  overflow: "hidden",

  fontFamily: varsThemeBase.fontFamily.sans,
  fontWeight: varsThemeBase.fontWeight.bold,
  lineHeight: 1,
  textTransform: "uppercase",
  userSelect: "none"
});

const sizeNames = ["small", "medium", "large"] as const;

const sizes = {
  small: tokens.small,
  medium: tokens.medium,
  large: tokens.large
};

export const size = styleVariants(sizes, ({ size: diameter, fontSize }) => ({
  width: diameter,
  height: diameter,
  fontSize
}));

/* Icons inside the avatar follow its size, whatever the SVG declares. */
sizeNames.forEach((name) => {
  globalStyle(`${size[name]} svg`, {
    width: sizes[name].iconSize,
    height: sizes[name].iconSize
  });
});

export const appearance = styleVariants(
  { neutral: tokens.neutral, ai: tokens.ai },
  ({ background, color }) => ({ background, color })
);

/* Keeps the skeleton circle at the avatar size inside a narrow flex row. */
export const skeleton = style({ flexShrink: 0 });

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

export const size = styleVariants({
  small: {
    width: tokens.small.size,
    height: tokens.small.size,
    fontSize: tokens.small.fontSize
  },
  medium: {
    width: tokens.medium.size,
    height: tokens.medium.size,
    fontSize: tokens.medium.fontSize
  },
  large: {
    width: tokens.large.size,
    height: tokens.large.size,
    fontSize: tokens.large.fontSize
  }
});

/* Icons inside the avatar follow its size, whatever the SVG declares. */
globalStyle(`${size.small} svg`, {
  width: tokens.small.iconSize,
  height: tokens.small.iconSize
});

globalStyle(`${size.medium} svg`, {
  width: tokens.medium.iconSize,
  height: tokens.medium.iconSize
});

globalStyle(`${size.large} svg`, {
  width: tokens.large.iconSize,
  height: tokens.large.iconSize
});

export const appearance = styleVariants({
  neutral: {
    background: tokens.neutral.background,
    color: tokens.neutral.color
  },
  ai: {
    background: tokens.ai.background,
    color: tokens.ai.color
  }
});

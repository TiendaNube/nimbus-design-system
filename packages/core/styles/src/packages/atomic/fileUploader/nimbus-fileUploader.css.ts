import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { createVar, style, keyframes } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";
import { vars } from "../../../utils";
import {
  cursorProperties,
  aspectRatioProperties,
  backgroundColorProperties,
  borderColorProperties,
  borderRadiusProperties,
} from "../../../properties";

/* -------------------------------------------------------------------------------------------------
 * CSS Variables
 * -----------------------------------------------------------------------------------------------*/

export const backgroundColor = createVar();
export const borderColor = createVar();
export const overlayBorderRadius = createVar();

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

export const container = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  gap: varsThemeBase.spacing[1],
  width: vars.width,
  height: vars.height,
  background: varsThemeBase.colors.primary.surface,
  borderRadius: varsThemeBase.shape.border.radius[2],
  borderWidth: varsThemeBase.shape.border.width[2],
  borderColor: varsThemeBase.colors.primary.interactive,
  borderStyle: "dashed",
  transition: `background ${varsThemeBase.motion.speed.fast} ease, border-color ${varsThemeBase.motion.speed.fast} ease`,
});

const container__input = style({
  display: "none",
});

const disabled = style({
  background: varsThemeBase.colors.neutral.surfaceDisabled,
  borderColor: varsThemeBase.colors.neutral.interactive,
});

const dragging = style({
  borderColor: varsThemeBase.colors.primary.textHigh,
  background: varsThemeBase.colors.primary.surfaceHighlight,
});

export const skeleton = style({
  display: "flex",
});

const overlayAppear = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const asOverlay = style({
  width: vars.width,
  height: vars.height,
  position: "relative",
});

/* -------------------------------------------------------------------------------------------------
 * FileUploader.Overlay
 * -----------------------------------------------------------------------------------------------*/

export const overlay = style({
  position: "absolute",
  inset: 0,
  display: "flex",
  padding: varsThemeBase.spacing[4],
  zIndex: varsThemeBase.zIndex[200],
  pointerEvents: "none",
  animation: `${overlayAppear} ${varsThemeBase.motion.speed.fast} ease-out`,
  backgroundColor: varsThemeBase.colors.neutral.background,
  borderRadius: overlayBorderRadius,
});

export const overlay__content = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  gap: varsThemeBase.spacing[2],
  background: backgroundColor,
  borderRadius: varsThemeBase.shape.border.radius[2],
  borderWidth: varsThemeBase.shape.border.width[2],
  borderColor,
  borderStyle: "dashed",
});

export const overlay__content__text = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: varsThemeBase.spacing[1],
});

export const overlay__image = style({
  maxWidth: varsThemeBase.spacing[16],
  maxHeight: varsThemeBase.spacing[16],
  objectFit: "contain",
});

export const styles = {
  container,
  container__input,
  disabled,
  dragging,
  skeleton,
  asOverlay,
  overlay,
  overlay__content,
  overlay__content__text,
  overlay__image,
};

/* -------------------------------------------------------------------------------------------------
 * Sprinkle
 * -----------------------------------------------------------------------------------------------*/

const fileUploaderAspectRatioProperties = [
  "none",
  ...aspectRatioProperties,
] as const;

const fileUploaderFlexDirectionProperties = ["row", "column"] as const;

const fileUploaderBackgroundColorProperties = {
  "primary-surface": backgroundColorProperties["primary-surface"],
  "neutral-background": backgroundColorProperties["neutral-background"],
  transparent: "transparent",
};

const fileUploaderBorderColorProperties = {
  "primary-interactive": borderColorProperties["primary-interactive"],
  "ai-generativeInteractiveHover":
    borderColorProperties["ai-generativeInteractiveHover"],
  transparent: "transparent",
};

const properties = {
  aspectRatio: fileUploaderAspectRatioProperties,
  flexDirection: fileUploaderFlexDirectionProperties,
  cursor: cursorProperties,
  backgroundColor: fileUploaderBackgroundColorProperties,
  borderColor: fileUploaderBorderColorProperties,
  borderRadius: borderRadiusProperties,
};

const sprinkle = createSprinkles(
  defineProperties({
    properties: {
      aspectRatio: fileUploaderAspectRatioProperties,
      flexDirection: fileUploaderFlexDirectionProperties,
      cursor: cursorProperties,
      backgroundColor: fileUploaderBackgroundColorProperties,
      borderColor: fileUploaderBorderColorProperties,
    },
  })
);

export const fileUploaderSprinkle = {
  sprinkle,
  properties,
};

import {
  createRainbowSprinkles,
  defineProperties as defineRainbowProperties,
} from "rainbow-sprinkles";
import { style } from "@vanilla-extract/css";
import {
  backgroundColorProperties,
  borderColorProperties,
  borderStyleProperties,
  borderRadiusProperties,
  borderWidthProperties,
  boxSizingProperties,
  cursorProperties,
  positionProperties,
  overflowProperties,
  spacingProperties,
  displayProperties,
  flexDirectionProperties,
  justifyContentProperties,
  flexWrapProperties,
  alignItemsProperties,
  alignSelfProperties,
  pointerEventsProperties,
  boxShadowProperties,
  transitionSpeedProperties,
  transitionTimingProperties,
  textDecorationProperties,
  zIndexProperties,
  titleFontSizeProperties,
  titleLineHeightProperties,
  fontWeightProperties,
  textAlignProperties,
} from "../../../properties";
import { mediaQueries, varsThemeBase } from "../../../themes";
import { createBorderGradient, gradients } from "../../../gradients";

const [, aiInteractiveBorderBg] = createBorderGradient(
  gradients.aiGenerativeInteractive,
  varsThemeBase.colors.neutral.background
);

const boxBackgroundProperties = {
  "ai-generative-interactive-border": aiInteractiveBorderBg,
  "ai-generative-interactive": gradients.aiGenerativeInteractive,

  transparent: "transparent",
};

const boxBackgroundColorProperties = {
  "primary-interactive": backgroundColorProperties["primary-interactive"],
  "primary-surface": backgroundColorProperties["primary-surface"],
  "primary-surfaceHighlight":
    backgroundColorProperties["primary-surfaceHighlight"],
  "primary-textLow": backgroundColorProperties["primary-textLow"],

  "success-interactive": backgroundColorProperties["success-textLow"],
  "success-surface": backgroundColorProperties["success-surface"],
  "success-surfaceHighlight":
    backgroundColorProperties["success-surfaceHighlight"],
  "success-textLow": backgroundColorProperties["success-textLow"],

  "warning-interactive": backgroundColorProperties["warning-interactive"],
  "warning-surface": backgroundColorProperties["warning-surface"],
  "warning-surfaceHighlight":
    backgroundColorProperties["warning-surfaceHighlight"],
  "warning-textLow": backgroundColorProperties["warning-textLow"],

  "danger-interactive": backgroundColorProperties["danger-interactive"],
  "danger-surface": backgroundColorProperties["danger-surface"],
  "danger-surfaceHighlight":
    backgroundColorProperties["danger-surfaceHighlight"],
  "danger-textLow": backgroundColorProperties["danger-textLow"],

  "neutral-background": backgroundColorProperties["neutral-background"],
  "neutral-interactive": backgroundColorProperties["neutral-interactive"],
  "neutral-surface": backgroundColorProperties["neutral-surface"],
  "neutral-surfaceHighlight":
    backgroundColorProperties["neutral-surfaceHighlight"],
  "neutral-surfaceDisabled":
    backgroundColorProperties["neutral-surfaceDisabled"],
  "neutral-textLow": backgroundColorProperties["neutral-textLow"],
  "neutral-textHigh": backgroundColorProperties["neutral-textHigh"],
  "ai-generative-surface": backgroundColorProperties["ai-generativeSurface"],
  "ai-generative-surfaceHighlight":
    backgroundColorProperties["ai-generativeSurfaceHighlight"],
  transparent: "transparent",
};

const boxBorderColorProperties = {
  "primary-interactive": borderColorProperties["primary-interactive"],
  "primary-surface": borderColorProperties["primary-surface"],
  "primary-surfaceHighlight": borderColorProperties["primary-surfaceHighlight"],

  "success-interactive": borderColorProperties["success-textLow"],
  "success-surface": borderColorProperties["success-surface"],
  "success-surfaceHighlight": borderColorProperties["success-surfaceHighlight"],

  "warning-interactive": borderColorProperties["warning-interactive"],
  "warning-surface": borderColorProperties["warning-surface"],
  "warning-surfaceHighlight": borderColorProperties["warning-surfaceHighlight"],

  "danger-interactive": borderColorProperties["danger-interactive"],
  "danger-surface": borderColorProperties["danger-surface"],
  "danger-surfaceHighlight": borderColorProperties["danger-surfaceHighlight"],

  "neutral-interactive": borderColorProperties["neutral-interactive"],
  "neutral-surface": borderColorProperties["neutral-surface"],
  "neutral-surfaceDisabled": borderColorProperties["neutral-surfaceDisabled"],
  "neutral-surfaceHighlight": borderColorProperties["neutral-surfaceHighlight"],
  transparent: "transparent",
};

const boxColorProperties = {
  ...boxBackgroundColorProperties,
  currentColor: "currentColor",
};

const boxSpacingProperties = {
  ...spacingProperties,
  none: "0",
};

const boxMarginProperties = {
  auto: "auto",
  none: "0",
  ...spacingProperties,
};

const boxBorderRadiusProperties = {
  none: "0",
  ...borderRadiusProperties,
};

const boxBorderWidthProperties = {
  none: "0",
  ...borderWidthProperties,
};

const fontSizeProperties = {
  ...titleFontSizeProperties,
  ...spacingProperties,
};

const lineHeightProperties = {
  ...titleLineHeightProperties,
  ...spacingProperties,
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
    hover: { selector: "&:hover" },
    active: { selector: "&:active" },
    focus: { selector: "&:focus" },
    focusVisible: { selector: "&:focus-visible" },
    focusWithin: { selector: "&:focus-within" },
    disabled: { selector: "&:disabled" },
  },
  defaultCondition: "xs",
  dynamicProperties: {
    width: true,
    height: true,
    maxWidth: true,
    maxHeight: true,
    minWidth: true,
    minHeight: true,
    bottom: true,
    left: true,
    right: true,
    top: true,
    flex: true,
    gridTemplateAreas: true,
    gridTemplateColumns: true,
    gridTemplateRows: true,
    gridArea: true,
    flexShrink: true,
    flexGrow: true,
    order: true,
    transitionDelay: true,
    transitionProperty: true,
    backgroundImage: true,
    backgroundPosition: true,
    backgroundBlendMode: true,
    backgroundRepeat: true,
    backgroundSize: true,

    transitionDuration: transitionSpeedProperties,
    background: boxBackgroundProperties,
    backgroundColor: boxBackgroundColorProperties,
    borderColor: boxBorderColorProperties,
    borderRadius: boxBorderRadiusProperties,
    borderWidth: boxBorderWidthProperties,
    borderTopWidth: boxBorderWidthProperties,
    borderBottomWidth: boxBorderWidthProperties,
    borderLeftWidth: boxBorderWidthProperties,
    borderRightWidth: boxBorderWidthProperties,
    boxShadow: boxShadowProperties,
    padding: boxSpacingProperties,
    paddingTop: boxSpacingProperties,
    paddingBottom: boxSpacingProperties,
    paddingLeft: boxSpacingProperties,
    paddingRight: boxSpacingProperties,
    margin: boxMarginProperties,
    marginTop: boxMarginProperties,
    marginBottom: boxMarginProperties,
    marginLeft: boxMarginProperties,
    marginRight: boxMarginProperties,
    gap: boxSpacingProperties,
    gridGap: boxSpacingProperties,
    color: boxColorProperties,
    zIndex: zIndexProperties,
  },
  staticProperties: {
    display: displayProperties,
    flexDirection: flexDirectionProperties,
    flexWrap: flexWrapProperties,
    justifyContent: justifyContentProperties,
    alignItems: alignItemsProperties,
    alignSelf: alignSelfProperties,
    pointerEvents: pointerEventsProperties,
    borderStyle: borderStyleProperties,
    boxSizing: boxSizingProperties,
    cursor: cursorProperties,
    position: positionProperties,
    overflow: overflowProperties,
    overflowX: overflowProperties,
    overflowY: overflowProperties,
    transitionTimingFunction: transitionTimingProperties,
    textDecoration: textDecorationProperties,
    lineHeight: lineHeightProperties,
    fontWeight: fontWeightProperties,
    fontSize: fontSizeProperties,
    textAlign: textAlignProperties,
  },
  shorthands: {
    borderWidth: [
      "borderTopWidth",
      "borderBottomWidth",
      "borderLeftWidth",
      "borderRightWidth",
    ],
    borderWidthX: ["borderLeftWidth", "borderRightWidth"],
    borderWidthY: ["borderTopWidth", "borderBottomWidth"],
    padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
    p: ["padding"],
    pl: ["paddingLeft"],
    pr: ["paddingRight"],
    pt: ["paddingTop"],
    pb: ["paddingBottom"],
    px: ["paddingLeft", "paddingRight"],
    py: ["paddingTop", "paddingBottom"],
    margin: ["marginTop", "marginBottom", "marginLeft", "marginRight"],
    marginX: ["marginLeft", "marginRight"],
    marginY: ["marginTop", "marginBottom"],
    m: ["margin"],
    mr: ["marginRight"],
    ml: ["marginLeft"],
    mt: ["marginTop"],
    mb: ["marginBottom"],
    mx: ["marginLeft", "marginRight"],
    my: ["marginTop", "marginBottom"],
  },
});

const properties = {
  gap: boxSpacingProperties,
  gridGap: boxSpacingProperties,
  display: displayProperties,
  flexDirection: flexDirectionProperties,
  flexWrap: flexWrapProperties,
  justifyContent: justifyContentProperties,
  alignItems: alignItemsProperties,
  alignSelf: alignSelfProperties,
  pointerEvents: pointerEventsProperties,
  backgroundColor: boxBackgroundColorProperties,
  background: boxBackgroundProperties,
  color: boxColorProperties,
  borderColor: boxBorderColorProperties,
  borderRadius: boxBorderRadiusProperties,
  borderWidth: boxBorderWidthProperties,
  borderStyle: borderStyleProperties,
  boxSizing: boxSizingProperties,
  cursor: cursorProperties,
  spacing: boxSpacingProperties,
  margin: boxMarginProperties,
  position: positionProperties,
  overflow: overflowProperties,
  overflowX: overflowProperties,
  overflowY: overflowProperties,
  boxShadow: boxShadowProperties,
  transitionDuration: transitionSpeedProperties,
  transitionTimingFunction: transitionTimingProperties,
  textDecoration: textDecorationProperties,
  zIndex: zIndexProperties,
  textAlign: textAlignProperties,
  fontWeight: fontWeightProperties,
  fontSize: fontSizeProperties,
  lineHeight: lineHeightProperties,
};

const sprinkle = createRainbowSprinkles(defineProperties);

export const asButton = style({
  ":focus-visible": {
    outline: "none",
    boxShadow: varsThemeBase.utils.focus,
  },
});

export const boxSprinkle = {
  sprinkle,
  properties,
};

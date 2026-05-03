import { style, styleVariants, globalStyle, keyframes } from "@vanilla-extract/css";
import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { cursorProperties } from "../../../properties";
import { varsThemeBase } from "../../../themes";

/* -------------------------------------------------------------------------------------------------
 * style as "base"
 * -----------------------------------------------------------------------------------------------*/

const base = style({
  borderStyle: "solid",
  display: "flex",
  borderWidth: varsThemeBase.shape.border.width[1],
  padding: `${varsThemeBase.spacing[1]} ${varsThemeBase.spacing["1-5"]}`,
  borderRadius: varsThemeBase.shape.border.radius[1],
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,
});

const container = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  width: "fit-content",
  gap: varsThemeBase.spacing[1],
  borderStyle: "solid",
  borderColor: "transparent",
  borderWidth: varsThemeBase.shape.border.width[1],
  borderRadius: varsThemeBase.shape.border.radius[1],
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,
});

const container__content = styleVariants({
  radio: [
    {
      transition: `all ${varsThemeBase.motion.speed.fast} ease`,
      display: "flex",
      alignItems: "center",
      color: varsThemeBase.colors.neutral.textHigh,
    },
  ],
  button: [
    base,
    {
      backgroundColor: varsThemeBase.colors.neutral.background,
      borderColor: varsThemeBase.colors.neutral.interactive,
      color: varsThemeBase.colors.neutral.textHigh,
    },
  ],
  disabled: [
    base,
    {
      cursor: "not-allowed",
      backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
      borderColor: varsThemeBase.colors.neutral.interactive,
      color: varsThemeBase.colors.neutral.textDisabled,
    },
  ],
});

const container__input = style({
  position: "absolute",
  overflow: "hidden",
  opacity: 0,
  height: 0,
  width: 0,
});

/* -------------------------------------------------------------------------------------------------
 * style as "radio"
 * -----------------------------------------------------------------------------------------------*/

export const container__checkmark = style({
  minWidth: "1rem",
  minHeight: "1rem",
  width: "1rem",
  height: "1rem",
  flexShrink: 0,
  boxSizing: "border-box",

  display: "block",
  position: "relative",

  borderStyle: "solid",
  borderWidth: varsThemeBase.shape.border.width[1],
  borderRadius: varsThemeBase.shape.border.radius.full,
  borderColor: varsThemeBase.colors.neutral.interactive,
  backgroundColor: varsThemeBase.colors.neutral.background,
});

/** Selected dot: 9px per Figma; absolute center avoids flex/baseline offset inside the ring. */
const RADIO_INNER_DOT_SIZE = "0.5625rem";

const radioCheckIn = keyframes({
  from: {
    opacity: 0,
    transform: "translate(-50%, -50%) scale(0)",
  },
  to: {
    opacity: 1,
    transform: "translate(-50%, -50%) scale(1)",
  },
});

export const container__checkicon = style({
  display: "block",
  position: "absolute",
  top: "50%",
  left: "50%",
  width: RADIO_INNER_DOT_SIZE,
  height: RADIO_INNER_DOT_SIZE,
  margin: 0,
  borderRadius: varsThemeBase.shape.border.radius.full,
  opacity: 0,
  transform: "translate(-50%, -50%) scale(0)",
  boxSizing: "border-box",
  pointerEvents: "none",
});

globalStyle(`${container__input}:checked ~ ${container__checkmark}`, {
  borderColor: varsThemeBase.colors.primary.interactive,
});

globalStyle(
  `${container__input}:checked ~ ${container__checkmark} ${container__checkicon}`,
  {
    opacity: 1,
    transform: "translate(-50%, -50%) scale(1)",
    animation: `${radioCheckIn} ${varsThemeBase.motion.duration[1]} ${varsThemeBase.motion.easing.out.quart} both`,
    backgroundColor: varsThemeBase.colors.primary.interactive,
  }
);

// Radio disabled unchecked: Figma 19805-1371 — surfaceHighlight + neutral.interactive border
globalStyle(
  `${container__input}:disabled:not(:checked) ~ ${container__checkmark}`,
  {
    backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
    borderColor: varsThemeBase.colors.neutral.interactive,
  }
);

// Radio disabled checked: Figma 19805-57162 — surfaceDisabled fill, primary.surfaceDisabled border + dot
globalStyle(
  `${container__input}:disabled:checked ~ ${container__checkmark}`,
  {
    backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
    borderColor: varsThemeBase.colors.primary.surfaceDisabled,
  }
);

globalStyle(
  `${container__input}:disabled:checked ~ ${container__checkmark} ${container__checkicon}`,
  {
    opacity: 1,
    transform: "translate(-50%, -50%) scale(1)",
    animation: "none",
    backgroundColor: varsThemeBase.colors.primary.surfaceDisabled,
  }
);

globalStyle(`${container__input}:disabled ~ ${container__content.radio}`, {
  color: varsThemeBase.colors.neutral.textDisabled,
});

globalStyle(`${container} p`, {
  lineHeight: varsThemeBase.spacing[4],
});

// Radio focus: Figma 19805-1396 / 19805-1400 — 2px ring on label; no separate ring on the circle
globalStyle(
  `${container}[data-as="radio"]:has(${container__input}:focus-visible)`,
  {
    boxShadow: `0 0 0 2px ${varsThemeBase.colors.neutral.interactive}`,
  }
);

globalStyle(
  `${container}[data-as="radio"] ${container__input}:focus-visible ~ ${container__checkmark}`,
  {
    boxShadow: "none",
  }
);

// Radio unchecked hover: Figma 19805-1359 — neutral.surfaceDisabled + neutral.interactiveHover border
globalStyle(
  `${container}[data-as="radio"]:hover ${container__input}:not(:checked):not(:disabled) ~ ${container__checkmark}`,
  {
    backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
    borderColor: varsThemeBase.colors.neutral.interactiveHover,
  }
);

// Radio unchecked pressed: Figma 19805-1363 — neutral.surface + neutral.interactivePressed border
globalStyle(
  `${container}[data-as="radio"]:active ${container__input}:not(:checked):not(:disabled) ~ ${container__checkmark}`,
  {
    backgroundColor: varsThemeBase.colors.neutral.surface,
    borderColor: varsThemeBase.colors.neutral.interactivePressed,
  }
);

// Radio checked hover / pressed (interaction parity with Checkbox)
globalStyle(
  `${container}[data-as="radio"]:hover ${container__input}:checked:not(:disabled) ~ ${container__checkmark}`,
  {
    borderColor: varsThemeBase.colors.primary.interactiveHover,
  }
);

globalStyle(
  `${container}[data-as="radio"]:hover ${container__input}:checked:not(:disabled) ~ ${container__checkmark} ${container__checkicon}`,
  {
    opacity: 1,
    transform: "translate(-50%, -50%) scale(1)",
    backgroundColor: varsThemeBase.colors.primary.interactiveHover,
  }
);

globalStyle(
  `${container}[data-as="radio"]:active ${container__input}:checked:not(:disabled) ~ ${container__checkmark}`,
  {
    borderColor: varsThemeBase.colors.primary.interactivePressed,
  }
);

globalStyle(
  `${container}[data-as="radio"]:active ${container__input}:checked:not(:disabled) ~ ${container__checkmark} ${container__checkicon}`,
  {
    opacity: 1,
    transform: "translate(-50%, -50%) scale(1)",
    backgroundColor: varsThemeBase.colors.primary.interactivePressed,
  }
);

/* -------------------------------------------------------------------------------------------------
 * style as "button"
 * -----------------------------------------------------------------------------------------------*/

// Button focus: Figma 19805-1382 / 19805-1390 — 2px neutral.interactive ring (spread)
globalStyle(
  `${container__input}:focus-visible ~ ${container__content.button}`,
  {
    boxShadow: `0 0 0 2px ${varsThemeBase.colors.neutral.interactive}`,
  }
);

globalStyle(`${container__input}:checked ~ ${container__content.button}`, {
  backgroundColor: varsThemeBase.colors.primary.interactive,
  borderColor: varsThemeBase.colors.primary.interactive,
  color: varsThemeBase.colors.neutral.background,
});

// Button unchecked hover: Figma 19805-1384
globalStyle(
  `${container}[data-as="button"]:hover ${container__input}:not(:checked):not(:disabled) ~ ${container__content.button}`,
  {
    backgroundColor: varsThemeBase.colors.neutral.surface,
    borderColor: varsThemeBase.colors.neutral.interactiveHover,
  }
);

// Button unchecked pressed: Figma 19805-1386
globalStyle(
  `${container}[data-as="button"]:active ${container__input}:not(:checked):not(:disabled) ~ ${container__content.button}`,
  {
    backgroundColor: varsThemeBase.colors.neutral.surface,
    borderColor: varsThemeBase.colors.neutral.interactivePressed,
  }
);

// Button checked hover / pressed
globalStyle(
  `${container}[data-as="button"]:hover ${container__input}:checked:not(:disabled) ~ ${container__content.button}`,
  {
    backgroundColor: varsThemeBase.colors.primary.interactiveHover,
    borderColor: varsThemeBase.colors.primary.interactiveHover,
  }
);

globalStyle(
  `${container}[data-as="button"]:active ${container__input}:checked:not(:disabled) ~ ${container__content.button}`,
  {
    backgroundColor: varsThemeBase.colors.primary.interactivePressed,
    borderColor: varsThemeBase.colors.primary.interactivePressed,
  }
);

// Button checked disabled: Figma 19805-1392
globalStyle(`${container__input}:checked:disabled ~ ${container__content.disabled}`, {
  backgroundColor: varsThemeBase.colors.primary.surfaceDisabled,
  borderColor: varsThemeBase.colors.primary.surfaceDisabled,
  color: varsThemeBase.colors.neutral.textDisabled,
});

export const styles = {
  base,
  container,
  container__content,
  container__input,
  container__checkmark,
  container__checkicon,
};

/* -------------------------------------------------------------------------------------------------
 * Sprinkle
 * -----------------------------------------------------------------------------------------------*/

const properties = {
  cursor: cursorProperties,
};

const sprinkle = createSprinkles(
  defineProperties({
    properties,
  })
);

export const radioSprinkle = {
  sprinkle,
  properties,
};

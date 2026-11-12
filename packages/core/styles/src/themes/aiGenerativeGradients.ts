import { vars } from "./contract.css";

const { aiGradient, aiGenerative } = vars.colors;

/**
 * AI generative gradients for base, dark, next and next-dark.
 * `interactive`, `hover` and `disabled` are the exact linear gradients these
 * themes already use, so they do not change. `pressed` is new and matches the
 * flat `aiGenerative.textLow` color used today for the pressed state.
 */
export const aiGenerativeGradientsBase = {
  interactive: `linear-gradient(50deg, ${aiGradient.blueHigh} 28.22%, ${aiGradient.purpleHigh} 49.27%, ${aiGradient.pinkHigh} 83.12%)`,
  hover: `linear-gradient(50deg, ${aiGradient.pinkHigh} 28.22%, ${aiGradient.purpleHigh} 49.27%, ${aiGradient.blueHigh} 83.12%)`,
  pressed: `linear-gradient(${aiGenerative.textLow}, ${aiGenerative.textLow})`,
  disabled: `linear-gradient(50deg, ${aiGradient.blueLight} 28.22%, ${aiGradient.purpleLight} 49.27%, ${aiGradient.pinkLight} 83.12%)`,
};

/**
 * Colors the Norte UI gradients are built from, as hex values resolved per
 * theme from `@nimbus-ds/tokens`.
 */
export interface AiGenerativeGradientPalette {
  textLow: string;
  primaryInteractive: string;
  overlay: string;
  purpleHigh: string;
  purpleLight: string;
  pinkHigh: string;
  pinkLight: string;
}

/**
 * Applies an opacity (0–100 %) to a hex color as `rgba()`. Unlike
 * `color-mix()`, `rgba()` works in every browser the Admin supports
 * (Chrome 103, Safari 14.5, Firefox 91 and later).
 */
const fade = (hex: string, amount: string): string => {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match) {
    throw new Error(`AI gradient colors must be 6-digit hex values: ${hex}`);
  }
  const value = parseInt(match[1], 16);
  const alpha = Math.round((parseFloat(amount) / 100) * 1000) / 1000;
  return `rgba(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${
    value & 255
  }, ${alpha})`;
};

/**
 * Radial gradients for next-norteui and next-norteui-dark (option B): the Figma
 * layers with the blue layer painted above the purple one and reaching 30 %.
 * Every state keeps this order. Hover and pressed darken the hover layers with
 * the neutral overlay (15 % and 30 %), as in Figma. Disabled uses the same
 * layers at about 20 % opacity. The base pink is written as a flat gradient so
 * the value also works in `background-image`.
 */
export const createAiGenerativeGradientsNorteui = (
  palette: AiGenerativeGradientPalette
) => {
  const blueLayer = (alpha: string, midAlpha: string) =>
    `radial-gradient(84.01% 107.55% at 20.17% -22.66%, ${fade(
      palette.primaryInteractive,
      alpha
    )} 0%, ${fade(palette.primaryInteractive, midAlpha)} 30%, ${fade(
      palette.primaryInteractive,
      "0%"
    )} 100%)`;
  const purpleLayer = (alpha: string, midAlpha: string) =>
    `radial-gradient(172.16% 156.18% at 105% -15.62%, ${fade(
      palette.textLow,
      alpha
    )} 0%, ${fade(palette.purpleHigh, midAlpha)} 45%, ${fade(
      palette.purpleHigh,
      "0%"
    )} 100%)`;
  const pinkHighLayer = (alpha: string) =>
    `radial-gradient(136.47% 87.46% at 33.81% 109%, ${fade(
      palette.pinkHigh,
      alpha
    )} 0%, ${fade(palette.pinkHigh, "0%")} 95.37%)`;
  const pinkCenterLayer = `radial-gradient(50% 50% at 50% 50%, ${fade(
    palette.pinkLight,
    "100%"
  )} 0%, ${fade(palette.pinkLight, "0%")} 95%)`;
  const flat = (color: string) => `linear-gradient(${color}, ${color})`;
  const overlay = (amount: string) => {
    const color = fade(palette.overlay, amount);
    return `linear-gradient(0deg, ${color} 0%, ${color} 100%)`;
  };
  const pinkBase = flat(fade(palette.pinkLight, "100%"));
  const hoverLayers = [
    blueLayer("100%", "93%"),
    purpleLayer("100%", "70%"),
    pinkHighLayer("100%"),
    pinkBase,
  ];

  return {
    interactive: [
      blueLayer("100%", "93%"),
      purpleLayer("100%", "70%"),
      pinkCenterLayer,
      pinkBase,
    ].join(", "),
    hover: [overlay("15%"), ...hoverLayers].join(", "),
    pressed: [overlay("30%"), ...hoverLayers].join(", "),
    disabled: [
      blueLayer("20%", "19%"),
      purpleLayer("20%", "14%"),
      pinkHighLayer("20%"),
      flat(fade(palette.purpleLight, "20%")),
    ].join(", "),
  };
};

/**
 * Linear AI gradient used by strokes (borders) and SVG icons.
 * Base themes keep the original 50deg blue-to-pink gradient.
 */
export const aiGenerativeLinearBase = {
  angle: "50deg",
  start: aiGradient.blueHigh,
  middle: aiGradient.purpleHigh,
  end: aiGradient.pinkHigh,
  hoverStart: aiGradient.pinkHigh,
  hoverMiddle: aiGradient.purpleHigh,
  hoverEnd: aiGradient.blueHigh,
  disabledStart: aiGradient.blueLight,
  disabledMiddle: aiGradient.purpleLight,
  disabledEnd: aiGradient.pinkLight,
};

/**
 * Norte UI goes toward the bottom left corner: purple at the top right, blue in
 * the middle band and pink at the bottom left, following the radial option B.
 * `to bottom left` adapts to the surface proportions, so wide buttons keep the
 * diagonal. Hover keeps the same order and disabled uses the light stops.
 * Icons read the same stops from left to right.
 */
export const aiGenerativeLinearNorteui = {
  angle: "to bottom left",
  start: aiGradient.purpleHigh,
  middle: aiGradient.blueHigh,
  end: aiGradient.pinkHigh,
  hoverStart: aiGradient.purpleHigh,
  hoverMiddle: aiGradient.blueHigh,
  hoverEnd: aiGradient.pinkHigh,
  disabledStart: aiGradient.purpleLight,
  disabledMiddle: aiGradient.blueLight,
  disabledEnd: aiGradient.pinkLight,
};

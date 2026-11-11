import { vars } from "./contract.css";

const { aiGradient, aiGenerative, primary, neutral } = vars.colors;

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

const fade = (color: string, amount: string) =>
  `color-mix(in srgb, ${color} ${amount}, transparent)`;

// Option B: the Figma layers with the blue layer painted above the purple one
// and reaching a bit further (30 % instead of 20 %). Every state keeps this
// order. The base pink is written as a flat gradient so the value also works
// in `background-image`.
const blueLayer = (alpha: string, midAlpha: string) =>
  `radial-gradient(84.01% 107.55% at 20.17% -22.66%, ${fade(
    primary.interactive,
    alpha
  )} 0%, ${fade(primary.interactive, midAlpha)} 30%, ${fade(
    primary.interactive,
    "0%"
  )} 100%)`;
const purpleLayer = (alpha: string, midAlpha: string) =>
  `radial-gradient(172.16% 156.18% at 105% -15.62%, ${fade(
    aiGenerative.textLow,
    alpha
  )} 0%, ${fade(aiGradient.purpleHigh, midAlpha)} 45%, ${fade(
    aiGradient.purpleHigh,
    "0%"
  )} 100%)`;
const pinkHighLayer = (alpha: string) =>
  `radial-gradient(136.47% 87.46% at 33.81% 109%, ${fade(
    aiGradient.pinkHigh,
    alpha
  )} 0%, ${fade(aiGradient.pinkHigh, "0%")} 95.37%)`;
const pinkCenterLayer = `radial-gradient(50% 50% at 50% 50%, ${
  aiGradient.pinkLight
} 0%, ${fade(aiGradient.pinkLight, "0%")} 95%)`;
const flat = (color: string) => `linear-gradient(${color}, ${color})`;
const overlay = (amount: string) => {
  const color = fade(neutral.textHigh, amount);
  return `linear-gradient(0deg, ${color} 0%, ${color} 100%)`;
};
const pinkBase = flat(aiGradient.pinkLight);
const hoverLayers = [
  blueLayer("100%", "93%"),
  purpleLayer("100%", "70%"),
  pinkHighLayer("100%"),
  pinkBase,
];

/**
 * Radial gradients for next-norteui and next-norteui-dark (option B).
 * Hover and pressed darken the hover layers with the neutral overlay (15 % and
 * 30 %), as in Figma. Disabled uses the same layers at about 20 % opacity.
 */
export const aiGenerativeGradientsNorteui = {
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
    flat(fade(aiGradient.purpleLight, "20%")),
  ].join(", "),
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
 * Norte UI uses a horizontal gradient (90deg): blue on the left, purple in the
 * middle and pink on the right. Hover keeps the same order and disabled uses
 * the light stops in that order. Colors come from the Norte UI `aiGradient`
 * stops.
 */
export const aiGenerativeLinearNorteui = {
  angle: "90deg",
  start: aiGradient.blueHigh,
  middle: aiGradient.purpleHigh,
  end: aiGradient.pinkHigh,
  hoverStart: aiGradient.blueHigh,
  hoverMiddle: aiGradient.purpleHigh,
  hoverEnd: aiGradient.pinkHigh,
  disabledStart: aiGradient.blueLight,
  disabledMiddle: aiGradient.purpleLight,
  disabledEnd: aiGradient.pinkLight,
};

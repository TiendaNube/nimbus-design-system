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

// Layers taken from the Norte UI Button in Figma. The base pink color is
// written as a flat gradient so the value also works in `background-image`.
const purpleLayer = `radial-gradient(172.16% 156.18% at 105% -15.62%, ${
  aiGenerative.textLow
} 0%, ${fade(aiGradient.purpleHigh, "70%")} 45%, ${fade(
  aiGradient.purpleHigh,
  "0%"
)} 100%)`;
const blueLayer = `radial-gradient(84.01% 107.55% at 20.17% -22.66%, ${
  primary.interactive
} 0%, ${fade(primary.interactive, "93%")} 20%, ${fade(
  primary.interactive,
  "0%"
)} 100%)`;
const pinkBase = `linear-gradient(${aiGradient.pinkLight}, ${aiGradient.pinkLight})`;
const pinkHighLayer = `radial-gradient(136.47% 87.46% at 33.81% 109%, ${
  aiGradient.pinkHigh
} 0%, ${fade(aiGradient.pinkHigh, "0%")} 95.37%)`;
const overlay = (amount: string) => {
  const color = fade(neutral.textHigh, amount);
  return `linear-gradient(0deg, ${color} 0%, ${color} 100%)`;
};
const disabledBase = fade(aiGradient.purpleLight, "20%");

/**
 * Radial gradients for next-norteui and next-norteui-dark.
 */
export const aiGenerativeGradientsNorteui = {
  interactive: [
    purpleLayer,
    blueLayer,
    `radial-gradient(50% 50% at 50% 50%, ${aiGradient.pinkLight} 0%, ${fade(
      aiGradient.pinkLight,
      "0%"
    )} 95%)`,
    pinkBase,
  ].join(", "),
  hover: [overlay("15%"), purpleLayer, blueLayer, pinkHighLayer, pinkBase].join(
    ", "
  ),
  pressed: [
    overlay("30%"),
    purpleLayer,
    blueLayer,
    pinkHighLayer,
    pinkBase,
  ].join(", "),
  // Same layers as `hover` without the overlay, faded to about 20 % opacity.
  disabled: [
    `radial-gradient(172.16% 156.18% at 105% -15.62%, ${fade(
      aiGenerative.textLow,
      "20%"
    )} 0%, ${fade(aiGradient.purpleHigh, "14%")} 45%, ${fade(
      aiGradient.purpleHigh,
      "0%"
    )} 100%)`,
    `radial-gradient(84.01% 107.55% at 20.17% -22.66%, ${fade(
      primary.interactive,
      "20%"
    )} 0%, ${fade(primary.interactive, "19%")} 20%, ${fade(
      primary.interactive,
      "0%"
    )} 100%)`,
    `radial-gradient(136.47% 87.46% at 33.81% 109%, ${fade(
      aiGradient.pinkHigh,
      "20%"
    )} 0%, ${fade(aiGradient.pinkHigh, "0%")} 95.37%)`,
    `linear-gradient(${disabledBase}, ${disabledBase})`,
  ].join(", "),
};

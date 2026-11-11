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

// Option C layers: dark purple from the top right, blue across the left side
// and pink from the bottom right. The base pink is written as a flat gradient
// so the value also works in `background-image`.
const purpleLayer = `radial-gradient(130% 160% at 105% -15.62%, ${
  aiGenerative.textLow
} 0%, ${fade(aiGradient.purpleHigh, "60%")} 40%, ${fade(
  aiGradient.purpleHigh,
  "0%"
)} 85%)`;
const blueLayer = `radial-gradient(110% 200% at 0% 60%, ${
  primary.interactive
} 0%, ${fade(primary.interactive, "85%")} 35%, ${fade(
  primary.interactive,
  "0%"
)} 90%)`;
const pinkLayer = `radial-gradient(70% 90% at 80% 100%, ${
  aiGradient.pinkLight
} 0%, ${fade(aiGradient.pinkLight, "0%")} 100%)`;
const pinkBase = `linear-gradient(${aiGradient.pinkLight}, ${aiGradient.pinkLight})`;
const layers = [purpleLayer, blueLayer, pinkLayer, pinkBase];
const overlay = (amount: string) => {
  const color = fade(neutral.textHigh, amount);
  return `linear-gradient(0deg, ${color} 0%, ${color} 100%)`;
};
const disabledBase = fade(aiGradient.purpleLight, "20%");

/**
 * Radial gradients for next-norteui and next-norteui-dark.
 * Hover and pressed darken the same layers with the neutral overlay (15 % and
 * 30 %), so the shape does not change between states.
 */
export const aiGenerativeGradientsNorteui = {
  interactive: layers.join(", "),
  hover: [overlay("15%"), ...layers].join(", "),
  pressed: [overlay("30%"), ...layers].join(", "),
  // Disabled keeps the Figma values: the former layers faded to about 20 %.
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

/**
 * Linear AI gradient used by strokes (borders) and SVG icons.
 * Base themes keep the original 50deg blue-to-pink gradient.
 */
export const aiGenerativeLinearBase = {
  angle: "50deg",
  start: aiGradient.blueHigh,
  middle: aiGradient.purpleHigh,
  end: aiGradient.pinkHigh,
};

/**
 * Norte UI uses a horizontal gradient (90deg): blue on the left, purple in the
 * middle and pink on the right. Colors come from the Norte UI `aiGradient`
 * stops.
 */
export const aiGenerativeLinearNorteui = {
  angle: "90deg",
  start: aiGradient.blueHigh,
  middle: aiGradient.purpleHigh,
  end: aiGradient.pinkHigh,
};

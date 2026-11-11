import { vars } from "./contract.css";
import { createLinearGradient } from "../gradients/gradientBuilder";

const { aiGradient } = vars.colors;

const interactiveGradient = createLinearGradient(
  "50deg",
  `${aiGradient.blueHigh} 28.22%`,
  `${aiGradient.purpleHigh} 49.27%`,
  `${aiGradient.pinkHigh} 83.12%`
);

const hoverGradient = createLinearGradient(
  "50deg",
  `${aiGradient.pinkHigh} 28.22%`,
  `${aiGradient.purpleHigh} 49.27%`,
  `${aiGradient.blueHigh} 83.12%`
);

/**
 * Background value that paints `fill` inside the padding box and `gradient`
 * on a transparent border. When `overlay` is given, a solid layer of that
 * color is painted over the border gradient (used to darken it on hover and
 * pressed states).
 */
const borderGradient = (
  gradient: string,
  fill: string,
  overlay?: string
): string =>
  [
    `linear-gradient(${fill}, ${fill}) padding-box`,
    overlay && `linear-gradient(${overlay}, ${overlay}) border-box`,
    `${gradient} border-box`,
  ]
    .filter(Boolean)
    .join(", ");

/**
 * Background value that paints `fill` inside the padding box and the
 * `aiGenerativeInteractive` gradient on a transparent border. Same value as
 * `createBorderGradient(gradients.aiGenerativeInteractive, fill)` without the
 * fallback, defined here because `gradients` imports the themes.
 * @param fill color painted inside the padding box.
 * @param overlay optional color layered over the border gradient.
 */
export const aiInteractiveBorder = (fill: string, overlay?: string): string =>
  borderGradient(interactiveGradient, fill, overlay);

/**
 * Same as `aiInteractiveBorder` with the `aiGenerativeHover` gradient
 * (reversed color stops).
 * @param fill color painted inside the padding box.
 */
export const aiHoverBorder = (fill: string): string =>
  borderGradient(hoverGradient, fill);

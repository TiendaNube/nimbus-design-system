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

const linear = vars.gradients.aiGenerativeLinear;

const themeLinearGradient = (start: string, middle: string, end: string) =>
  `linear-gradient(${linear.angle}, ${start} 28.22%, ${middle} 49.27%, ${end} 83.12%)`;

/**
 * Background value that paints `fill` inside the padding box and the theme
 * linear AI gradient (`aiGenerativeLinearInteractive`) on a transparent
 * border. Same value as
 * `createBorderGradient(gradients.aiGenerativeInteractive, fill)` without the
 * fallback, so a theme value built with it renders exactly like that call.
 * @param fill color painted inside the padding box.
 * @param overlay optional color layered over the border gradient.
 */
export const aiLinearBorder = (fill: string, overlay?: string): string =>
  borderGradient(
    themeLinearGradient(linear.start, linear.middle, linear.end),
    fill,
    overlay
  );

/**
 * Same as `aiLinearBorder` with the theme linear disabled gradient
 * (`aiGenerativeLinearDisabled`).
 * @param fill color painted inside the padding box.
 */
export const aiLinearDisabledBorder = (fill: string): string =>
  borderGradient(
    themeLinearGradient(
      linear.disabledStart,
      linear.disabledMiddle,
      linear.disabledEnd
    ),
    fill
  );

/**
 * Same as `aiInteractiveBorder` with the `aiGenerativeHover` gradient
 * (reversed color stops).
 * @param fill color painted inside the padding box.
 */
export const aiHoverBorder = (fill: string): string =>
  borderGradient(hoverGradient, fill);

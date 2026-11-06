import { vars } from "./contract.css";
import { createLinearGradient } from "../gradients/gradientBuilder";

/**
 * Background value that paints `fill` inside the padding box and the
 * `aiGenerativeInteractive` gradient on a transparent border. Same value as
 * `createBorderGradient(gradients.aiGenerativeInteractive, fill)` without the
 * fallback, defined here because `gradients` imports the themes.
 */
export const aiInteractiveBorder = (fill: string): string =>
  `linear-gradient(${fill}, ${fill}) padding-box, ${createLinearGradient(
    "50deg",
    `${vars.colors.aiGradient.blueHigh} 28.22%`,
    `${vars.colors.aiGradient.purpleHigh} 49.27%`,
    `${vars.colors.aiGradient.pinkHigh} 83.12%`
  )} border-box`;

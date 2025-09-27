/**
 * Creates a linear gradient with flexible direction and multiple color stops
 * @param direction - The direction of the gradient (e.g., "180deg", "to right", "45deg")
 * @param colorStops - Variable number of color stops (e.g., "red", "blue 50%", "rgba(0,255,0,0.8)")
 * @returns CSS linear-gradient string
 *
 * @example
 * createLinearGradient("180deg", "red", "blue")
 * createLinearGradient("to right", "red 0%", "yellow 50%", "blue 100%")
 * createLinearGradient("45deg", "rgba(255,0,0,0.5)", "transparent")
 */
export const createLinearGradient = (
  direction: string,
  ...colorStops: string[]
): string => {
  if (colorStops.length === 0) {
    throw new Error(
      "createLinearGradient requires at least one color stop (e.g., 'red', 'blue 50%', 'rgba(0,255,0,0.8)')"
    );
  }

  return `linear-gradient(${direction}, ${colorStops.join(", ")})`;
};

/**
 * Creates a border gradient with a fallback background color.
 * @param gradient - The gradient to use for the border. Commonly the return value of createLinearGradient function.
 * @param backgroundColor - The background color to use for the fallback.
 * @returns An array with the fallback background color and the border gradient.
 * @example Use case with vanilla-extract:
 * ```ts
 * const variants = vanillaStyle({
 *   background: createBorderGradient(gradients.aiGradient, "white"),
 *   border: `${varsThemeBase.shape.border.width[2]} solid transparent`, // Defines the gradient width, and makes the border transparent to ensure the gradient is visible.
 * });
 * ```
 */
export const createBorderGradient = (
  gradient: string,
  backgroundColor: string
): [string, string] => [
  backgroundColor,
  `linear-gradient(${backgroundColor}, ${backgroundColor}) padding-box, ${gradient} border-box`,
];

/**
 * Creates a text gradient with a fallback background color.
 * @param gradient - The gradient to use for the text. Commonly the return value of createLinearGradient function.
 * @returns An object with common properties to achieve a text gradient.
 * @example Use case with vanilla-extract:
 * ```ts
 * const variants = vanillaStyle({
 *   ...createTextGradient(gradients.aiGenerativeInteractive),
 * });
 * ```
 */
export const createTextGradient = (gradient: string) => ({
  // This makes a fallback to the parent color when the gradient is not applied.
  color: "inherit",
  // Only apply the gradient if the browser supports it.
  "@supports ((background-clip: text) or (-webkit-background-clip: text))": {
    backgroundImage: gradient,
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "transparent",
    width: "fit-content",
    display: "inline",
  },
});

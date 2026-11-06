import tokens from "@nimbus-ds/tokens/dist/js/tokens";

interface TokenLeaf {
  value: unknown;
}

const colorDict = tokens.color as Record<
  string,
  Record<string, Record<string, TokenLeaf>>
>;

const { aiGradient } = colorDict["next-norteui"];

/**
 * AI gradient stops for next-norteui and next-norteui-dark.
 * Both themes use the same values, like base and dark do today.
 * Pink has no Norte UI palette yet, so it keeps the base hex values.
 */
export const aiGradientNorteui = {
  blueHigh: String(aiGradient["blue-high"].value),
  blueLight: String(aiGradient["blue-light"].value),
  purpleHigh: String(aiGradient["purple-high"].value),
  purpleLight: String(aiGradient["purple-light"].value),
  pinkHigh: String(aiGradient["pink-high"].value),
  pinkLight: String(aiGradient["pink-light"].value),
};

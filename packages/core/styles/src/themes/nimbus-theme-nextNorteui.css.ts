import { createTheme } from "@vanilla-extract/css";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

import { vars } from "./contract.css";
import { globalTheme } from "./globals.css";

interface TokenLeaf {
  value: unknown;
}

type PrimaryTokenScale = Record<string, TokenLeaf>;

const colorDict = tokens.color as Record<
  string,
  { primary: PrimaryTokenScale }
>;
const primaryTokens = (colorDict["next-norteui"] ?? colorDict.next).primary;
const readPrimaryToken = (key: string): string =>
  String(primaryTokens[key].value);

export const variables = createTheme(vars, {
  ...globalTheme,
  colors: {
    ...globalTheme.colors,
    primary: {
      surface: readPrimaryToken("surface"),
      surfaceHighlight: readPrimaryToken("surface-highlight"),
      interactive: readPrimaryToken("interactive"),
      interactiveHover: readPrimaryToken("interactive-hover"),
      interactivePressed: readPrimaryToken("interactive-pressed"),
      textLow: readPrimaryToken("text-low"),
      textHigh: readPrimaryToken("text-high")
    }
  },
  utils: {
    focus: `0 0 0 3px ${readPrimaryToken("surface-highlight")}`,
    aiFocus: `0 0 0 3px ${globalTheme.colors.aiGenerative.surfaceHighlight}`
  }
});

export default variables;

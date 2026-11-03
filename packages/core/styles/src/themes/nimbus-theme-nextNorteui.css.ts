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
    },
    success: {
      ...globalTheme.colors.success,
      surface: "#E6F4EE",
      surfaceHighlight: "#BFE5D2",
      interactive: "#23825E",
      interactiveHover: "#1C6B4D",
      interactivePressed: "#15543D",
      textLow: "#176344",
      textHigh: "#103D2C"
    },
    warning: {
      ...globalTheme.colors.warning,
      surface: "#FFF4DA",
      surfaceHighlight: "#F6D997",
      interactive: "#B77910",
      interactiveHover: "#96620C",
      interactivePressed: "#754C09",
      textLow: "#80520B",
      textHigh: "#533607"
    },
    neutral: {
      ...globalTheme.colors.neutral,
      textLow: "#52647A",
      textHigh: "#293B52"
    }
  },
  utils: {
    focus: `0 0 0 3px ${readPrimaryToken("surface-highlight")}`,
    aiFocus: `0 0 0 3px ${globalTheme.colors.aiGenerative.surfaceHighlight}`
  }
});

export default variables;

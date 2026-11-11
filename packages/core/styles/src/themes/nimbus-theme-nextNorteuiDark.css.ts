import { createTheme } from "@vanilla-extract/css";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

import { vars } from "./contract.css";
import { globalTheme } from "./globals.css";
import { withToneSurfaceDisabled } from "./toneSurfaceDisabled";

interface TokenLeaf {
  value: unknown;
}

type ToneTokenMap = Record<string, TokenLeaf>;

const mapToneScale = (group: ToneTokenMap) => ({
  surface: String(group.surface.value),
  surfaceHighlight: String(group["surface-highlight"].value),
  interactive: String(group.interactive.value),
  interactiveHover: String(group["interactive-hover"].value),
  interactivePressed: String(group["interactive-pressed"].value),
  textLow: String(group["text-low"].value),
  textHigh: String(group["text-high"].value),
});

const colorDict = tokens.color as Record<string, Record<string, ToneTokenMap>>;
// There is no `next-norteui-dark` palette in `@nimbus-ds/tokens` yet, so this
// theme explicitly uses the `next-dark` palette. Switch to `next-norteui-dark`
// once that palette exists.
const nextNorteuiColors = colorDict["next-dark"];
const darkColors = colorDict.dark;
const surfaceDisabled = String(darkColors.neutral["surface-disabled"].value);
const darkShadows = tokens.shadow.dark.level;
const readShadow = (level: "0" | "1" | "2" | "3" | "4" | "5"): string =>
  String(darkShadows[level].value);

const nextNorteuiDarkTheme = {
  ...globalTheme,
  fontWeight: {
    ...globalTheme.fontWeight,
    title: globalTheme.fontWeight.medium,
  },
  fontSize: {
    ...globalTheme.fontSize,
    body: {
      ...globalTheme.fontSize.body,
      base: tokens.font.size["3-25"].value as string,
    },
  },
  colors: withToneSurfaceDisabled(surfaceDisabled, {
    ...globalTheme.colors,
    primary: mapToneScale(nextNorteuiColors.primary),
    success: mapToneScale(darkColors.success),
    warning: mapToneScale(darkColors.warning),
    danger: mapToneScale(darkColors.danger),
    neutral: {
      ...mapToneScale(darkColors.neutral),
      background: String(darkColors.neutral.background.value),
      surfaceDisabled: String(darkColors.neutral["surface-disabled"].value),
      textDisabled: String(darkColors.neutral["text-disabled"].value),
    },
  }),
  utils: {
    focus: `0 0 0 3px ${String(
      nextNorteuiColors.primary["surface-highlight"].value
    )}`,
    aiFocus: `0 0 0 3px ${globalTheme.colors.aiGenerative.surfaceHighlight}`,
  },
  shadow: {
    level: {
      0: readShadow("0"),
      1: readShadow("1"),
      2: readShadow("2"),
      3: readShadow("3"),
      4: readShadow("4"),
      5: readShadow("5"),
    },
  },
  components: {
    thumbnail: globalTheme.components.thumbnail,
    divider: {
      color: vars.colors.neutral.interactive,
    },
    // No Norte UI dark Tag design yet: keep the default Tag look.
    tag: globalTheme.components.tag,
    // No Norte UI dark Chip design yet: keep the default Chip look.
    chip: globalTheme.components.chip,
    // No Norte UI dark Badge design yet: keep the default Badge look.
    // Readable ai-generative contrast on dark surfaces; rest of Badge is the default look.
    badge: {
      ...globalTheme.components.badge,
      surface: {
        ...globalTheme.components.badge.surface,
        aiGenerative: {
          ...globalTheme.components.badge.surface.aiGenerative,
          // Dark surfaces need a light label over the ai-generative fill.
          color: vars.colors.neutral.textHigh,
        },
      },
      light: {
        ...globalTheme.components.badge.light,
        aiGenerative: {
          ...globalTheme.components.badge.light.aiGenerative,
          color: vars.colors.aiGenerative.surfaceHighlight,
        },
      },
    },
  },
};

export const variables = createTheme(vars, nextNorteuiDarkTheme);

export default variables;

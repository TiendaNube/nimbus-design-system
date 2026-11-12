import { vars } from "../../../themes/contract.css";
import { globalTheme } from "../../../themes/globals.css";
import dark from "../../../themes/nimbus-theme-dark.css";
import next from "../../../themes/nimbus-theme-next.css";
import nextDark from "../../../themes/nimbus-theme-nextDark.css";
import nextNorteui from "../../../themes/nimbus-theme-nextNorteui.css";
import nextNorteuiDark from "../../../themes/nimbus-theme-nextNorteuiDark.css";
import "./nimbus-link.css";
import type { appearance } from "./nimbus-link.css";

type ThemeTokens = {
  components: { link: { neutral: { hoverColor: string } } };
};
type StyleRule = {
  ":hover"?: { color: string };
  ":disabled"?: { color: string };
};

type Captured = {
  themeTokens: Record<string, ThemeTokens>;
  variants: Record<string, unknown[]>;
};

// jest.mock is hoisted above the imports, so the captured values live inside
// the mock factory and are read back with jest.requireMock.
jest.mock("@vanilla-extract/css", () => {
  const actual = jest.requireActual("@vanilla-extract/css");
  const captured: Captured = { themeTokens: {}, variants: {} };
  return {
    ...actual,
    captured,
    createTheme: (contract: unknown, tokens: ThemeTokens) => {
      const className = actual.createTheme(contract, tokens);
      captured.themeTokens[className] = tokens;
      return className;
    },
    styleVariants: (map: Record<string, unknown[]>) => {
      Object.assign(captured.variants, map);
      return actual.styleVariants(map);
    }
  };
});

const { captured } = jest.requireMock<{ captured: Captured }>(
  "@vanilla-extract/css"
);

const hoverOf = (themeClassName: string) =>
  captured.themeTokens[themeClassName].components.link.neutral.hoverColor;

const ruleOf = (name: keyof typeof appearance) =>
  captured.variants[name][1] as StyleRule;

describe("GIVEN the Link theme values", () => {
  describe("WHEN resolving the neutral hover color", () => {
    it("THEN base keeps neutral.textDisabled", () => {
      expect(globalTheme.components.link.neutral.hoverColor).toBe(
        vars.colors.neutral.textDisabled
      );
    });

    it.each([
      ["dark", dark],
      ["next", next],
      ["next-dark", nextDark],
      ["next-norteui-dark", nextNorteuiDark]
    ])("THEN %s keeps neutral.textDisabled", (_theme, themeClassName) => {
      expect(hoverOf(themeClassName)).toBe(vars.colors.neutral.textDisabled);
    });

    it("THEN next-norteui uses neutral.textHigh", () => {
      expect(hoverOf(nextNorteui)).toBe(vars.colors.neutral.textHigh);
    });

    it("THEN the neutral appearance reads the theme hover color", () => {
      expect(ruleOf("neutral")[":hover"]?.color).toBe(
        vars.components.link.neutral.hoverColor
      );
    });
  });

  describe("WHEN resolving the disabled color", () => {
    it.each<keyof typeof appearance>([
      "primary",
      "danger",
      "neutral",
      "neutral-background"
    ])("THEN the %s appearance uses neutral.textDisabled", (name) => {
      expect(ruleOf(name)[":disabled"]?.color).toBe(
        vars.colors.neutral.textDisabled
      );
    });
  });
});

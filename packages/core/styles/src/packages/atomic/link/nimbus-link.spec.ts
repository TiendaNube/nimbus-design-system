import type {
  ComplexStyleRule,
  StyleRule,
  createTheme as CreateTheme,
  styleVariants as StyleVariants
} from "@vanilla-extract/css";
import { vars } from "../../../themes/contract.css";
import { globalTheme } from "../../../themes/globals.css";
import dark from "../../../themes/nimbus-theme-dark.css";
import next from "../../../themes/nimbus-theme-next.css";
import nextDark from "../../../themes/nimbus-theme-nextDark.css";
import nextNorteui from "../../../themes/nimbus-theme-nextNorteui.css";
import nextNorteuiDark from "../../../themes/nimbus-theme-nextNorteuiDark.css";
import "./nimbus-link.css";
import type { appearance } from "./nimbus-link.css";

type VanillaExtract = {
  createTheme: typeof CreateTheme;
  styleVariants: typeof StyleVariants;
};

type Captured = {
  themeTokens: Record<string, unknown>;
  variants: Record<string, ComplexStyleRule>;
};

// jest.mock is hoisted above the imports, so the captured values live inside
// the mock factory and are read back with jest.requireMock.
jest.mock("@vanilla-extract/css", () => {
  const actual = jest.requireActual<VanillaExtract>("@vanilla-extract/css");
  const captured: Captured = { themeTokens: {}, variants: {} };
  return {
    ...actual,
    captured,
    createTheme: (...args: Parameters<typeof actual.createTheme>) => {
      const className = actual.createTheme(...args);
      const [, tokens] = args;
      captured.themeTokens[className] = tokens;
      return className;
    },
    styleVariants: (
      styleMap: Record<string, ComplexStyleRule>,
      debugId?: string
    ) => {
      Object.assign(captured.variants, styleMap);
      return actual.styleVariants(styleMap, debugId);
    }
  };
});

const { captured } = jest.requireMock<{ captured: Captured }>(
  "@vanilla-extract/css"
);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const valueAt = (source: unknown, path: string[]): unknown =>
  path.reduce<unknown>(
    (node, key) => (isRecord(node) ? node[key] : undefined),
    source
  );

const hoverOf = (themeClassName: string) =>
  valueAt(captured.themeTokens[themeClassName], [
    "components",
    "link",
    "neutral",
    "hoverColor"
  ]);

// Each Link appearance is declared as [base, rule]: return the rule object.
const ruleOf = (name: keyof typeof appearance): StyleRule | undefined => {
  const variant = captured.variants[name];
  const rule = Array.isArray(variant) ? variant[1] : variant;
  return typeof rule === "object" && !Array.isArray(rule) ? rule : undefined;
};

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
      expect(ruleOf("neutral")?.[":hover"]?.color).toBe(
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
      expect(ruleOf(name)?.[":disabled"]?.color).toBe(
        vars.colors.neutral.textDisabled
      );
    });
  });
});

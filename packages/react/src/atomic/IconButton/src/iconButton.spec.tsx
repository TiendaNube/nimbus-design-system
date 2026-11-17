import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@nimbus-ds/styles";

import { IconButton } from "./IconButton";
import { type IconButtonProps } from "./iconButton.types";

const makeSut = (rest: IconButtonProps) => {
  render(<IconButton {...rest} data-testid="icon-button-element" />);
};

describe("GIVEN <IconButton />", () => {
  describe("WHEN rendered", () => {
    it("THEN should default render element type", () => {
      makeSut({ source: <div /> });
      expect(screen.getByRole("button")).toBeDefined();
    });

    it('THEN should render element type="div"', () => {
      makeSut({ as: "div", source: <div /> });
      expect(screen.getByTestId("icon-button-element").nodeName).toEqual("DIV");
    });

    it("THEN should render icon color correctly", () => {
      makeSut({ as: "div", source: <div /> });
      expect(
        screen.getByTestId("icon-element").getAttribute("class")
      ).toContain("color_neutral-textHigh");
    });

    it("THEN should render provided icon color", () => {
      makeSut({ as: "div", source: <div />, color: "primary-textHigh" });
      expect(
        screen.getByTestId("icon-element").getAttribute("class")
      ).toContain("color_primary-textHigh");
    });
  });

  describe("WHEN rendered with ai-generative appearance", () => {
    it("THEN should render ai-generative appearance class", () => {
      makeSut({ appearance: "ai-generative", source: <div /> });
      expect(
        screen.getByTestId("icon-button-element").getAttribute("class")
      ).toContain("appearance_ai-generative");
    });
  });

  describe("WHEN rendered under a theme", () => {
    const renderInTheme = (
      theme: React.ComponentProps<typeof ThemeProvider>["theme"],
      rest: IconButtonProps
    ) =>
      render(
        <ThemeProvider theme={theme}>
          <IconButton {...rest} data-testid="icon-button-element" />
        </ThemeProvider>
      );

    const getClass = () =>
      screen.getByTestId("icon-button-element").getAttribute("class") ?? "";
    const getStyle = () =>
      screen.getByTestId("icon-button-element").getAttribute("style") ?? "";

    it.each(["base", "dark", "next", "next-dark"] as const)(
      "THEN %s keeps the current IconButton",
      (theme) => {
        renderInTheme(theme, { source: <div /> });
        expect(getClass()).not.toContain("norteui");
        expect(getStyle()).toMatch(/2.75rem/);
        expect(getClass()).toContain("backgroundColor-xs");
      }
    );

    it.each(["next-norteui", "next-norteui-dark"] as const)(
      "THEN %s uses the 28px Norte UI IconButton",
      (theme) => {
        renderInTheme(theme, { source: <div /> });
        expect(getClass()).toContain("norteui");
        expect(getClass()).toContain("norteuiNeutral");
        expect(getClass()).not.toContain("backgroundColor-");
        expect(getStyle()).toMatch(/1.75rem/);
      }
    );

    it("THEN Norte UI keeps an explicit size", () => {
      renderInTheme("next-norteui", { source: <div />, size: "2rem" });
      expect(getStyle()).toMatch(/2rem/);
    });

    it("THEN Norte UI uses the transparent style for a transparent IconButton", () => {
      renderInTheme("next-norteui", {
        source: <div />,
        backgroundColor: "transparent",
      });
      expect(getClass()).toContain("norteuiTransparent");
      expect(getClass()).not.toContain("norteuiNeutral");
    });

    it("THEN Norte UI uses the AI surface style for ai-generativeSurface", () => {
      renderInTheme("next-norteui", {
        source: <div />,
        backgroundColor: "ai-generativeSurface",
      });
      expect(getClass()).toContain("norteuiAiSurface");
      expect(getClass()).not.toContain("backgroundColor-");
    });

    it("THEN Norte UI lets the AI surface fill own the border", () => {
      renderInTheme("next-norteui", {
        source: <div />,
        backgroundColor: "ai-generativeSurface",
        borderColor: "primary-interactive",
      });
      expect(getClass()).toContain("norteuiAiSurface");
      expect(getClass()).not.toContain("borderColor-");
    });

    it("THEN Norte UI keeps explicit colors without a Norte UI fill", () => {
      renderInTheme("next-norteui", {
        source: <div />,
        backgroundColor: "neutral-surface",
        borderColor: "primary-interactive",
      });
      expect(getClass()).toContain("backgroundColor-xs");
      expect(getClass()).toContain("borderColor-xs");
      expect(getClass()).not.toContain("norteuiNeutral");
      expect(getClass()).not.toContain("norteuiNoBorder");
    });

    it("THEN Norte UI hides the border for its own background without borderColor", () => {
      renderInTheme("next-norteui", {
        source: <div />,
        backgroundColor: "neutral-surface",
      });
      expect(getClass()).toContain("norteuiNoBorder");
    });

    it("THEN Norte UI uses the AI icon color on the AI surface fill", () => {
      renderInTheme("next-norteui-dark", {
        source: <div />,
        backgroundColor: "ai-generativeSurface",
      });
      // "ai-generative" is drawn as an SVG gradient, so Icon adds no color
      // sprinkle (unlike neutral-textHigh, which adds color_neutral-textHigh).
      const iconClass =
        screen.getByTestId("icon-element").getAttribute("class") ?? "";
      expect(iconClass).not.toContain("color_");
    });

    it("THEN Norte UI dims the AI surface icon when disabled", () => {
      renderInTheme("next-norteui", {
        source: <div />,
        backgroundColor: "ai-generativeSurface",
        disabled: true,
      });
      expect(
        screen.getByTestId("icon-element").getAttribute("class")
      ).toContain("color_neutral-textDisabled");
    });

    it("THEN base keeps the default icon color on ai-generativeSurface", () => {
      renderInTheme("base", {
        source: <div />,
        backgroundColor: "ai-generativeSurface",
      });
      expect(
        screen.getByTestId("icon-element").getAttribute("class")
      ).toContain("color_neutral-textHigh");
    });

    it("THEN base keeps an explicit borderColor with ai-generativeSurface", () => {
      renderInTheme("base", {
        source: <div />,
        backgroundColor: "ai-generativeSurface",
        borderColor: "primary-interactive",
      });
      expect(getClass()).toContain("borderColor-xs");
    });

    it("THEN base keeps the ai-generativeSurface sprinkle", () => {
      renderInTheme("base", {
        source: <div />,
        backgroundColor: "ai-generativeSurface",
      });
      expect(getClass()).toContain("backgroundColor-xs");
      expect(getClass()).not.toContain("norteui");
    });

    it("THEN Norte UI dims the icon when disabled", () => {
      renderInTheme("next-norteui", { source: <div />, disabled: true });
      expect(
        screen.getByTestId("icon-element").getAttribute("class")
      ).toContain("color_neutral-textDisabled");
    });

    it("THEN Norte UI uses the AI focus ring for ai-generative", () => {
      renderInTheme("next-norteui", {
        source: <div />,
        appearance: "ai-generative",
      });
      expect(getClass()).toContain("norteuiAiGenerative");
    });
  });
});

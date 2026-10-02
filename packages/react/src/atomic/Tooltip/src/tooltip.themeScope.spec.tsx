import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@nimbus-ds/styles";

import { Tooltip } from "./Tooltip";

const hoverTooltip = async (
  user: ReturnType<typeof userEvent.setup>,
  id: string
) => {
  await user.hover(screen.getByTestId(`${id}-anchor`));
  await waitFor(() => expect(screen.getByTestId(id)).toBeDefined());
};

describe("GIVEN <Tooltip /> inside nested ThemeProviders", () => {
  describe("WHEN a tooltip outside the nested provider opens after one inside it", () => {
    it("THEN each tooltip renders within the provider that contains it", async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider data-testid="outer">
          <ThemeProvider theme="dark" data-testid="nested">
            <Tooltip content="inner" data-testid="inner-tip">
              <span data-testid="inner-tip-anchor">inner</span>
            </Tooltip>
          </ThemeProvider>
          <Tooltip content="outer" data-testid="outer-tip">
            <span data-testid="outer-tip-anchor">outer</span>
          </Tooltip>
        </ThemeProvider>
      );
      await hoverTooltip(user, "inner-tip");
      await hoverTooltip(user, "outer-tip");

      const nested = screen.getByTestId("nested");
      const outer = screen.getByTestId("outer");
      expect(nested.contains(screen.getByTestId("inner-tip"))).toBe(true);
      expect(outer.contains(screen.getByTestId("outer-tip"))).toBe(true);
      expect(nested.contains(screen.getByTestId("outer-tip"))).toBe(false);
      expect(
        screen.getByTestId("outer-tip").closest("#nimbus-tooltip-floating")
          ?.parentElement
      ).toBe(outer);
    });
  });

  describe("WHEN there is no ThemeProvider", () => {
    it("THEN the tooltip keeps the documented container id on the body", async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="plain" data-testid="plain-tip">
          <span data-testid="plain-tip-anchor">plain</span>
        </Tooltip>
      );
      await hoverTooltip(user, "plain-tip");
      expect(
        screen.getByTestId("plain-tip").closest("#nimbus-tooltip-floating")
          ?.parentElement
      ).toBe(document.body);
    });
  });
});

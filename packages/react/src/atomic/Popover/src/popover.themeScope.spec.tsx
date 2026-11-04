import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@nimbus-ds/styles";

import { Popover } from "./Popover";

describe("GIVEN <Popover /> inside nested ThemeProviders", () => {
  describe("WHEN a popover outside the nested provider opens after one inside it", () => {
    it("THEN each popover renders within the provider that contains it", async () => {
      render(
        <ThemeProvider data-testid="outer">
          <ThemeProvider theme="dark" data-testid="nested">
            <Popover visible content="inner" data-testid="inner-pop">
              <span>inner</span>
            </Popover>
          </ThemeProvider>
          <Popover visible content="outer" data-testid="outer-pop">
            <span>outer</span>
          </Popover>
        </ThemeProvider>
      );
      await waitFor(() => {
        expect(screen.getByTestId("outer-pop")).toBeDefined();
      });
      const nested = screen.getByTestId("nested");
      const outer = screen.getByTestId("outer");
      expect(nested.contains(screen.getByTestId("inner-pop"))).toBe(true);
      expect(outer.contains(screen.getByTestId("outer-pop"))).toBe(true);
      expect(nested.contains(screen.getByTestId("outer-pop"))).toBe(false);
      expect(
        screen.getByTestId("outer-pop").closest("#nimbus-popover-floating")
          ?.parentElement
      ).toBe(outer);
    });
  });

  describe("WHEN there is no ThemeProvider", () => {
    it("THEN the popover keeps the documented container id on the body", async () => {
      render(
        <Popover visible content="plain" data-testid="plain-pop">
          <span>plain</span>
        </Popover>
      );
      await waitFor(() => {
        expect(screen.getByTestId("plain-pop")).toBeDefined();
      });
      expect(
        screen.getByTestId("plain-pop").closest("#nimbus-popover-floating")
          ?.parentElement
      ).toBe(document.body);
    });
  });
});

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@nimbus-ds/styles";

import { Sidebar } from "./Sidebar";

describe("GIVEN <Sidebar /> inside nested ThemeProviders", () => {
  describe("WHEN a sidebar outside the nested provider opens after one inside it", () => {
    it("THEN each sidebar renders within the provider that contains it", async () => {
      render(
        <ThemeProvider data-testid="outer">
          <ThemeProvider theme="dark" data-testid="nested">
            <Sidebar open data-testid="inner-sidebar">
              inner
            </Sidebar>
          </ThemeProvider>
          <Sidebar open data-testid="outer-sidebar">
            outer
          </Sidebar>
        </ThemeProvider>
      );
      await waitFor(() => {
        expect(screen.getByTestId("outer-sidebar")).toBeDefined();
      });
      const nested = screen.getByTestId("nested");
      const outer = screen.getByTestId("outer");
      expect(nested.contains(screen.getByTestId("inner-sidebar"))).toBe(true);
      expect(outer.contains(screen.getByTestId("outer-sidebar"))).toBe(true);
      expect(nested.contains(screen.getByTestId("outer-sidebar"))).toBe(false);
      expect(
        screen.getByTestId("outer-sidebar").closest("#nimbus-sidebar")
          ?.parentElement
      ).toBe(outer);
    });
  });

  describe("WHEN there is no ThemeProvider", () => {
    it("THEN the sidebar keeps the documented container id on the body", async () => {
      render(
        <Sidebar open data-testid="plain-sidebar">
          plain
        </Sidebar>
      );
      await waitFor(() => {
        expect(screen.getByTestId("plain-sidebar")).toBeDefined();
      });
      expect(
        screen.getByTestId("plain-sidebar").closest("#nimbus-sidebar")
          ?.parentElement
      ).toBe(document.body);
    });
  });
});

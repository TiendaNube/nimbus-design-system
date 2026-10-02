import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@nimbus-ds/styles";

import { Modal } from "./Modal";

describe("GIVEN <Modal /> inside nested ThemeProviders", () => {
  describe.each([
    ["default id", undefined, "nimbus-modal-floating"],
    ["custom portalId", "custom-modal-portal", "custom-modal-portal"],
  ])(
    "WHEN a second modal opens outside the nested provider (%s)",
    (_name, portalId, expectedId) => {
      it("THEN each modal renders within the provider that contains it", async () => {
        render(
          <ThemeProvider data-testid="outer">
            <ThemeProvider theme="dark" data-testid="nested">
              <Modal open portalId={portalId} data-testid="inner-modal">
                inner
              </Modal>
            </ThemeProvider>
            <Modal open portalId={portalId} data-testid="outer-modal">
              outer
            </Modal>
          </ThemeProvider>
        );
        await waitFor(() => {
          expect(screen.getByTestId("outer-modal")).toBeDefined();
        });
        const nested = screen.getByTestId("nested");
        const outer = screen.getByTestId("outer");
        expect(nested.contains(screen.getByTestId("inner-modal"))).toBe(true);
        expect(outer.contains(screen.getByTestId("outer-modal"))).toBe(true);
        expect(nested.contains(screen.getByTestId("outer-modal"))).toBe(false);
        expect(
          screen.getByTestId("outer-modal").closest(`#${expectedId}`)
            ?.parentElement
        ).toBe(outer);
      });
    }
  );

  describe("WHEN there is no ThemeProvider", () => {
    it("THEN the modal keeps the documented container id on the body", async () => {
      render(
        <Modal open data-testid="plain-modal">
          plain
        </Modal>
      );
      await waitFor(() => {
        expect(screen.getByTestId("plain-modal")).toBeDefined();
      });
      expect(
        screen.getByTestId("plain-modal").closest("#nimbus-modal-floating")
          ?.parentElement
      ).toBe(document.body);
    });
  });
});

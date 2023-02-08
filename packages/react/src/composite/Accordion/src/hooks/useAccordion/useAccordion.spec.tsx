import React from "react";
import { renderHook } from "@testing-library/react";

import { Accordion } from "../../Accordion";
import { useAccordion } from "./useAccordion";

const makeSut = () =>
  renderHook(() => useAccordion(), {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <Accordion>{children}</Accordion>
    ),
  });

describe("GIVEN useAccordion", () => {
  beforeAll(() => {
    // eslint-disable-next-line
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  describe("WHEN the hook runs", () => {
    it("THEN should correctly return onSelect and selected properties", () => {
      const { result } = makeSut();
      expect(result.current.onSelect).toBeDefined();
      expect(result.current.selected).toBeDefined();
    });

    it("AND should return error handling for incorrect hook usage", () => {
      try {
        // eslint-disable-next-line
        renderHook(() => useAccordion());
      } catch (e: any) {
        // eslint-disable-next-line
        expect(e.message).toEqual(
          "AccordionHeader or AccordionBody components must be wrapped in <Accordion />"
        );
      }
    });
  });
});

import React from "react";
import { renderHook } from "@testing-library/react";

import { Accordion } from "../../Accordion";
import { useAccordionItem } from "./useAccordionItem";

const makeSut = () =>
  renderHook(() => useAccordionItem(), {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <Accordion>
        <Accordion.Item index="0" testId="my-hook">
          {children}
        </Accordion.Item>
      </Accordion>
    ),
  });

describe("GIVEN useAccordionItem", () => {
  beforeAll(() => {
    // eslint-disable-next-line
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  describe("WHEN the hook runs", () => {
    it("THEN should correctly return index and testId properties", () => {
      const { result } = makeSut();
      expect(result.current.index).toEqual("0");
      expect(result.current.testId).toEqual("my-hook");
    });

    it("AND should return error handling for incorrect hook usage", () => {
      try {
        // eslint-disable-next-line
        renderHook(() => useAccordionItem());
      } catch (e: any) {
        // eslint-disable-next-line
        expect(e.message).toEqual(
          "AccordionHeader or AccordionBody components must be wrapped in <AccordionItem />"
        );
      }
    });
  });
});

import React from "react";
import { renderHook } from "@testing-library/react";

import { Collapsible } from "../../Collapsible";
import { useCollapsible } from "./useCollapsible";

const makeSut = () =>
  renderHook(() => useCollapsible(), {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <Collapsible>{children}</Collapsible>
    ),
  });

describe("GIVEN useCollapsible", () => {
  beforeAll(() => {
    // eslint-disable-next-line
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  describe("WHEN the hook runs", () => {
    it("THEN should correctly return onSelect and selected properties", () => {
      const { result } = makeSut();
      expect(result.current.onOpen).toBeDefined();
      expect(result.current.open).toBeDefined();
    });

    it("AND should return error handling for incorrect hook usage", () => {
      try {
        // eslint-disable-next-line
        renderHook(() => useCollapsible());
      } catch (e: any) {
        // eslint-disable-next-line
        expect(e.message).toEqual(
          "CollapsibleBody components must be wrapped in <Collapsible />"
        );
      }
    });
  });
});

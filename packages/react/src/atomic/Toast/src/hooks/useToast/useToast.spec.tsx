import React from "react";
import { renderHook } from "@testing-library/react";

import { Toast } from "../../Toast";
import { useToast } from "./useToast";

const makeSut = () =>
  renderHook(() => useToast(), {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <Toast.Provider>{children}</Toast.Provider>
    ),
  });

describe("GIVEN useToast", () => {
  describe("WHEN the hook runs", () => {
    it("THEN should correctly return addToast and closeToast functions", () => {
      const { result } = makeSut();
      expect(result.current.addToast).toBeDefined();
      expect(result.current.closeToast).toBeDefined();
    });
  });
});

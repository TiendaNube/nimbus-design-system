import React from "react";
import { renderHook } from "@testing-library/react";

import { ToastProvider } from "../../components/ToastProvider";
import { useToast } from "./useToast";

const makeSut = () =>
  renderHook(() => useToast(), {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <ToastProvider>{children}</ToastProvider>
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

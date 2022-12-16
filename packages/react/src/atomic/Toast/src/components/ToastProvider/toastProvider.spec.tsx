import React from "react";
import { render, screen, act } from "@testing-library/react";

import { useToast } from "../../hooks";
import { ToastProps } from "../../toast.types";
import { ToastProvider } from "./ToastProvider";

const Button: React.FC<{ toast: ToastProps; id: string }> = ({ toast, id }) => {
  const { addToast, closeToast } = useToast();
  return (
    <>
      <button type="button" onClick={() => addToast(toast)}>
        add
      </button>
      <button type="button" onClick={() => closeToast(id || "")}>
        close
      </button>
    </>
  );
};

const makeSut = (rest: ToastProps) => {
  render(
    <ToastProvider>
      <Button toast={rest} id={rest.id} />
    </ToastProvider>
  );
};

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

describe("GIVEN <ToastProvider />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("THEN should ensure the correct functioning of the ToastProvider", () => {
    it("THEN should add a new toast correctly", () => {
      makeSut({ type: "primary", id: "1", text: "Toast" });
      act(() => {
        screen.getByText("add").click();
      });
      expect(
        screen.getByTestId("toast-element").getAttribute("class")
      ).toContain("primary");

      const icon = screen.getByTestId("toast-icon-primary");
      expect(icon.getAttribute("class")).toContain(
        "icon.sprinkle_color_primary.surface"
      );
      expect(icon.firstChild?.nodeName).toEqual("svg");
    });

    it("THEN should close toast correctly", () => {
      makeSut({ type: "primary", id: "1", text: "Toast" });
      act(() => {
        screen.getByText("add").click();
      });
      expect(
        screen.getByTestId("toast-element").getAttribute("class")
      ).toContain("primary");

      const icon = screen.getByTestId("toast-icon-primary");
      expect(icon.getAttribute("class")).toContain(
        "icon.sprinkle_color_primary.surface"
      );
      expect(icon.firstChild?.nodeName).toEqual("svg");
      act(() => {
        screen.getByText("close").click();
      });
      expect(screen.queryByTestId("toast-element")).toBeNull();
    });

    it("THEN should generate dinamyc id", () => {
      makeSut({ type: "primary", id: "", text: "Toast" });
      act(() => {
        screen.getByText("add").click();
      });
      expect(
        screen.getByTestId("toast-element").getAttribute("class")
      ).toContain("primary");

      const icon = screen.getByTestId("toast-icon-primary");
      expect(icon.getAttribute("class")).toContain(
        "icon.sprinkle_color_primary.surface"
      );
      expect(icon.firstChild?.nodeName).toEqual("svg");
    });
  });
});

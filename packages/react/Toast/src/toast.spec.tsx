import React from "react";
import { render, screen, act } from "@testing-library/react";

import { Toast } from "./Toast";
import { ToastContext } from "./contexts";
import { ToastProps } from "./toast.types";

const mockedAddToast = jest.fn();
const mockedCloseToast = jest.fn();

const makeSut = (rest: ToastProps) => {
  render(
    <ToastContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ addToast: mockedAddToast, closeToast: mockedCloseToast }}
    >
      <Toast {...rest} data-testid="toast-element" />
    </ToastContext.Provider>
  );
};

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

describe("GIVEN <Toast />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("THEN should correctly render the submitted type", () => {
    it("THEN should correctly render the type primary", () => {
      makeSut({ type: "primary", id: "1", text: "Toast" });
      expect(
        screen.getByTestId("toast-element").getAttribute("class")
      ).toContain("primary");

      const icon = screen.getByTestId("toast-icon-primary");
      expect(icon.getAttribute("class")).toContain(
        "icon.sprinkle_color_primary.textLow"
      );
      expect(icon.firstChild?.nodeName).toEqual("svg");
    });

    it("THEN should correctly render the type success", () => {
      makeSut({ type: "success", id: "1", text: "Toast" });
      expect(
        screen.getByTestId("toast-element").getAttribute("class")
      ).toContain("success");

      const icon = screen.getByTestId("toast-icon-success");
      expect(icon.getAttribute("class")).toContain(
        "icon.sprinkle_color_success.textLow"
      );
      expect(icon.firstChild?.nodeName).toEqual("svg");
    });

    it("THEN should correctly render the type danger", () => {
      makeSut({ type: "danger", id: "1", text: "Toast" });
      expect(
        screen.getByTestId("toast-element").getAttribute("class")
      ).toContain("danger");

      const icon = screen.getByTestId("toast-icon-danger");
      expect(icon.getAttribute("class")).toContain(
        "icon.sprinkle_color_danger.textLow"
      );
      expect(icon.firstChild?.nodeName).toEqual("svg");
    });

    it("THEN should correctly render the type progress", () => {
      makeSut({ type: "progress", id: "1", text: "Toast" });
      expect(
        screen.getByTestId("toast-element").getAttribute("class")
      ).toContain("progress");

      const icon = screen.getByTestId("toast-spinner-neutral");
      expect(icon.getAttribute("class")).toContain(
        "spinner.sprinkle_color_neutral.textLow"
      );
      expect(icon.firstChild?.nodeName).toEqual("circle");
    });

    it("THEN should correctly render the type default", () => {
      makeSut({ id: "1", text: "Toast" });
      expect(
        screen.getByTestId("toast-element").getAttribute("class")
      ).toContain("primary");

      const icon = screen.getByTestId("toast-icon-primary");
      expect(icon.getAttribute("class")).toContain(
        "icon.sprinkle_color_primary.textLow"
      );
      expect(icon.firstChild?.nodeName).toEqual("svg");
    });
  });

  describe("THEN should ensure the correct functioning of the toast", () => {
    it("THEN should run the toast removal animation and call the toast removal function", () => {
      makeSut({ id: "1", text: "Toast" });
      const toast = screen.getByTestId("toast-element");
      expect(toast.getAttribute("style")).toEqual("transform: translateY(0%);");
      act(() => {
        jest.advanceTimersByTime(4200);
      });
      expect(toast.getAttribute("style")).toEqual(
        "transform: translateY(300%);"
      );
      expect(mockedCloseToast).toBeCalledWith("1");
    });

    it("THEN should not run the toast removal animation and must not call the toast removal function", () => {
      makeSut({ id: "1", text: "Toast", autoClose: false });
      const toast = screen.getByTestId("toast-element");
      expect(toast.getAttribute("style")).toEqual("transform: translateY(0%);");
      act(() => {
        jest.advanceTimersByTime(4200);
      });
      expect(toast.getAttribute("style")).toEqual("transform: translateY(0%);");
      expect(mockedCloseToast).not.toBeCalled();
    });
  });
});

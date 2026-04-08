import React from "react";
import { render, screen, act } from "@testing-library/react";

import { useToast } from "../../hooks";
import { type ToastProps } from "../../toast.types";
import { type ToastBehavior } from "./toastProvider.types";
import { Toast } from "../../Toast";

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

const makeSut = (rest: ToastProps, behavior?: ToastBehavior) => {
  render(
    <Toast.Provider behavior={behavior}>
      <Button toast={rest} id={rest.id} />
    </Toast.Provider>
  );
};

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

describe("GIVEN <ToastProvider />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
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
      expect(icon.getAttribute("class")).toContain("color_neutral-textHigh");
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
      expect(icon.getAttribute("class")).toContain("color_neutral-textHigh");
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
      expect(icon.getAttribute("class")).toContain("color_neutral-textHigh");
      expect(icon.firstChild?.nodeName).toEqual("svg");
    });
  });

  describe("WHEN behavior is 'single'", () => {
    it("THEN should replace the existing toast with a new one", () => {
      const AddMultiple: React.FC = () => {
        const { addToast } = useToast();
        return (
          <>
            <button
              type="button"
              onClick={() =>
                addToast({ id: "1", text: "First toast", type: "primary" })
              }
            >
              add-first
            </button>
            <button
              type="button"
              onClick={() =>
                addToast({ id: "2", text: "Second toast", type: "success" })
              }
            >
              add-second
            </button>
          </>
        );
      };

      render(
        <Toast.Provider behavior="single">
          <AddMultiple />
        </Toast.Provider>
      );

      act(() => {
        screen.getByText("add-first").click();
      });
      expect(screen.getAllByTestId("toast-element")).toHaveLength(1);
      expect(screen.getByText("First toast")).toBeTruthy();

      act(() => {
        screen.getByText("add-second").click();
      });
      expect(screen.getAllByTestId("toast-element")).toHaveLength(1);
      expect(screen.getByText("Second toast")).toBeTruthy();
      expect(screen.queryByText("First toast")).toBeNull();
    });
  });

  describe("WHEN behavior is 'stacked' (default)", () => {
    it("THEN should pile up multiple toasts", () => {
      const AddMultiple: React.FC = () => {
        const { addToast } = useToast();
        return (
          <>
            <button
              type="button"
              onClick={() =>
                addToast({ id: "a", text: "Toast A", type: "primary" })
              }
            >
              add-a
            </button>
            <button
              type="button"
              onClick={() =>
                addToast({ id: "b", text: "Toast B", type: "success" })
              }
            >
              add-b
            </button>
          </>
        );
      };

      render(
        <Toast.Provider>
          <AddMultiple />
        </Toast.Provider>
      );

      act(() => {
        screen.getByText("add-a").click();
      });
      act(() => {
        screen.getByText("add-b").click();
      });

      expect(screen.getAllByTestId("toast-element")).toHaveLength(2);
      expect(screen.getByText("Toast A")).toBeTruthy();
      expect(screen.getByText("Toast B")).toBeTruthy();
    });
  });
});

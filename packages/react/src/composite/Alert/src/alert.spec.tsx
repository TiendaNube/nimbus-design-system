import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { Alert } from "./Alert";
import { type AlertProps } from "./alert.types";

const alertChildren = "myAlertChildren";
const alertTitle = "myAlertTitle";
const mockedRemoveAlert = jest.fn();

const makeSut = (
  rest?: Omit<AlertProps, "children">,
  children = alertChildren
) => {
  render(
    <Alert {...rest} data-testid="alert-element">
      {children}
    </Alert>
  );
};

describe("GIVEN <Alert />", () => {
  it("THEN should correctly render the title", () => {
    makeSut({ title: alertTitle });
    expect(screen.getByRole("heading").textContent).toBe(alertTitle);
  });

  it("THEN should correctly render the children", () => {
    makeSut();
    expect(screen.getByText(alertChildren).textContent).toBe(alertChildren);
  });

  it("THEN should correctly execute the onRemove function", () => {
    makeSut({ onRemove: mockedRemoveAlert });
    const dismissButton = screen.getByTestId("dismiss-alert-button");
    fireEvent.click(dismissButton);
    expect(mockedRemoveAlert).toBeCalled();
  });

  describe("THEN should correctly render the appearance", () => {
    it("THEN should correctly render the appearance base", () => {
      makeSut();
      expect(screen.getByRole("status").getAttribute("class")).toContain(
        "appearance_neutral"
      );
    });

    it("THEN should correctly render the appearance neutral", () => {
      makeSut({ appearance: "neutral" });
      expect(screen.getByRole("status").getAttribute("class")).toContain(
        "appearance_neutral"
      );
    });

    it("THEN should correctly render the appearance primary", () => {
      makeSut({ appearance: "primary" });
      expect(screen.getByRole("status").getAttribute("class")).toContain(
        "appearance_primary"
      );
    });

    it("THEN should correctly render the appearance success", () => {
      makeSut({ appearance: "success" });
      expect(screen.getByRole("status").getAttribute("class")).toContain(
        "appearance_success"
      );
    });

    it("THEN should correctly render the appearance warning", () => {
      makeSut({ appearance: "warning" });
      expect(screen.getByRole("alert").getAttribute("class")).toContain(
        "appearance_warning"
      );
    });

    it("THEN should correctly render the appearance danger", () => {
      makeSut({ appearance: "danger" });
      expect(screen.getByRole("alert").getAttribute("class")).toContain(
        "appearance_danger"
      );
    });
  });

  describe("THEN should correctly render or not based on the show property", () => {
    it("THEN should correctly render if show is true", () => {
      makeSut({ show: true });
      expect(screen.getByRole("status")).toBeTruthy();
    });

    it("THEN should not render if show is false", () => {
      makeSut({ show: false });
      expect(screen.queryByRole("status")).toBeNull();
    });
  });
});

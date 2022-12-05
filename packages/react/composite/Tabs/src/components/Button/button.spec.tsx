import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { Button } from "./Button";
import { ButtonProps } from "./button.types";

const buttonLabel = "myButtonLabel";
const mockedSetActiveTab = jest.fn();

const makeSut = (
  rest?: Omit<ButtonProps, "label" | "index" | "setActiveTab">,
  label = buttonLabel,
  index = 1,
  setActiveTab = mockedSetActiveTab
) => {
  render(
    <Button
      {...rest}
      label={label}
      index={index}
      data-testid="button-element"
      setActiveTab={setActiveTab}
    />
  );
};

describe("GIVEN <Button />", () => {
  it("THEN should correctly render the label", () => {
    makeSut();
    expect(screen.getByRole("tab").textContent).toContain(buttonLabel);
  });

  it("THEN should correctly render the active property", () => {
    makeSut({ active: true });
    expect(screen.getByRole("tab").getAttribute("class")).toContain("active");
  });

  it("THEN should correctly render the fullWidth property", () => {
    makeSut({ fullWidth: true });
    expect(screen.getByRole("presentation").getAttribute("class")).toContain(
      "fullWidth"
    );
  });

  it("THEN should correctly execute the setActiveTab function", () => {
    makeSut();
    const tabButton = screen.getByRole("tab");
    fireEvent.click(tabButton);
    expect(mockedSetActiveTab).toBeCalled();
  });
});

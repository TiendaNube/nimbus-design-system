import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { SplitButton } from "../../SplitButton";

const primaryButtonText = "Save";
const mockedPrimaryClick = jest.fn();

const makeSut = () => {
  render(
    <SplitButton>
      <SplitButton.Primary onClick={mockedPrimaryClick}>
        {primaryButtonText}
      </SplitButton.Primary>
      <SplitButton.Secondary>
        <SplitButton.Action>Action 1</SplitButton.Action>
      </SplitButton.Secondary>
    </SplitButton>
  );
};

describe("GIVEN <SplitButton.Primary />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("WHEN rendered", () => {
    it("THEN should display the primary button text", () => {
      makeSut();
      expect(screen.getByText(primaryButtonText)).toBeTruthy();
    });
  });

  describe("WHEN primary button is clicked", () => {
    it("THEN should execute the onClick callback", () => {
      makeSut();
      const primaryButton = screen.getByText(primaryButtonText);
      fireEvent.click(primaryButton);
      expect(mockedPrimaryClick).toHaveBeenCalledTimes(1);
    });

    it("THEN should not open the popover", () => {
      makeSut();
      const primaryButton = screen.getByText(primaryButtonText);
      fireEvent.click(primaryButton);
      expect(screen.queryByText("Action 1")).toBeNull();
    });
  });

  describe("WHEN disabled prop is true", () => {
    it("THEN should disable the primary button", () => {
      render(
        <SplitButton disabled>
          <SplitButton.Primary onClick={mockedPrimaryClick}>
            {primaryButtonText}
          </SplitButton.Primary>
          <SplitButton.Secondary>
            <SplitButton.Action>Action 1</SplitButton.Action>
          </SplitButton.Secondary>
        </SplitButton>
      );
      const primaryButton = screen.getByText(primaryButtonText);
      expect(primaryButton).toBeDisabled();
    });

    it("THEN should not execute onClick when primary button is clicked", () => {
      render(
        <SplitButton disabled>
          <SplitButton.Primary onClick={mockedPrimaryClick}>
            {primaryButtonText}
          </SplitButton.Primary>
          <SplitButton.Secondary>
            <SplitButton.Action>Action 1</SplitButton.Action>
          </SplitButton.Secondary>
        </SplitButton>
      );
      const primaryButton = screen.getByText(primaryButtonText);
      fireEvent.click(primaryButton);
      expect(mockedPrimaryClick).not.toHaveBeenCalled();
    });
  });
});

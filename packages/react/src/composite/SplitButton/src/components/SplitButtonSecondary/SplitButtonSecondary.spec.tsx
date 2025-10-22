import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { SplitButton } from "../../SplitButton";

const action1Text = "Save as draft";
const action2Text = "Save and publish";

const makeSut = (disabled?: boolean) => {
  render(
    <SplitButton disabled={disabled}>
      <SplitButton.Primary>Save</SplitButton.Primary>
      <SplitButton.Secondary>
        <SplitButton.Action>{action1Text}</SplitButton.Action>
        <SplitButton.Action>{action2Text}</SplitButton.Action>
      </SplitButton.Secondary>
    </SplitButton>
  );
};

describe("GIVEN <SplitButton.Secondary />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("WHEN rendered", () => {
    it("THEN should display the dropdown icon button", () => {
      makeSut();
      const iconButton = screen.getByLabelText("Show more actions");
      expect(iconButton).toBeTruthy();
    });

    it("THEN should not display actions initially", () => {
      makeSut();
      expect(screen.queryByText(action1Text)).toBeNull();
      expect(screen.queryByText(action2Text)).toBeNull();
    });
  });

  describe("WHEN dropdown icon button is clicked", () => {
    it("THEN should open the popover and display actions", async () => {
      makeSut();
      const iconButton = screen.getByLabelText("Show more actions");
      fireEvent.click(iconButton);

      await waitFor(() => {
        expect(screen.getByText(action1Text)).toBeTruthy();
        expect(screen.getByText(action2Text)).toBeTruthy();
      });
    });

    it("THEN should update aria-expanded attribute", async () => {
      makeSut();
      const iconButton = screen.getByLabelText("Show more actions");

      expect(iconButton.getAttribute("aria-expanded")).toBe("false");

      fireEvent.click(iconButton);

      await waitFor(() => {
        expect(iconButton.getAttribute("aria-expanded")).toBe("true");
      });
    });
  });

  describe("WHEN disabled prop is true", () => {
    it("THEN should disable the dropdown icon button", () => {
      makeSut(true);
      const iconButton = screen.getByLabelText("Show more actions");
      expect(iconButton).toBeDisabled();
    });
  });

  describe("WHEN custom ariaLabel is provided", () => {
    it("THEN should use the custom ariaLabel", () => {
      render(
        <SplitButton>
          <SplitButton.Primary>Save</SplitButton.Primary>
          <SplitButton.Secondary ariaLabel="Custom label">
            <SplitButton.Action>{action1Text}</SplitButton.Action>
          </SplitButton.Secondary>
        </SplitButton>
      );
      expect(screen.getByLabelText("Custom label")).toBeTruthy();
    });
  });
});

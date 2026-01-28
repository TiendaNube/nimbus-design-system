import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { SplitButton } from "./SplitButton";
import type { SplitButtonProps } from "./splitButton.types";

const primaryButtonText = "Save";
const action1Text = "Save as draft";
const action2Text = "Save and publish";

const makeSut = (rest?: Omit<SplitButtonProps, "children">) => {
  render(
    <SplitButton {...rest} data-testid="split-button-element">
      <SplitButton.Primary>{primaryButtonText}</SplitButton.Primary>
      <SplitButton.Secondary>
        <SplitButton.Action>{action1Text}</SplitButton.Action>
        <SplitButton.Action>{action2Text}</SplitButton.Action>
      </SplitButton.Secondary>
    </SplitButton>
  );
};

describe("GIVEN <SplitButton />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("WHEN controlled with open prop", () => {
    it("THEN should display actions when open is true", async () => {
      makeSut({ open: true });

      await waitFor(() => {
        expect(screen.getByText(action1Text)).toBeTruthy();
        expect(screen.getByText(action2Text)).toBeTruthy();
      });
    });

    it("THEN should not display actions when open is false", () => {
      makeSut({ open: false });
      expect(screen.queryByText(action1Text)).toBeNull();
      expect(screen.queryByText(action2Text)).toBeNull();
    });

    it("THEN should call onOpenChange when dropdown is clicked", async () => {
      const mockedOnOpenChange = jest.fn();
      makeSut({ onOpenChange: mockedOnOpenChange });

      const iconButton = screen.getByLabelText("Show more actions");
      fireEvent.click(iconButton);

      await waitFor(() => {
        expect(mockedOnOpenChange).toHaveBeenCalledWith(true);
      });
    });
  });

  describe("WHEN no secondary button is provided", () => {
    it("THEN should not render the dropdown icon button", () => {
      render(
        <SplitButton>
          <SplitButton.Primary>{primaryButtonText}</SplitButton.Primary>
        </SplitButton>
      );

      expect(screen.queryByLabelText("Show more actions")).toBeNull();
    });

    it("THEN should only render the primary button", () => {
      render(
        <SplitButton>
          <SplitButton.Primary>{primaryButtonText}</SplitButton.Primary>
        </SplitButton>
      );

      expect(screen.getByText(primaryButtonText)).toBeTruthy();
    });
  });

  describe("WHEN position prop is provided", () => {
    it("THEN should render popover in the specified position", async () => {
      makeSut({ popoverPosition: "top" });
      const iconButton = screen.getByLabelText("Show more actions");
      fireEvent.click(iconButton);

      await waitFor(() => {
        expect(screen.getByText(action1Text)).toBeTruthy();
      });
    });
  });

  describe("WHEN disabled prop is true", () => {
    it("THEN should disable both buttons through context", () => {
      makeSut({ disabled: true });
      const primaryButton = screen.getByText(primaryButtonText);
      const iconButton = screen.getByLabelText("Show more actions");

      expect(primaryButton).toBeDisabled();
      expect(iconButton).toBeDisabled();
    });
  });
});

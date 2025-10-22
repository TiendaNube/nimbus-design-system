import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { SplitButton } from "../../SplitButton";

const action1Text = "Save as draft";
const mockedAction1Click = jest.fn();

describe("GIVEN <SplitButton.Action />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("WHEN an action is clicked", () => {
    it("THEN should execute the action onClick callback", async () => {
      render(
        <SplitButton>
          <SplitButton.Primary>Save</SplitButton.Primary>
          <SplitButton.Secondary>
            <SplitButton.Action onClick={mockedAction1Click}>
              {action1Text}
            </SplitButton.Action>
          </SplitButton.Secondary>
        </SplitButton>
      );

      const iconButton = screen.getByLabelText("Show more actions");
      fireEvent.click(iconButton);

      await waitFor(() => {
        const action1 = screen.getByText(action1Text);
        fireEvent.click(action1);
        expect(mockedAction1Click).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("WHEN SplitButton.Action has an icon", () => {
    it("THEN should render the action with icon", async () => {
      render(
        <SplitButton>
          <SplitButton.Primary>Save</SplitButton.Primary>
          <SplitButton.Secondary>
            <SplitButton.Action
              icon={<div data-testid="test-icon">Icon</div>}
              onClick={mockedAction1Click}
            >
              {action1Text}
            </SplitButton.Action>
          </SplitButton.Secondary>
        </SplitButton>
      );

      const iconButton = screen.getByLabelText("Show more actions");
      fireEvent.click(iconButton);

      await waitFor(() => {
        expect(screen.getByText(action1Text)).toBeTruthy();
        expect(screen.getByTestId("test-icon")).toBeTruthy();
      });
    });
  });

  describe("WHEN SplitButton.Action is disabled", () => {
    it("THEN should not execute onClick callback", async () => {
      render(
        <SplitButton>
          <SplitButton.Primary>Save</SplitButton.Primary>
          <SplitButton.Secondary>
            <SplitButton.Action disabled onClick={mockedAction1Click}>
              {action1Text}
            </SplitButton.Action>
          </SplitButton.Secondary>
        </SplitButton>
      );

      const iconButton = screen.getByLabelText("Show more actions");
      fireEvent.click(iconButton);

      await waitFor(() => {
        const action1 = screen.getByText(action1Text);
        fireEvent.click(action1);
        expect(mockedAction1Click).not.toHaveBeenCalled();
      });
    });

    it("THEN should have disabled styling", async () => {
      render(
        <SplitButton>
          <SplitButton.Primary>Save</SplitButton.Primary>
          <SplitButton.Secondary>
            <SplitButton.Action disabled onClick={mockedAction1Click}>
              {action1Text}
            </SplitButton.Action>
          </SplitButton.Secondary>
        </SplitButton>
      );

      const iconButton = screen.getByLabelText("Show more actions");
      fireEvent.click(iconButton);

      await waitFor(() => {
        const action1 = screen.getByText(action1Text).closest("button");
        expect(action1).toBeDisabled();
      });
    });
  });
});

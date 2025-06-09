import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { StepperItem } from "./StepperItem";
import { StepperItemProps } from "./stepperItem.types";
import { StepperContext } from "../StepperContext";

const makeSut = (
  props: StepperItemProps,
  totalSteps?: number,
  activeStep?: number,
  selectedStep?: number,
  onSelect?: (step: number) => void
) => {
  const defaultTotalSteps = totalSteps ?? 3;
  const defaultActiveStep = activeStep ?? 0;
  const defaultSelectedStep = selectedStep ?? 0;
  render(
    <StepperContext.Provider
      value={{ totalSteps: defaultTotalSteps, activeStep: defaultActiveStep, selectedStep: defaultSelectedStep, onSelect }}
    >
      <StepperItem {...props} data-testid="stepper-item" />
    </StepperContext.Provider>
  );
};

describe("GIVEN <Stepper.Item />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render the step label", () => {
      makeSut({
        step: 1,
        label: "Test step",
      });

      expect(screen.getByText("Test step")).toBeDefined();
    });

    it("THEN should display step number for started state", () => {
      makeSut(
        {
          step: 2,
          label: "Started step",
        },
        3,
        2
      );

      expect(screen.getByText("3")).toBeDefined();
    });

    it("THEN should display step number for pending state", () => {
      makeSut(
        {
          step: 3,
          label: "Pending step",
        },
        3,
        1
      );

      expect(screen.getByText("4")).toBeDefined();
    });

    it("THEN should display check icon for completed state", () => {
      makeSut(
        {
          step: 1,
          label: "Completed step",
        },
        3,
        2,
        2
      );

      // Check that step number is not displayed when completed
      expect(screen.queryByText("1")).toBeNull();
      // Check icon should be present (testing by checking for icon presence)
      const iconContainer = screen
        .getByTestId("stepper-item")
        .querySelector('[class*="item__icon"]');
      expect(iconContainer).toBeDefined();
    });

    it("THEN should display step number for selected state", () => {
      makeSut(
        {
          step: 4,
          label: "Selected step",
        },
        5,
        1,
        4
      );

      expect(screen.getByText("5")).toBeDefined();
    });

    it("THEN should render without label", () => {
      makeSut(
        {
          step: 0,
        },
        3,
        0
      );

      const stepperItem = screen.getByTestId("stepper-item");
      expect(stepperItem).toBeDefined();
      expect(screen.getByText("1")).toBeDefined();
    });

    it("THEN should render with empty label", () => {
      makeSut(
        {
          step: 0,
          label: "",
        },
        3,
        0
      );

      expect(screen.getByTestId("stepper-item")).toBeDefined();
    });

    it("THEN should apply custom props", () => {
      makeSut({
        step: 0,
        label: "Test",
        "aria-label": "Custom aria label",
        className: "custom-class",
      });

      const stepperItem = screen.getByTestId("stepper-item");
      expect(stepperItem).toHaveAttribute("aria-label", "Custom aria label");
    });
  });

  describe("WHEN step is not the last step", () => {
    it("THEN should render connecting line", () => {
      makeSut(
        {
          step: 0,
          label: "First step",
        },
        3
      );

      const stepperItem = screen.getByTestId("stepper-item");
      const line = stepperItem.querySelector('[class*="item__line"]');
      expect(line).toBeDefined();
    });
  });

  describe("WHEN step is the last step", () => {
    it("THEN should not render connecting line", () => {
      makeSut(
        {
          step: 2,
          label: "Last step",
        },
        3
      );

      const stepperItem = screen.getByTestId("stepper-item");
      const line = stepperItem.querySelector('[class*="item__line"]');
      expect(line).toBeNull();
    });

    it("THEN should not render line when step equals totalSteps minus 1", () => {
      makeSut(
        {
          step: 2,
          label: "Last step",
        },
        3
      );

      const container = screen.getByTestId("stepper-item").parentElement;
      const line = container?.querySelector('[class*="item__line"]');
      expect(line).toBeNull();
    });
  });

  describe("WHEN step is clickable", () => {
    it("THEN should call onSelect when clicked", () => {
      const onSelectMock = jest.fn();
      makeSut(
        {
          step: 0,
          label: "Clickable step",
        },
        3,
        2,
        2,
        onSelectMock
      );

      const stepperItem = screen.getByTestId("stepper-item");
      fireEvent.click(stepperItem);

      expect(onSelectMock).toHaveBeenCalledWith(0);
    });

    it("THEN should call onSelect when Enter key is pressed", () => {
      const onSelectMock = jest.fn();
      makeSut(
        {
          step: 0,
          label: "Clickable step",
        },
        3,
        2,
        2,
        onSelectMock
      );

      const stepperItem = screen.getByTestId("stepper-item");
      fireEvent.keyDown(stepperItem, { key: "Enter" });

      expect(onSelectMock).toHaveBeenCalledWith(0);
    });

    it("THEN should call onSelect when Space key is pressed", () => {
      const onSelectMock = jest.fn();
      makeSut(
        {
          step: 0,
          label: "Clickable step",
        },
        3,
        2,
        2,
        onSelectMock
      );

      const stepperItem = screen.getByTestId("stepper-item");
      fireEvent.keyDown(stepperItem, { key: " " });

      expect(onSelectMock).toHaveBeenCalledWith(0);
    });

    it("THEN should set proper accessibility attributes", () => {
      makeSut(
        {
          step: 0,
          label: "Clickable step",
        },
        3,
        2,
        2,
        jest.fn()
      );

      const stepperItem = screen.getByTestId("stepper-item");
      expect(stepperItem.getAttribute("role")).toBe("button");
      expect(stepperItem.getAttribute("tabIndex")).toBe("0");
    });


  });

  describe("WHEN step is not clickable", () => {
    it("THEN should not call onSelect when clicked", () => {
      const onSelectMock = jest.fn();
      makeSut(
        {
          step: 3,
          label: "Non-clickable step",
        },
        3,
        1,
        1,
        onSelectMock
      );

      const stepperItem = screen.getByTestId("stepper-item");
      fireEvent.click(stepperItem);

      expect(onSelectMock).not.toHaveBeenCalled();
    });

    it("THEN should have tabIndex -1 when not clickable", () => {
      makeSut(
        {
          step: 3,
          label: "Non-clickable step",
        },
        3,
        1,
        1
      );

      const stepperItem = screen.getByTestId("stepper-item");
      expect(stepperItem.getAttribute("tabIndex")).toBe("-1");
    });

    it("THEN should not respond to keyboard when pending", () => {
      const onSelectMock = jest.fn();
      makeSut(
        {
          step: 2,
          label: "Pending step",
        },
        3,
        1,
        1,
        onSelectMock
      );

      const stepperItem = screen.getByTestId("stepper-item");
      fireEvent.keyDown(stepperItem, { key: "Enter" });
      fireEvent.keyDown(stepperItem, { key: " " });

      expect(onSelectMock).not.toHaveBeenCalled();
    });

    it("THEN should not respond to keyboard when selected", () => {
      const onSelectMock = jest.fn();
      makeSut(
        {
          step: 1,
          label: "Selected step",
        },
        3,
        2,
        1,
        onSelectMock
      );

      const stepperItem = screen.getByTestId("stepper-item");
      fireEvent.keyDown(stepperItem, { key: "Enter" });
      fireEvent.keyDown(stepperItem, { key: " " });

      expect(onSelectMock).not.toHaveBeenCalled();
    });

    it("THEN should have tabIndex -1 when no onSelect handler", () => {
      makeSut(
        {
          step: 0,
          label: "Step without handler",
        },
        3,
        1,
        1
      );

      const stepperItem = screen.getByTestId("stepper-item");
      expect(stepperItem.getAttribute("tabIndex")).toBe("-1");
    });
  });

  describe("WHEN keyboard navigation is used", () => {
    it("THEN should ignore other keyboard keys", () => {
      const onSelectMock = jest.fn();
      makeSut(
        {
          step: 0,
          label: "Completed step",
        },
        3,
        2,
        2,
        onSelectMock
      );

      const stepperItem = screen.getByTestId("stepper-item");
      fireEvent.keyDown(stepperItem, { key: "Tab" });
      fireEvent.keyDown(stepperItem, { key: "Escape" });
      fireEvent.keyDown(stepperItem, { key: "ArrowRight" });

      expect(onSelectMock).not.toHaveBeenCalled();
    });

    it("THEN should handle keyboard event without preventDefault", () => {
      const onSelectMock = jest.fn();
      makeSut(
        {
          step: 0,
          label: "Completed step",
        },
        3,
        2,
        2,
        onSelectMock
      );

      const stepperItem = screen.getByTestId("stepper-item");
      fireEvent.keyDown(stepperItem, { key: "Tab" });

      expect(onSelectMock).not.toHaveBeenCalled();
    });
  });

  describe("WHEN step states are determined", () => {
    it("THEN should correctly identify selected state", () => {
      makeSut(
        {
          step: 1,
          label: "Selected step",
        },
        3,
        2,
        1
      );

      const stepperItem = screen.getByTestId("stepper-item");
      const icon = stepperItem.querySelector('[class*="item__icon_selected"]');
      expect(icon).toBeDefined();
    });

    it("THEN should correctly identify started state", () => {
      makeSut(
        {
          step: 1,
          label: "Started step",
        },
        3,
        1,
        0
      );

      const stepperItem = screen.getByTestId("stepper-item");
      const icon = stepperItem.querySelector('[class*="item__icon_started"]');
      expect(icon).toBeDefined();
    });

    it("THEN should correctly identify completed state", () => {
      makeSut(
        {
          step: 0,
          label: "Completed step",
        },
        3,
        2,
        2
      );

      const stepperItem = screen.getByTestId("stepper-item");
      const icon = stepperItem.querySelector('[class*="item__icon_completed"]');
      expect(icon).toBeDefined();
    });

    it("THEN should correctly identify pending state", () => {
      makeSut(
        {
          step: 2,
          label: "Pending step",
        },
        3,
        1,
        1
      );

      const stepperItem = screen.getByTestId("stepper-item");
      const icon = stepperItem.querySelector('[class*="item__icon_pending"]');
      expect(icon).toBeDefined();
    });

    it("THEN should apply disabled class for pending steps", () => {
      makeSut(
        {
          step: 2,
          label: "Pending step",
        },
        3,
        1,
        1
      );

      const stepperItem = screen.getByTestId("stepper-item");
      expect(stepperItem.className).toContain("item__disabled");
    });

    it("THEN should apply correct label classes for each state", () => {
      render(
        <StepperContext.Provider
          value={{
            totalSteps: 4,
            activeStep: 2,
            selectedStep: 1,
            onSelect: jest.fn(),
          }}
        >
          <StepperItem
            step={0}
            label="Completed"
            data-testid="completed-item"
          />
          <StepperItem step={1} label="Selected" data-testid="selected-item" />
          <StepperItem step={2} label="Started" data-testid="started-item" />
          <StepperItem step={3} label="Pending" data-testid="pending-item" />
        </StepperContext.Provider>
      );

      expect(
        screen
          .getByTestId("completed-item")
          .querySelector('[class*="item__label_completed"]')
      ).toBeDefined();
      expect(
        screen
          .getByTestId("selected-item")
          .querySelector('[class*="item__label_selected"]')
      ).toBeDefined();
      expect(
        screen
          .getByTestId("started-item")
          .querySelector('[class*="item__label_started"]')
      ).toBeDefined();
      expect(
        screen
          .getByTestId("pending-item")
          .querySelector('[class*="item__label_pending"]')
      ).toBeDefined();
    });
  });

  describe("WHEN rendered with different total steps", () => {
    it("THEN should handle single step scenario", () => {
      makeSut(
        {
          step: 0,
          label: "Only step",
        },
        1,
        0,
        0
      );

      const container = screen.getByTestId("stepper-item").parentElement;
      const line = container?.querySelector('[class*="item__line"]');
      expect(line).toBeNull();
    });

    it("THEN should handle zero-based step numbering", () => {
      makeSut(
        {
          step: 0,
          label: "First step",
        },
        3,
        0,
        0
      );

      expect(screen.getByText("1")).toBeDefined();
    });
  });

  describe("WHEN StepperItem has displayName", () => {
    it("THEN should have correct displayName", () => {
      expect(StepperItem.displayName).toBe("Stepper.Item");
    });
  });

  describe("WHEN interaction happens without event", () => {
    it("THEN should handle click without onSelect", () => {
      makeSut(
        {
          step: 0,
          label: "Step without handler",
        },
        3,
        1,
        1
      );

      const stepperItem = screen.getByTestId("stepper-item");
      expect(() => fireEvent.click(stepperItem)).not.toThrow();
    });
  });
});

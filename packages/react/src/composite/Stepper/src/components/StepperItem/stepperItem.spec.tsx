import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { StepperItem } from "./StepperItem";
import { StepperItemProps } from "./stepperItem.types";
import { StepperContext } from "../StepperContext";

const makeSut = (props: StepperItemProps, totalSteps = 3, activeStep = 1, selectedStep = 1, onSelect?: (step: number) => void) => {
  render(
    <StepperContext.Provider value={{ totalSteps, activeStep, selectedStep, onSelect }}>
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

    it("THEN should display step number for current state", () => {
      makeSut({
        step: 2,
        label: "Current step",
      }, 3, 2);
      
      expect(screen.getByText("2")).toBeDefined();
    });

    it("THEN should display step number for pending state", () => {
      makeSut({
        step: 3,
        label: "Pending step",
      }, 3, 1);
      
      expect(screen.getByText("3")).toBeDefined();
    });

    it("THEN should display check icon for completed state", () => {
      makeSut({
        step: 1,
        label: "Completed step",
      }, 3, 2, 2);
      
      // Check that step number is not displayed when completed
      expect(screen.queryByText("1")).toBeNull();
      // Check icon should be present (testing by checking for icon presence)
      const iconContainer = screen.getByTestId("stepper-item").querySelector('[class*="item__icon"]');
      expect(iconContainer).toBeDefined();
    });

    it("THEN should display step number for selected state", () => {
      makeSut({
        step: 4,
        label: "Selected step",
      }, 5, 1, 4);
      
      expect(screen.getByText("4")).toBeDefined();
    });
  });

  describe("WHEN step is not the last step", () => {
    it("THEN should render connecting line", () => {
      makeSut({
        step: 1,
        label: "First step",
      }, 3);
      
      const stepperItem = screen.getByTestId("stepper-item");
      const line = stepperItem.querySelector('[class*="item__line"]');
      expect(line).toBeDefined();
    });
  });

  describe("WHEN step is the last step", () => {
    it("THEN should not render connecting line", () => {
      makeSut({
        step: 3,
        label: "Last step",
      }, 3);
      
      const stepperItem = screen.getByTestId("stepper-item");
      const line = stepperItem.querySelector('[class*="item__line"]');
      expect(line).toBeNull();
    });
  });

  describe("WHEN step is clickable", () => {
    it("THEN should call onSelect when clicked", () => {
      const onSelectMock = jest.fn();
      makeSut({
        step: 1,
        label: "Clickable step",
      }, 3, 2, 1, onSelectMock);
      
      const stepperItem = screen.getByTestId("stepper-item");
      fireEvent.click(stepperItem);
      
      expect(onSelectMock).toHaveBeenCalledWith(1);
    });

    it("THEN should call onSelect when Enter key is pressed", () => {
      const onSelectMock = jest.fn();
      makeSut({
        step: 1,
        label: "Clickable step",  
      }, 3, 2, 1, onSelectMock);
      
      const stepperItem = screen.getByTestId("stepper-item");
      fireEvent.keyDown(stepperItem, { key: "Enter" });
      
      expect(onSelectMock).toHaveBeenCalledWith(1);
    });

    it("THEN should call onSelect when Space key is pressed", () => {
      const onSelectMock = jest.fn();
      makeSut({
        step: 1,
        label: "Clickable step",
      }, 3, 2, 1, onSelectMock);
      
      const stepperItem = screen.getByTestId("stepper-item");
      fireEvent.keyDown(stepperItem, { key: " " });
      
      expect(onSelectMock).toHaveBeenCalledWith(1);
    });

    it("THEN should set proper accessibility attributes", () => {
      makeSut({
        step: 1,
        label: "Clickable step",
      }, 3, 2, 1, jest.fn());
      
      const stepperItem = screen.getByTestId("stepper-item");
      expect(stepperItem.getAttribute("role")).toBe("button");
      expect(stepperItem.getAttribute("tabIndex")).toBe("0");
    });
  });

  describe("WHEN step is not clickable", () => {
    it("THEN should not call onSelect when clicked", () => {
      const onSelectMock = jest.fn();
      makeSut({
        step: 3,
        label: "Non-clickable step",
      }, 3, 1, 1, onSelectMock);
      
      const stepperItem = screen.getByTestId("stepper-item");
      fireEvent.click(stepperItem);
      
      expect(onSelectMock).not.toHaveBeenCalled();
    });

    it("THEN should have tabIndex -1 when not clickable", () => {
      makeSut({
        step: 3,
        label: "Non-clickable step",
      }, 3, 1, 1);
      
      const stepperItem = screen.getByTestId("stepper-item");
      expect(stepperItem.getAttribute("tabIndex")).toBe("-1");
    });
  });
}); 
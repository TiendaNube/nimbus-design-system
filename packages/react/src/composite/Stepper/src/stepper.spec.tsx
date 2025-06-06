import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { Stepper } from "./Stepper";
import { BaseStepperProperties, ControlledStepperProperties } from "./stepper.types";

const makeUncontrolledSut = (props: BaseStepperProperties) => {
  render(<Stepper {...props} data-testid="stepper-element" />);
};

const makeControlledSut = (props: ControlledStepperProperties) => {
  render(<Stepper {...props} data-testid="stepper-element" />);
};

describe("GIVEN <Stepper />", () => {
  describe("WHEN rendered in uncontrolled mode", () => {
    it("THEN should correctly render the stepper container", () => {
      makeUncontrolledSut({
        activeStep: 2,
        children: (
          <>
            <Stepper.Item label="First step" />
            <Stepper.Item label="Second step" />
            <Stepper.Item label="Third step" />
          </>
        ),
      });

      expect(screen.getByTestId("stepper-element")).toBeDefined();
      expect(screen.getByText("First step")).toBeDefined();
      expect(screen.getByText("Second step")).toBeDefined();
      expect(screen.getByText("Third step")).toBeDefined();
    });

    it("THEN should correctly set aria attributes", () => {
      makeUncontrolledSut({
        activeStep: 2,
        children: (
          <>
            <Stepper.Item label="Step 1" />
            <Stepper.Item label="Step 2" />
            <Stepper.Item label="Step 3" />
          </>
        ),
      });

      const stepper = screen.getByTestId("stepper-element");
      expect(stepper.getAttribute("role")).toBe("progressbar");
      expect(stepper.getAttribute("aria-valuenow")).toBe("2");
      expect(stepper.getAttribute("aria-valuemin")).toBe("1");
      expect(stepper.getAttribute("aria-valuemax")).toBe("3");
      expect(stepper.getAttribute("aria-label")).toBe("Step 2 of 3");
    });
  });

  describe("WHEN rendered in controlled mode", () => {
    const mockOnSelectStep = jest.fn();

    beforeEach(() => {
      mockOnSelectStep.mockClear();
    });

    it("THEN should correctly render with controlled state", () => {
      makeControlledSut({
        activeStep: 2,
        selectedStep: 1,
        onSelectStep: mockOnSelectStep,
        children: (
          <>
            <Stepper.Item label="First step" />
            <Stepper.Item label="Second step" />
            <Stepper.Item label="Third step" />
          </>
        ),
      });

      expect(screen.getByTestId("stepper-element")).toBeDefined();
      expect(screen.getByText("First step")).toBeDefined();
      expect(screen.getByText("Second step")).toBeDefined();
      expect(screen.getByText("Third step")).toBeDefined();
    });

    it("THEN should call onSelectStep when a step is clicked", () => {
      makeControlledSut({
        activeStep: 3,
        selectedStep: 1,
        onSelectStep: mockOnSelectStep,
        children: (
          <>
            <Stepper.Item label="Completed step" />
            <Stepper.Item label="Another completed step" />
            <Stepper.Item label="Current step" />
          </>
        ),
      });

      // Click on the first completed step
      const firstStep = screen.getByText("Completed step");
      fireEvent.click(firstStep);

      expect(mockOnSelectStep).toHaveBeenCalledWith(1);
    });
  });

  describe("WHEN step states are rendered", () => {
    it("THEN should show step numbers for current and pending steps", () => {
      makeUncontrolledSut({
        activeStep: 2,
        children: (
          <>
            <Stepper.Item label="Completed step" />
            <Stepper.Item label="Current step" />
            <Stepper.Item label="Pending step" />
          </>
        ),
      });

      expect(screen.getByText("2")).toBeDefined(); // Current step shows number
      expect(screen.getByText("3")).toBeDefined(); // Pending step shows number
    });
  });
});


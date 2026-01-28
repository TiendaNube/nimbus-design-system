import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { Stepper } from "./Stepper";
import type {
  BaseStepperProperties,
  ControlledStepperProperties,
} from "./stepper.types";

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
        children: [
          <Stepper.Item key="1" label="First step" />,
          <Stepper.Item key="2" label="Second step" />,
          <Stepper.Item key="3" label="Third step" />,
        ],
      });

      expect(screen.getByTestId("stepper-element")).toBeDefined();
      expect(screen.getByText("First step")).toBeDefined();
      expect(screen.getByText("Second step")).toBeDefined();
      expect(screen.getByText("Third step")).toBeDefined();
    });

    it("THEN should correctly set aria attributes", () => {
      makeUncontrolledSut({
        activeStep: 1,
        children: [
          <Stepper.Item key="1" label="Step 1" />,
          <Stepper.Item key="2" label="Step 2" />,
          <Stepper.Item key="3" label="Step 3" />,
        ],
      });

      const stepper = screen.getByTestId("stepper-element");
      expect(stepper.getAttribute("role")).toBe("progressbar");
      expect(stepper.getAttribute("aria-valuenow")).toBe("2");
      expect(stepper.getAttribute("aria-valuemin")).toBe("1");
      expect(stepper.getAttribute("aria-valuemax")).toBe("3");
      expect(stepper.getAttribute("aria-label")).toBe(
        "Multi-step process: Step 2 of 3"
      );
    });

    it("THEN should render with single step", () => {
      makeUncontrolledSut({
        activeStep: 0,
        children: [<Stepper.Item key="1" label="Only step" />],
      });

      expect(screen.getByText("Only step")).toBeDefined();
      const stepper = screen.getByTestId("stepper-element");
      expect(stepper.getAttribute("aria-valuemax")).toBe("1");
    });

    it("THEN should handle activeStep 0", () => {
      makeUncontrolledSut({
        activeStep: 0,
        children: [
          <Stepper.Item key="1" label="Started step" />,
          <Stepper.Item key="2" label="Pending step" />,
        ],
      });

      const stepper = screen.getByTestId("stepper-element");
      expect(stepper.getAttribute("aria-valuenow")).toBe("1");
      expect(stepper.getAttribute("aria-label")).toBe(
        "Multi-step process: Step 1 of 2"
      );
    });

    it("THEN should handle maximum activeStep", () => {
      makeUncontrolledSut({
        activeStep: 2,
        children: [
          <Stepper.Item key="1" label="Completed" />,
          <Stepper.Item key="2" label="Completed" />,
          <Stepper.Item key="3" label="Started" />,
        ],
      });

      const stepper = screen.getByTestId("stepper-element");
      expect(stepper.getAttribute("aria-valuenow")).toBe("3");
      expect(stepper.getAttribute("aria-valuemax")).toBe("3");
    });

    it("THEN should apply additional props to container", () => {
      makeUncontrolledSut({
        activeStep: 0,
        children: [<Stepper.Item key="1" label="Step" />],
      });

      const stepper = screen.getByTestId("stepper-element");
      expect(stepper).toHaveAttribute("role", "progressbar");
      expect(stepper).toHaveAttribute("aria-valuenow", "1");
      expect(stepper).toHaveAttribute("aria-valuemax", "1");
    });

    it("THEN should update internal state when activeStep changes", () => {
      const { rerender } = render(
        <Stepper activeStep={0} data-testid="stepper-element">
          <Stepper.Item key="1" label="Step 1" />
          <Stepper.Item key="2" label="Step 2" />
        </Stepper>
      );

      let stepper = screen.getByTestId("stepper-element");
      expect(stepper.getAttribute("aria-valuenow")).toBe("1");

      rerender(
        <Stepper activeStep={1} data-testid="stepper-element">
          <Stepper.Item key="1" label="Step 1" />
          <Stepper.Item key="2" label="Step 2" />
        </Stepper>
      );

      stepper = screen.getByTestId("stepper-element");
      expect(stepper.getAttribute("aria-valuenow")).toBe("2");
    });

    it("THEN should handle non-React element children gracefully", () => {
      makeUncontrolledSut({
        activeStep: 0,
        children: [
          "text node",
          <Stepper.Item key="1" label="Valid step" />,
          null,
          <Stepper.Item key="2" label="Another step" />,
        ],
      });

      expect(screen.getByText("Valid step")).toBeDefined();
      expect(screen.getByText("Another step")).toBeDefined();
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
        children: [
          <Stepper.Item key="1" label="First step" />,
          <Stepper.Item key="2" label="Second step" />,
          <Stepper.Item key="3" label="Third step" />,
        ],
      });

      expect(screen.getByTestId("stepper-element")).toBeDefined();
      expect(screen.getByText("First step")).toBeDefined();
      expect(screen.getByText("Second step")).toBeDefined();
      expect(screen.getByText("Third step")).toBeDefined();
    });

    it("THEN should call onSelectStep when a step is clicked", () => {
      makeControlledSut({
        activeStep: 2,
        selectedStep: 1,
        onSelectStep: mockOnSelectStep,
        children: [
          <Stepper.Item key="1" label="Completed step" />,
          <Stepper.Item key="2" label="Another completed step" />,
          <Stepper.Item key="3" label="Started step" />,
        ],
      });

      const stepperItems = screen.getAllByRole("button");
      fireEvent.click(stepperItems[0]);

      expect(mockOnSelectStep).toHaveBeenCalledWith(0);
    });

    it("THEN should not update internal state when activeStep changes", () => {
      const { rerender } = render(
        <Stepper
          activeStep={0}
          selectedStep={0}
          onSelectStep={mockOnSelectStep}
          data-testid="stepper-element"
        >
          <Stepper.Item key="1" label="Step 1" />
          <Stepper.Item key="2" label="Step 2" />
        </Stepper>
      );

      rerender(
        <Stepper
          activeStep={1}
          selectedStep={0}
          onSelectStep={mockOnSelectStep}
          data-testid="stepper-element"
        >
          <Stepper.Item key="1" label="Step 1" />
          <Stepper.Item key="2" label="Step 2" />
        </Stepper>
      );

      expect(mockOnSelectStep).not.toHaveBeenCalled();
    });

    it("THEN should filter controlled props from container", () => {
      makeControlledSut({
        activeStep: 0,
        selectedStep: 0,
        onSelectStep: mockOnSelectStep,
        children: [<Stepper.Item key="1" label="Step" />],
      });

      const stepper = screen.getByTestId("stepper-element");
      expect(stepper).not.toHaveAttribute("selectedStep");
      expect(stepper).not.toHaveAttribute("onSelectStep");
      expect(stepper).toHaveAttribute("role", "progressbar");
    });

    it("THEN should handle selectedStep equal to activeStep", () => {
      makeControlledSut({
        activeStep: 1,
        selectedStep: 1,
        onSelectStep: mockOnSelectStep,
        children: [
          <Stepper.Item key="1" label="Completed" />,
          <Stepper.Item key="2" label="Selected started" />,
        ],
      });

      const stepperItems = screen.getAllByRole("button");
      fireEvent.click(stepperItems[1]);

      expect(mockOnSelectStep).not.toHaveBeenCalled();
    });

    it("THEN should handle selectedStep beyond activeStep", () => {
      makeControlledSut({
        activeStep: 1,
        selectedStep: 2,
        onSelectStep: mockOnSelectStep,
        children: [
          <Stepper.Item key="1" label="Completed" />,
          <Stepper.Item key="2" label="Started" />,
          <Stepper.Item key="3" label="Selected pending" />,
        ],
      });

      const stepperItems = screen.getAllByRole("button");
      expect(stepperItems).toHaveLength(3);
    });
  });

  describe("WHEN step states are rendered", () => {
    it("THEN should show step numbers for started and pending steps", () => {
      makeUncontrolledSut({
        activeStep: 1,
        children: [
          <Stepper.Item key="1" label="Completed step" />,
          <Stepper.Item key="2" label="Current step" />,
          <Stepper.Item key="3" label="Pending step" />,
        ],
      });

      expect(screen.getByText("2")).toBeDefined();
      expect(screen.getByText("3")).toBeDefined();
    });

    it("THEN should show completed steps with check icons", () => {
      makeUncontrolledSut({
        activeStep: 2,
        children: [
          <Stepper.Item key="1" label="First completed" />,
          <Stepper.Item key="2" label="Second completed" />,
          <Stepper.Item key="3" label="Current step" />,
        ],
      });

      expect(screen.queryByText("1")).toBeNull();
      expect(screen.queryByText("2")).toBeNull();
      expect(screen.getByText("3")).toBeDefined();
    });
  });

  describe("WHEN Stepper has static properties", () => {
    it("THEN should have correct displayName", () => {
      expect(Stepper.displayName).toBe("Stepper");
    });

    it("THEN should have Item component with displayName", () => {
      expect(Stepper.Item).toBeDefined();
      expect(Stepper.Item.displayName).toBe("Stepper.Item");
    });

    it("THEN should have Card component with displayName", () => {
      expect(Stepper.Card).toBeDefined();
      expect(Stepper.Card.displayName).toBe("Stepper.Card");
    });
  });

  describe("WHEN rendered with empty children", () => {
    it("THEN should handle empty children array", () => {
      makeUncontrolledSut({
        activeStep: 0,
        children: [],
      });

      const stepper = screen.getByTestId("stepper-element");
      expect(stepper.getAttribute("aria-valuemax")).toBe("0");
    });
  });

  describe("WHEN steps are automatically numbered", () => {
    it("THEN should assign correct step indices to children", () => {
      const mockOnSelect = jest.fn();
      render(
        <Stepper
          activeStep={3}
          selectedStep={0}
          onSelectStep={mockOnSelect}
          data-testid="stepper-element"
        >
          <Stepper.Item key="1" label="Step 1" />
          <Stepper.Item key="2" label="Step 2" />
          <Stepper.Item key="3" label="Step 3" />
        </Stepper>
      );

      const buttons = screen.getAllByRole("button");
      fireEvent.click(buttons[1]);

      expect(mockOnSelect).toHaveBeenCalledWith(1);
    });
  });
});

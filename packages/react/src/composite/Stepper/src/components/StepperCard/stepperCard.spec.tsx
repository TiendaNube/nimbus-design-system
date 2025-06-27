import React from "react";
import { render, screen } from "@testing-library/react";

import { StepperCard } from "./StepperCard";

describe("GIVEN <StepperCard />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render children correctly", () => {
      render(
        <StepperCard>
          <div data-testid="test-content">Test Content</div>
        </StepperCard>
      );

      expect(screen.getByTestId("test-content")).toBeInTheDocument();
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("THEN should apply correct display name", () => {
      expect(StepperCard.displayName).toBe("Stepper.Card");
    });
  });

  describe("WHEN rendered with multiple children", () => {
    it("THEN should render all children", () => {
      render(
        <StepperCard>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
          <span data-testid="child-3">Child 3</span>
        </StepperCard>
      );

      expect(screen.getByTestId("child-1")).toBeInTheDocument();
      expect(screen.getByTestId("child-2")).toBeInTheDocument();
      expect(screen.getByTestId("child-3")).toBeInTheDocument();
    });
  });

  describe("WHEN rendered with empty children", () => {
    it("THEN should render empty card", () => {
      const { container } = render(<StepperCard>{null}</StepperCard>);

      expect(container.firstChild).toBeInTheDocument();
    });
  });
});

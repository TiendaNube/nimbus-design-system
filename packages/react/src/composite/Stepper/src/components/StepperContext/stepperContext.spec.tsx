import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { StepperContext } from "./StepperContext";
import { StepperContextValue } from "./stepperContext.types";

// Test component that consumes the context
const TestConsumer = () => {
  const contextValue = useContext(StepperContext);
  return (
    <div data-testid="context-consumer">
      <span data-testid="total-steps">{contextValue.totalSteps}</span>
    </div>
  );
};

const makeSut = (value: StepperContextValue) => {
  render(
    <StepperContext.Provider value={value}>
      <TestConsumer />
    </StepperContext.Provider>
  );
};

describe("GIVEN <StepperContext />", () => {
  describe("WHEN providing context value", () => {
    it("THEN should provide totalSteps to consuming components", () => {
      makeSut({ totalSteps: 5, activeStep: 1, selectedStep: 1 });

      expect(screen.getByTestId("total-steps")).toHaveTextContent("5");
    });

    it("THEN should handle single step scenario", () => {
      makeSut({ totalSteps: 1, activeStep: 1, selectedStep: 1 });

      expect(screen.getByTestId("total-steps")).toHaveTextContent("1");
    });

    it("THEN should handle many steps scenario", () => {
      makeSut({ totalSteps: 10, activeStep: 1, selectedStep: 1 });

      expect(screen.getByTestId("total-steps")).toHaveTextContent("10");
    });
  });

  describe("WHEN no provider is present", () => {
    it("THEN should use default context value", () => {
      render(<TestConsumer />);

      // Default value should be 1 as defined in StepperContext
      expect(screen.getByTestId("total-steps")).toHaveTextContent("1");
    });
  });
});

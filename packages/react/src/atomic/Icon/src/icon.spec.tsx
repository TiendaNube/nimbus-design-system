import React from "react";
import { render, screen } from "@testing-library/react";

import { Icon } from "./Icon";
import { IconProps } from "./icon.types";

import { isGradient, applyGradientToSvg } from "./utils/gradient";

// Mock gradient utilities
jest.mock("./utils/gradient", () => ({
  isGradient: jest.fn(),
  applyGradientToSvg: jest.fn(),
}));

const mockIsGradient = isGradient as jest.MockedFunction<typeof isGradient>;
const mockApplyGradientToSvg = applyGradientToSvg as jest.MockedFunction<typeof applyGradientToSvg>;

const makeSut = (rest: IconProps) => {
  render(<Icon {...rest} data-testid="icon-element" />);
};

describe("GIVEN <Icon />", () => {
  describe("THEN should correctly render the submitted color", () => {
    it("THEN should correctly render the color default", () => {
      makeSut({ source: <svg /> });
      expect(
        screen.getByTestId("icon-element").getAttribute("class")
      ).toContain("color_neutral-textLow");
    });

    it("THEN should correctly render the color primary-textLow", () => {
      makeSut({ source: <svg />, color: "primary-textLow" });
      expect(
        screen.getByTestId("icon-element").getAttribute("class")
      ).toContain("color_primary-textLow");
    });

    it("THEN should correctly render the color primary-textHigh", () => {
      makeSut({ source: <svg />, color: "primary-textHigh" });
      expect(
        screen.getByTestId("icon-element").getAttribute("class")
      ).toContain("color_primary-textHigh");
    });

    it("THEN should correctly render the color success-textLow", () => {
      makeSut({ source: <svg />, color: "success-textLow" });
      expect(
        screen.getByTestId("icon-element").getAttribute("class")
      ).toContain("color_success-textLow");
    });

    it("THEN should correctly render the color success-textHigh", () => {
      makeSut({ source: <svg />, color: "success-textHigh" });
      expect(
        screen.getByTestId("icon-element").getAttribute("class")
      ).toContain("color_success-textHigh");
    });

    it("THEN should correctly render the color warning-textLow", () => {
      makeSut({ source: <svg />, color: "warning-textLow" });
      expect(
        screen.getByTestId("icon-element").getAttribute("class")
      ).toContain("color_warning-textLow");
    });

    it("THEN should correctly render the color warning-textHigh", () => {
      makeSut({ source: <svg />, color: "warning-textHigh" });
      expect(
        screen.getByTestId("icon-element").getAttribute("class")
      ).toContain("color_warning-textHigh");
    });

    it("THEN should correctly render the color danger-textLow", () => {
      makeSut({ source: <svg />, color: "danger-textLow" });
      expect(
        screen.getByTestId("icon-element").getAttribute("class")
      ).toContain("color_danger-textLow");
    });

    it("THEN should correctly render the color danger-textHigh", () => {
      makeSut({ source: <svg />, color: "danger-textHigh" });
      expect(
        screen.getByTestId("icon-element").getAttribute("class")
      ).toContain("color_danger-textHigh");
    });

    it("THEN should correctly render the color neutral-textLow", () => {
      makeSut({ source: <svg />, color: "neutral-textLow" });
      expect(
        screen.getByTestId("icon-element").getAttribute("class")
      ).toContain("color_neutral-textLow");
    });

    it("THEN should correctly render the color neutral-textHigh", () => {
      makeSut({ source: <svg />, color: "neutral-textHigh" });
      expect(
        screen.getByTestId("icon-element").getAttribute("class")
      ).toContain("color_neutral-textHigh");
    });
  });

  describe("WHEN gradient rendering is enabled", () => {
    const mockSvgSource = <svg data-testid="original-svg"><path /></svg>;
    const mockProcessedSvg = <svg data-testid="processed-svg"><defs /><path /></svg>;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("THEN should detect gradient when color is ai-interactive", () => {
      mockIsGradient.mockReturnValue(true);
      mockApplyGradientToSvg.mockReturnValue(mockProcessedSvg);

      makeSut({ source: mockSvgSource, color: "ai-interactive" });

      expect(mockIsGradient).toHaveBeenCalledWith("ai-interactive");
      expect(mockIsGradient).toHaveBeenCalledTimes(1);
    });

    it("THEN should apply gradient to SVG when gradient is detected", () => {
      mockIsGradient.mockReturnValue(true);
      mockApplyGradientToSvg.mockReturnValue(mockProcessedSvg);

      makeSut({ source: mockSvgSource, color: "ai-interactive" });

      expect(mockApplyGradientToSvg).toHaveBeenCalledWith(mockSvgSource);
      expect(mockApplyGradientToSvg).toHaveBeenCalledTimes(1);
    });

    it("THEN should render processed SVG when gradient is applied", () => {
      mockIsGradient.mockReturnValue(true);
      mockApplyGradientToSvg.mockReturnValue(mockProcessedSvg);

      makeSut({ source: mockSvgSource, color: "ai-interactive" });

      expect(screen.getByTestId("processed-svg")).toBeInTheDocument();
      expect(screen.queryByTestId("original-svg")).not.toBeInTheDocument();
    });

    it("THEN should NOT include color class when gradient is applied", () => {
      mockIsGradient.mockReturnValue(true);
      mockApplyGradientToSvg.mockReturnValue(mockProcessedSvg);

      makeSut({ source: mockSvgSource, color: "ai-interactive" });

      const iconElement = screen.getByTestId("icon-element");
      expect(iconElement.getAttribute("class")).not.toContain("color_ai-interactive");
    });

    it("THEN should NOT apply gradient when color is not a gradient", () => {
      mockIsGradient.mockReturnValue(false);

      makeSut({ source: mockSvgSource, color: "primary-textHigh" });

      expect(mockIsGradient).toHaveBeenCalledWith("primary-textHigh");
      expect(mockApplyGradientToSvg).not.toHaveBeenCalled();
    });

    it("THEN should render original SVG when gradient is not applied", () => {
      mockIsGradient.mockReturnValue(false);

      makeSut({ source: mockSvgSource, color: "primary-textHigh" });

      expect(screen.getByTestId("original-svg")).toBeInTheDocument();
      expect(screen.queryByTestId("processed-svg")).not.toBeInTheDocument();
    });

    it("THEN should include color class when gradient is not applied", () => {
      mockIsGradient.mockReturnValue(false);

      makeSut({ source: mockSvgSource, color: "primary-textHigh" });

      const iconElement = screen.getByTestId("icon-element");
      expect(iconElement.getAttribute("class")).toContain("color_primary-textHigh");
    });

    it("THEN should handle gradient detection with default color", () => {
      mockIsGradient.mockReturnValue(false);

      makeSut({ source: mockSvgSource });

      expect(mockIsGradient).toHaveBeenCalledWith("neutral-textLow");
      expect(mockApplyGradientToSvg).not.toHaveBeenCalled();
    });

    it("THEN should memoize gradient detection and SVG processing", () => {
      mockIsGradient.mockReturnValue(true);
      mockApplyGradientToSvg.mockReturnValue(mockProcessedSvg);

      const { rerender } = render(
        <Icon source={mockSvgSource} color="ai-interactive" data-testid="icon-element" />
      );

      // First render
      expect(mockIsGradient).toHaveBeenCalledTimes(1);
      expect(mockApplyGradientToSvg).toHaveBeenCalledTimes(1);

      // Rerender with same props
      rerender(
        <Icon source={mockSvgSource} color="ai-interactive" data-testid="icon-element" />
      );

      // Should not call again due to memoization
      expect(mockIsGradient).toHaveBeenCalledTimes(1);
      expect(mockApplyGradientToSvg).toHaveBeenCalledTimes(1);
    });

    it("THEN should recalculate when color changes", () => {
      mockIsGradient.mockReturnValue(false);

      const { rerender } = render(
        <Icon source={mockSvgSource} color="primary-textHigh" data-testid="icon-element" />
      );

      expect(mockIsGradient).toHaveBeenCalledWith("primary-textHigh");

      mockIsGradient.mockReturnValue(true);
      mockApplyGradientToSvg.mockReturnValue(mockProcessedSvg);

      // Rerender with gradient color
      rerender(
        <Icon source={mockSvgSource} color="ai-interactive" data-testid="icon-element" />
      );

      expect(mockIsGradient).toHaveBeenCalledWith("ai-interactive");
      expect(mockApplyGradientToSvg).toHaveBeenCalledWith(mockSvgSource);
    });

    it("THEN should recalculate when source changes", () => {
      const newMockSvgSource = <svg data-testid="new-svg"><circle /></svg>;
      mockIsGradient.mockReturnValue(true);
      mockApplyGradientToSvg.mockReturnValue(mockProcessedSvg);

      const { rerender } = render(
        <Icon source={mockSvgSource} color="ai-interactive" data-testid="icon-element" />
      );

      expect(mockApplyGradientToSvg).toHaveBeenCalledWith(mockSvgSource);

      // Rerender with new source
      rerender(
        <Icon source={newMockSvgSource} color="ai-interactive" data-testid="icon-element" />
      );

      expect(mockApplyGradientToSvg).toHaveBeenCalledWith(newMockSvgSource);
    });
  });
});

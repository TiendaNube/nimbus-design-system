import React from "react";
import { render, screen } from "@testing-library/react";

import { ProgressRing } from "./ProgressRing";
import { type ProgressRingProps } from "./progressRing.types";

const makeSut = (rest: ProgressRingProps) => {
  render(<ProgressRing {...rest} data-testid="progress-ring-element" />);
};

describe("GIVEN <ProgressRing />", () => {
  describe("WHEN rendered", () => {
    it("THEN should correctly render with proper ARIA attributes", () => {
      makeSut({ value: 50, "aria-label": "Loading progress" });
      const progressRing = screen.getByRole("progressbar");
      expect(progressRing).toBeDefined();
      expect(progressRing.getAttribute("aria-valuenow")).toBe("50");
      expect(progressRing.getAttribute("aria-valuemin")).toBe("0");
      expect(progressRing.getAttribute("aria-valuemax")).toBe("100");
    });

    it("THEN should expose the required accessible name", () => {
      makeSut({ value: 50, "aria-label": "Loading progress" });
      expect(screen.getByRole("progressbar").getAttribute("aria-label")).toBe(
        "Loading progress"
      );
    });

    it("THEN should clamp values above 100 to 100", () => {
      makeSut({ value: 150, "aria-label": "Loading progress" });
      expect(
        screen.getByRole("progressbar").getAttribute("aria-valuenow")
      ).toBe("100");
    });

    it("THEN should clamp values below 0 to 0", () => {
      makeSut({ value: -10, "aria-label": "Loading progress" });
      expect(
        screen.getByRole("progressbar").getAttribute("aria-valuenow")
      ).toBe("0");
    });
  });

  describe("WHEN size prop is provided", () => {
    it("THEN should correctly render the size default (large)", () => {
      makeSut({ value: 50, "aria-label": "Loading progress" });
      const progressRing = screen.getByTestId("progress-ring-element");
      expect(progressRing).toHaveStyle({ width: "32px", height: "32px" });
    });

    it("THEN should correctly render the size medium", () => {
      makeSut({ value: 50, size: "medium", "aria-label": "Loading progress" });
      const progressRing = screen.getByTestId("progress-ring-element");
      expect(progressRing).toHaveStyle({ width: "24px", height: "24px" });
    });

    it("THEN should correctly render the size small", () => {
      makeSut({ value: 50, size: "small", "aria-label": "Loading progress" });
      const progressRing = screen.getByTestId("progress-ring-element");
      expect(progressRing).toHaveStyle({ width: "16px", height: "16px" });
    });

    it("THEN should correctly render a custom numeric size", () => {
      makeSut({ value: 50, size: 64, "aria-label": "Loading progress" });
      const progressRing = screen.getByTestId("progress-ring-element");
      expect(progressRing).toHaveStyle({ width: "64px", height: "64px" });
    });
  });

  describe("WHEN value changes", () => {
    it("THEN should render a smaller stroke-dashoffset for a larger value", () => {
      makeSut({ value: 25, "aria-label": "Loading progress" });
      const low = screen
        .getByTestId("progress-ring-fill")
        .getAttribute("stroke-dashoffset");

      const { unmount } = render(
        <ProgressRing
          value={75}
          aria-label="Loading progress"
          data-testid="second"
        />
      );
      const high = screen
        .getByTestId("second")
        .querySelector('[data-testid="progress-ring-fill"]')
        ?.getAttribute("stroke-dashoffset");

      expect(Number(high)).toBeLessThan(Number(low));
      unmount();
    });
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";

import { ProgressBar, ProgressBarProps } from "./ProgressBar";

const makeSut = (rest: ProgressBarProps) => {
  render(<ProgressBar {...rest} data-testid="progress-bar-element" />);
};

describe("GIVEN <ProgressBar />", () => {
  describe("WHEN rendered", () => {
    it("THEN should correctly render the progress bar with proper ARIA attributes", () => {
      makeSut({ value: 50 });
      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toBeDefined();
      expect(progressBar.getAttribute("aria-valuenow")).toBe("50");
      expect(progressBar.getAttribute("aria-valuemin")).toBe("0");
      expect(progressBar.getAttribute("aria-valuemax")).toBe("100");
    });

    it("THEN should clamp values above 100 to 100", () => {
      makeSut({ value: 150 });
      const progressBar = screen.getByRole("progressbar");
      expect(progressBar.getAttribute("aria-valuenow")).toBe("100");
    });

    it("THEN should clamp values below 0 to 0", () => {
      makeSut({ value: -10 });
      const progressBar = screen.getByRole("progressbar");
      expect(progressBar.getAttribute("aria-valuenow")).toBe("0");
    });
  });

  describe("WHEN appearance prop is provided", () => {
    it("THEN should correctly render the appearance neutral by default", () => {
      makeSut({ value: 50 });
      const fillElement = screen.getByTestId("progress-bar-fill");
      expect(fillElement).toBeInTheDocument();
      expect(fillElement).toHaveStyle({ width: "50%" });
      expect(fillElement.className).toContain("neutral");
    });

    it("AND should correctly render the appearance primary", () => {
      makeSut({ value: 50, appearance: "primary" });
      const fillElement = screen.getByTestId("progress-bar-fill");
      expect(fillElement).toBeInTheDocument();
      expect(fillElement).toHaveStyle({ width: "50%" });
      expect(fillElement.className).toContain("primary");
    });

    it("AND should correctly render the appearance success", () => {
      makeSut({ value: 50, appearance: "success" });
      const fillElement = screen.getByTestId("progress-bar-fill");
      expect(fillElement).toBeInTheDocument();
      expect(fillElement).toHaveStyle({ width: "50%" });
      expect(fillElement.className).toContain("success");
    });

    it("AND should correctly render the appearance warning", () => {
      makeSut({ value: 50, appearance: "warning" });
      const fillElement = screen.getByTestId("progress-bar-fill");
      expect(fillElement).toBeInTheDocument();
      expect(fillElement).toHaveStyle({ width: "50%" });
      expect(fillElement.className).toContain("warning");
    });

    it("AND should correctly render the appearance danger", () => {
      makeSut({ value: 50, appearance: "danger" });
      const fillElement = screen.getByTestId("progress-bar-fill");
      expect(fillElement).toBeInTheDocument();
      expect(fillElement).toHaveStyle({ width: "50%" });
      expect(fillElement.className).toContain("danger");
    });

    it("AND should correctly render the appearance ai-interactive", () => {
      makeSut({ value: 50, appearance: "ai-interactive" });
      const fillElement = screen.getByTestId("progress-bar-fill");
      expect(fillElement).toBeInTheDocument();
      expect(fillElement).toHaveStyle({ width: "50%" });
      expect(fillElement.className).toContain("ai-interactive");
    });
  });
});

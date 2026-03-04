import React from "react";
import { render, screen } from "@testing-library/react";

import { ProgressBar, type ProgressBarProps } from "./ProgressBar";

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

    it("AND should correctly render the appearance ai-generative", () => {
      makeSut({ value: 50, appearance: "ai-generative" });
      const fillElement = screen.getByTestId("progress-bar-fill");
      expect(fillElement).toBeInTheDocument();
      expect(fillElement).toHaveStyle({ width: "50%" });
      expect(fillElement.className).toContain("ai-generative");
    });
  });

  describe("WHEN boxShadow prop is provided", () => {
    it("THEN should apply box shadow to the fill element when boxShadow is 1", () => {
      makeSut({ value: 50, boxShadow: 1 });
      const fillElement = screen.getByTestId("progress-bar-fill");
      expect(fillElement.style.boxShadow).toBeTruthy();
    });

    it("THEN should apply box shadow to the fill element when boxShadow is 2", () => {
      makeSut({ value: 50, boxShadow: 2 });
      const fillElement = screen.getByTestId("progress-bar-fill");
      expect(fillElement.style.boxShadow).toBeTruthy();
    });

    it("THEN should not apply box shadow when boxShadow is 0", () => {
      makeSut({ value: 50, boxShadow: 0 });
      const fillElement = screen.getByTestId("progress-bar-fill");
      expect(fillElement.style.boxShadow).toBeFalsy();
    });

    it("THEN should use containerNoOverflow class when boxShadow > 0", () => {
      makeSut({ value: 50, boxShadow: 1 });
      const progressBar = screen.getByRole("progressbar");
      expect(progressBar.className).toContain("containerNoOverflow");
    });
  });

  describe("WHEN backgroundColor prop is provided", () => {
    it("THEN should apply neutral-surfaceDisabled background by default", () => {
      makeSut({ value: 50 });
      const progressBar = screen.getByRole("progressbar");
      expect(progressBar.className).toContain("neutral-surfaceDisabled");
    });

    it("THEN should apply neutral-background class when specified", () => {
      makeSut({ value: 50, backgroundColor: "neutral-background" });
      const progressBar = screen.getByRole("progressbar");
      expect(progressBar.className).toContain("neutral-background");
    });
  });

  describe("WHEN height prop is provided", () => {
    it("THEN should apply custom height to the container", () => {
      makeSut({ value: 50, height: "1rem" });
      const progressBar = screen.getByRole("progressbar");
      expect(progressBar).toHaveStyle({ height: "1rem" });
    });
  });
});

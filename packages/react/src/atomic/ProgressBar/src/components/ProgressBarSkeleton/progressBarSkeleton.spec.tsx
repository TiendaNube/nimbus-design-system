import React from "react";
import { render, screen } from "@testing-library/react";

import { ProgressBarSkeleton } from "./ProgressBarSkeleton";
import { type ProgressBarSkeletonProperties } from "./ProgressBarSkeleton.types";

const makeSut = (props?: ProgressBarSkeletonProperties) => {
  render(<ProgressBarSkeleton data-testid="skeleton-element" {...props} />);
};

describe("GIVEN <ProgressBar.Skeleton />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render skeleton with default dimensions", () => {
      makeSut();
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(/--width__\w{0,9}: 100%;/);
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 0.5rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.5rem;/
      );
    });

    it("THEN should render skeleton with custom width", () => {
      makeSut({ width: "200px" });
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(
        /--width__\w{0,9}: 200px;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 0.5rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.5rem;/
      );
    });

    it("THEN should render skeleton with custom height", () => {
      makeSut({ height: "1rem" });
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(/--width__\w{0,9}: 100%;/);
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 1rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.5rem;/
      );
    });

    it("THEN should render skeleton with custom width and height", () => {
      makeSut({ width: "150px", height: "0.75rem" });
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(
        /--width__\w{0,9}: 150px;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 0.75rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.5rem;/
      );
    });

    it("THEN should render skeleton with custom data-testid", () => {
      makeSut({ "data-testid": "custom-progress-skeleton" });
      const skeleton = screen.getByTestId("custom-progress-skeleton");
      expect(skeleton).toBeInTheDocument();
    });
  });
});

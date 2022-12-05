import React from "react";
import { render, screen } from "@testing-library/react";

import { Skeleton } from "./Skeleton";
import { SkeletonProps } from "./skeleton.types";

const makeSut = (props?: SkeletonProps) => {
  render(<Skeleton {...props} data-testid="skeleton-element" />);
};

describe("GIVEN <Text.Skeleton />", () => {
  describe("WHEN rendered", () => {
    it('THEN should render skeleton size="default"', () => {
      makeSut();
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(/--width__\w{0,9}: 2rem;/);
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 1rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.25rem;/
      );
    });

    it('THEN should render skeleton size="caption"', () => {
      makeSut({ fontSize: "caption" });
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(/--width__\w{0,9}: 2rem;/);
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 1rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.25rem;/
      );
    });

    it('THEN should render skeleton size="base"', () => {
      makeSut({ fontSize: "base" });
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(/--width__\w{0,9}: 2rem;/);
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 1.25rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.25rem;/
      );
    });

    it('THEN should render skeleton type="highlight"', () => {
      makeSut({ fontSize: "highlight" });
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(/--width__\w{0,9}: 2rem;/);
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 1.125rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.25rem;/
      );
    });
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";

import { TitleSkeleton } from "./TitleSkeleton";
import { TitleSkeletonProps } from "./titleSkeleton.types";

const makeSut = (props?: TitleSkeletonProps) => {
  render(<TitleSkeleton {...props} data-testid="skeleton-element" />);
};

describe("GIVEN <Title.Skeleton />", () => {
  describe("WHEN rendered", () => {
    it('THEN should render skeleton type="default"', () => {
      makeSut();
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(
        /--width__\w{0,9}: 8.25rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 2.75rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.25rem;/
      );
    });

    it('THEN should render skeleton type="h1"', () => {
      makeSut({ as: "h1" });
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(
        /--width__\w{0,9}: 8.25rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 2.75rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.25rem;/
      );
    });

    it('THEN should render skeleton type="h2"', () => {
      makeSut({ as: "h2" });
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(
        /--width__\w{0,9}: 6.188rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 1.75rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.25rem;/
      );
    });

    it('THEN should render skeleton type="h3"', () => {
      makeSut({ as: "h3" });
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(
        /--width__\w{0,9}: 5.188rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 1.75rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.25rem;/
      );
    });

    it('THEN should render skeleton type="h4"', () => {
      makeSut({ as: "h4" });
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(
        /--width__\w{0,9}: 4.625rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 1.5rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.25rem;/
      );
    });

    it('THEN should render skeleton type="h5"', () => {
      makeSut({ as: "h5" });
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(
        /--width__\w{0,9}: 4.125rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 1.25rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.25rem;/
      );
    });

    it('THEN should render skeleton type="h6"', () => {
      makeSut({ as: "h6" });
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(
        /--width__\w{0,9}: 3.625rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 1.125rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.25rem;/
      );
    });
  });
});

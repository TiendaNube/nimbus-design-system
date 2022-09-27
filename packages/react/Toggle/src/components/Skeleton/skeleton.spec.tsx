import React from "react";
import { render, screen } from "@testing-library/react";

import { Skeleton } from "./Skeleton";
import { SkeletonProps } from "./skeleton.types";

const makeSut = (props?: SkeletonProps) => {
  render(<Skeleton {...props} data-testid="skeleton-element" />);
};

describe("GIVEN </Toggle.Skeleton />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render skeleton base", () => {
      makeSut();
      const toggleSkeleton = screen.getByTestId("toggle-skeleton");
      expect(toggleSkeleton.getAttribute("style")).toMatch(
        /--width__\w{0,9}: 2rem;/
      );
      expect(toggleSkeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 1rem;/
      );
      expect(toggleSkeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.5rem;/
      );

      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(/--width__\w{0,9}: 2rem;/);
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 1rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.25rem;/
      );
    });
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";

import { ChipSkeleton } from "./ChipSkeleton";
import { type ChipSkeletonProps } from "./chipSkeleton.types";

const makeSut = (props?: ChipSkeletonProps) => {
  render(<ChipSkeleton {...props} data-testid="skeleton-element" />);
};

describe("GIVEN <Chip.Skeleton />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render skeleton base", () => {
      makeSut();
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(
        /--width__\w{0,9}: 4.375rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 1.5rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.25rem;/
      );
    });
  });
});

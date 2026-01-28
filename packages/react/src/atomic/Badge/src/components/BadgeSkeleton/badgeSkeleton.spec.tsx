import React from "react";
import { render, screen } from "@testing-library/react";

import { BadgeSkeleton } from "./BadgeSkeleton";
import type { BadgeSkeletonProps } from "./badgeSkeleton.types";

const makeSut = (props?: BadgeSkeletonProps) => {
  render(<BadgeSkeleton {...props} data-testid="skeleton-element" />);
};

describe("GIVEN <Tag.Skeleton />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render skeleton base", () => {
      makeSut();
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(
        /--width__\w{0,9}: 1.5rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 1.25rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.813rem;/
      );
    });
  });
});

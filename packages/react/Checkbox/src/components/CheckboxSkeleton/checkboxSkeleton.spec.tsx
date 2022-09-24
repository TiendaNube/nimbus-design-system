import React from "react";
import { render, screen } from "@testing-library/react";

import { CheckboxSkeleton } from "./CheckboxSkeleton";
import { CheckboxSkeletonProps } from "./checkboxSkeleton.types";

const makeSut = (props?: CheckboxSkeletonProps) => {
  render(<CheckboxSkeleton {...props} data-testid="skeleton-element" />);
};

describe("GIVEN </Checkbox.Skeleton />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render skeleton base", () => {
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
  });
});

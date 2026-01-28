import React from "react";
import { render, screen } from "@testing-library/react";

import { MultiSelectSkeleton } from "./MultiSelectSkeleton";
import type { MultiSelectSkeletonProps } from "./multiSelectSkeleton.types";

const makeSut = (props?: MultiSelectSkeletonProps) => {
  render(<MultiSelectSkeleton {...props} data-testid="skeleton-element" />);
};

describe("GIVEN <Select.Skeleton />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render skeleton base", () => {
      makeSut();
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(
        /--width__\w{0,9}: 15rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 2.25rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.5rem;/
      );
    });
  });
});

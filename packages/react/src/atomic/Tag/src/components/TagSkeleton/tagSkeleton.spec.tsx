import React from "react";
import { render, screen } from "@testing-library/react";

import { TagSkeleton } from "./TagSkeleton";
import { TagSkeletonProps } from "./tagSkeleton.types";

const makeSut = (props?: TagSkeletonProps) => {
  render(<TagSkeleton {...props} data-testid="skeleton-element" />);
};

describe("GIVEN <Tag.Skeleton />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render skeleton base", () => {
      makeSut();
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(
        /--width__\w{0,9}: 3.313rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 1.5rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.813rem;/
      );
    });
  });
});

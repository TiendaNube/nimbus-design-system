import React from "react";
import { render, screen } from "@testing-library/react";

import { IconButtonSkeleton } from "./IconButtonSkeleton";
import { type IconButtonSkeletonProps } from "./iconButtonSkeleton.types";

const makeSut = (props?: IconButtonSkeletonProps) => {
  render(<IconButtonSkeleton {...props} data-testid="skeleton-element" />);
};

describe("GIVEN <IconButton.Skeleton />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render skeleton base", () => {
      makeSut();
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(
        /--width__\w{0,9}: 2.75rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 2.75rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 100%;/
      );
    });
  });
});

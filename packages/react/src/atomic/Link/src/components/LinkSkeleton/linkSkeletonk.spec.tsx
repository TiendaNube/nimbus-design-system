import React from "react";
import { render, screen } from "@testing-library/react";

import { LinkSkeleton } from "./LinkSkeleton";
import { LinkSkeletonProps } from "./linkSkeletonk.types";

const makeSut = (props?: LinkSkeletonProps) => {
  render(<LinkSkeleton {...props} data-testid="skeleton-element" />);
};

describe("GIVEN <Button.Skeleton />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render skeleton base", () => {
      makeSut();
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(
        /--width__\w{0,9}: 4.75rem;/
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

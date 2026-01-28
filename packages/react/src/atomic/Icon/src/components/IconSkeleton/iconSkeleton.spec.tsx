import React from "react";
import { render, screen } from "@testing-library/react";

import { IconSkeleton } from "./IconSkeleton";
import type { IconSkeletonProps } from "./iconSkeleton.types";

const makeSut = (props?: IconSkeletonProps) => {
  render(<IconSkeleton {...props} data-testid="skeleton-element" />);
};

describe("GIVEN <Icon.Skeleton />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render skeleton base", () => {
      makeSut();
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(/--width__\w{0,9}: 1rem;/);
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 1rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.25rem;/
      );
    });
  });
});

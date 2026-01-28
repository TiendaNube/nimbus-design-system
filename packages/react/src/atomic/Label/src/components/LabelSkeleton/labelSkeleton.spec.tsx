import React from "react";
import { render, screen } from "@testing-library/react";

import { LabelSkeleton } from "./LabelSkeleton";
import type { LabelSkeletonProps } from "./labelSkeleton.types";

const makeSut = (props?: LabelSkeletonProps) => {
  render(<LabelSkeleton {...props} data-testid="skeleton-element" />);
};

describe("GIVEN <Label.Skeleton />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render skeleton base", () => {
      makeSut();
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(
        /--width__\w{0,9}: 4.375rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 1rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0;/
      );
    });
  });
});

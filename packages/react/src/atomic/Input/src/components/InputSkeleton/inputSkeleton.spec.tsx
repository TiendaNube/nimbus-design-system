import React from "react";
import { render, screen } from "@testing-library/react";

import { InputSkeleton } from "./InputSkeleton";
import type { InputSkeletonProps } from "./inputSkeleton.types";

const makeSut = (props?: InputSkeletonProps) => {
  render(<InputSkeleton {...props} data-testid="skeleton-element" />);
};

describe("GIVEN <Title.Skeleton />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render skeleton base", () => {
      makeSut();
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(/--width__\w{0,9}: 100%;/);
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 2rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.5rem;/
      );
    });
  });
});

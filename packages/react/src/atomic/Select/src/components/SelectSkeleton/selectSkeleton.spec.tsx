import React from "react";
import { render, screen } from "@testing-library/react";

import { SelectSkeleton } from "./SelectSkeleton";
import { type SelectSkeletonProps } from "./selectSkeleton.types";

const makeSut = (props?: SelectSkeletonProps) => {
  render(<SelectSkeleton {...props} data-testid="skeleton-element" />);
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

  describe("WHEN size is set", () => {
    it("THEN should keep the medium dimensions with size medium", () => {
      makeSut({ size: "medium" });
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 2.25rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.5rem;/
      );
    });

    it("THEN should match the small select height and border radius with size small", () => {
      makeSut({ size: "small" });
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 1.625rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.375rem;/
      );
    });
  });
});

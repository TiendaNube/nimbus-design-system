import React from "react";
import { render, screen } from "@testing-library/react";

import { RadioSkeleton } from "./RadioSkeleton";
import { RadioSkeletonProps } from "./radioSkeleton.types";

const makeSut = (props?: RadioSkeletonProps) => {
  render(<RadioSkeleton {...props} data-testid="skeleton-element" />);
};

describe("GIVEN </Checkbox.Skeleton />", () => {
  describe("WHEN rendered", () => {
    it('THEN should render skeleton base "radio"', () => {
      makeSut();
      const checkmark = screen.getByTestId("checkmark-element");
      expect(checkmark.getAttribute("style")).toMatch(
        /--width__\w{0,9}: 1rem;/
      );
      expect(checkmark.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 1rem;/
      );
      expect(checkmark.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.75rem;/
      );

      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(/--width__\w{0,9}: 2rem;/);
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 1rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.25rem;/
      );
    });

    it('THEN should render skeleton base "button"', () => {
      makeSut({ as: "button" });
      expect(screen.queryByTestId("checkmark-element")).toBeNull();

      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(
        /--width__\w{0,9}: 3.5rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 1.8rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.25rem;/
      );
    });
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";

import { AlertSkeleton } from "./AlertSkeleton";
import { type AlertSkeletonProps } from "./alertSkeleton.types";

const makeSut = (props?: AlertSkeletonProps) => {
  render(<AlertSkeleton {...props} data-testid="skeleton-element" />);
};

describe("GIVEN <Alert.Skeleton />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render skeleton base", () => {
      makeSut();
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(/--width__\w{0,9}: 100%;/);
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 4.875rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.5rem;/
      );
    });
  });
});

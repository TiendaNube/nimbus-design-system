import React from "react";
import { render, screen } from "@testing-library/react";

import { Skeleton } from "./skeleton";
import { SkeletonProps } from "./skeleton.types";

const makeSut = (props?: SkeletonProps) => {
  render(<Skeleton {...props} data-testid="skeleton-element" />);
};

describe("GIVEN <Text.Skeleton />", () => {
  describe("WHEN rendered", () => {
    it('THEN should render skeleton size="small"', () => {
      makeSut({ size: "small" });
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toContain("2rem");
      expect(skeleton.getAttribute("style")).toContain("1rem");
      expect(skeleton.getAttribute("style")).toContain("0.25rem");
    });

    it('THEN should render skeleton size="caption"', () => {
      makeSut({ size: "caption" });
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toContain("2rem");
      expect(skeleton.getAttribute("style")).toContain("1.25rem");
      expect(skeleton.getAttribute("style")).toContain("0.25rem");
    });

    it('THEN should render skeleton type="base"', () => {
      makeSut({ size: "base" });
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toContain("2rem");
      expect(skeleton.getAttribute("style")).toContain("1.125rem");
      expect(skeleton.getAttribute("style")).toContain("0.25rem");
    });
  });
});

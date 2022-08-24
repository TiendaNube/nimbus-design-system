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
      expect(skeleton.getAttribute("style")).toContain("32px");
      expect(skeleton.getAttribute("style")).toContain("16px");
      expect(skeleton.getAttribute("style")).toContain("4px");
    });

    it('THEN should render skeleton size="caption"', () => {
      makeSut({ size: "caption" });
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toContain("32px");
      expect(skeleton.getAttribute("style")).toContain("20px");
      expect(skeleton.getAttribute("style")).toContain("4px");
    });

    it('THEN should render skeleton type="base"', () => {
      makeSut({ size: "base" });
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toContain("32px");
      expect(skeleton.getAttribute("style")).toContain("18px");
      expect(skeleton.getAttribute("style")).toContain("4px");
    });
  });
});

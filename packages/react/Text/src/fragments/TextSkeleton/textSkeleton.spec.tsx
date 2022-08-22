import React from "react";
import { render, screen } from "@testing-library/react";

import { TextSkeleton } from "./TextSkeleton";
import { TextSkeletonProps } from "./textSkeleton.types";

const makeSut = (props?: TextSkeletonProps) => {
  render(<TextSkeleton {...props} data-testid="skeleton-element" />);
};

describe("GIVEN <TitleSkeleton />", () => {
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

import React from "react";
import { render, screen } from "@testing-library/react";

import { Skeleton } from "./Skeleton";
import { SkeletonProps } from "./skeleton.types";

const makeSut = (props?: SkeletonProps) => {
  render(<Skeleton {...props} data-testid="skeleton-element" />);
};

describe("GIVEN <Title.Skeleton />", () => {
  describe("WHEN rendered", () => {
    it('THEN should render skeleton type="h1"', () => {
      makeSut({ as: "h1" });
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toContain("132px");
      expect(skeleton.getAttribute("style")).toContain("44px");
      expect(skeleton.getAttribute("style")).toContain("4px");
    });

    it('THEN should render skeleton type="h2"', () => {
      makeSut({ as: "h2" });
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toContain("99px");
      expect(skeleton.getAttribute("style")).toContain("28px");
      expect(skeleton.getAttribute("style")).toContain("4px");
    });

    it('THEN should render skeleton type="h3"', () => {
      makeSut({ as: "h3" });
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toContain("83px");
      expect(skeleton.getAttribute("style")).toContain("28px");
      expect(skeleton.getAttribute("style")).toContain("4px");
    });

    it('THEN should render skeleton type="h4"', () => {
      makeSut({ as: "h4" });
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toContain("74px");
      expect(skeleton.getAttribute("style")).toContain("24px");
      expect(skeleton.getAttribute("style")).toContain("4px");
    });

    it('THEN should render skeleton type="h5"', () => {
      makeSut({ as: "h5" });
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toContain("66px");
      expect(skeleton.getAttribute("style")).toContain("20px");
      expect(skeleton.getAttribute("style")).toContain("4px");
    });

    it('THEN should render skeleton type="h6"', () => {
      makeSut({ as: "h6" });
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toContain("58px");
      expect(skeleton.getAttribute("style")).toContain("18px");
      expect(skeleton.getAttribute("style")).toContain("4px");
    });
  });
});

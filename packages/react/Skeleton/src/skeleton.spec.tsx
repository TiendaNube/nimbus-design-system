import React from "react";
import { render, screen } from "@testing-library/react";

import { Skeleton } from "./Skeleton";
import { SkeletonProps } from "./skeleton.types";

const makeSut = (props: SkeletonProps) => {
  render(<Skeleton {...props} data-testid="skeleton-element" />);
};

describe("GIVEN <Skeleton />", () => {
  describe("WHEN rendered", () => {
    it("THEN should ensure dynamic height and width properties are applied", () => {
      makeSut({
        height: "10rem",
        width: "50rem",
      });
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(
        /--width__\w{0,9}: 50rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 10rem;/
      );
    });

    it("THEN should ensure dynamic border radius properties are applied", () => {
      makeSut({
        height: "10rem",
        width: "50rem",
        borderRadius: "0.25rem",
      });
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.25rem;/
      );
    });
  });
});

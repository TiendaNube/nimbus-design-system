import React from "react";
import { render, screen } from "@testing-library/react";

import { SkeletonItem } from "./SkeletonItem";
import { SkeletonItemProps } from "./skeletonitem.types";

const makeSut = (props?: SkeletonItemProps) => {
  render(<SkeletonItem {...props} data-testid="skeleton-element" />);
};

describe("GIVEN <List.SkeletonItem />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render skeleton base", () => {
      makeSut();
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(/--width__\w{0,9}: 6rem;/);
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 1.125rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 0.25rem;/
      );
    });
  });
});

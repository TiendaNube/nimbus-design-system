import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@nimbus-ds/styles";

import { IconButtonSkeleton } from "./IconButtonSkeleton";
import { type IconButtonSkeletonProps } from "./iconButtonSkeleton.types";

const makeSut = (props?: IconButtonSkeletonProps) => {
  render(<IconButtonSkeleton {...props} data-testid="skeleton-element" />);
};

describe("GIVEN <IconButton.Skeleton />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render skeleton base", () => {
      makeSut();
      const skeleton = screen.getByTestId("skeleton-element");
      expect(skeleton.getAttribute("style")).toMatch(
        /--width__\w{0,9}: 2.75rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--height__\w{0,9}: 2.75rem;/
      );
      expect(skeleton.getAttribute("style")).toMatch(
        /--borderRadius__\w{0,9}: 100%;/
      );
    });
  });

  describe("WHEN rendered under Norte UI", () => {
    it("THEN should match the 28px Norte UI IconButton", () => {
      render(
        <ThemeProvider theme="next-norteui">
          <IconButtonSkeleton data-testid="skeleton-element" />
        </ThemeProvider>
      );
      const style =
        screen.getByTestId("skeleton-element").getAttribute("style") ?? "";
      expect(style).toMatch(/--width__\w{0,9}: 1.75rem;/);
      expect(style).toMatch(/--height__\w{0,9}: 1.75rem;/);
      expect(style).not.toMatch(/--borderRadius__\w{0,9}: 100%;/);
    });
  });
});

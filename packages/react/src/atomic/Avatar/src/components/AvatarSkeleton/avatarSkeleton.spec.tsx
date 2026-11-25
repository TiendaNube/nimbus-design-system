import React from "react";
import { render, screen } from "@testing-library/react";

import { AvatarSkeleton } from "./AvatarSkeleton";
import { type AvatarSkeletonProps } from "./avatarSkeleton.types";

const makeSut = (props?: AvatarSkeletonProps) => {
  render(<AvatarSkeleton {...props} data-testid="skeleton-element" />);
};

describe("GIVEN <Avatar.Skeleton />", () => {
  describe("WHEN rendered without a size", () => {
    it("THEN should render a 1.5rem circle", () => {
      makeSut();
      const style = screen
        .getByTestId("skeleton-element")
        .getAttribute("style");
      expect(style).toMatch(/--width__\w{0,9}: 1.5rem;/);
      expect(style).toMatch(/--height__\w{0,9}: 1.5rem;/);
      expect(style).toMatch(/--borderRadius__\w{0,9}: 9999px;/);
    });
  });

  describe("WHEN rendered with size large", () => {
    it("THEN should render a 2.5rem circle", () => {
      makeSut({ size: "large" });
      const style = screen
        .getByTestId("skeleton-element")
        .getAttribute("style");
      expect(style).toMatch(/--width__\w{0,9}: 2.5rem;/);
      expect(style).toMatch(/--height__\w{0,9}: 2.5rem;/);
    });
  });

  describe("WHEN rendered with size small", () => {
    it("THEN should render a 1.25rem circle", () => {
      makeSut({ size: "small" });
      const style = screen
        .getByTestId("skeleton-element")
        .getAttribute("style");
      expect(style).toMatch(/--width__\w{0,9}: 1.25rem;/);
      expect(style).toMatch(/--height__\w{0,9}: 1.25rem;/);
    });
  });

  describe("WHEN rendered with a className", () => {
    it("THEN should keep it next to the class that stops it from shrinking", () => {
      makeSut({ className: "custom-class" });
      const { className } = screen.getByTestId("skeleton-element");
      expect(className).toContain("custom-class");
      expect(className.split(" ").length).toBeGreaterThan(1);
    });
  });
});

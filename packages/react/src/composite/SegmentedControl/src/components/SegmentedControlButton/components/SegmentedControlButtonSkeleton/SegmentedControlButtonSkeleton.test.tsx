import React from "react";
import { render, screen } from "@testing-library/react";
import { SegmentedControlButtonSkeleton } from "./SegmentedControlButtonSkeleton";

describe("SegmentedControlButtonSkeleton", () => {
  it("should render skeleton with default props", () => {
    render(<SegmentedControlButtonSkeleton />);
    const skeleton = screen.getByRole("progressbar");

    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveAttribute("aria-busy", "true");
    expect(skeleton).toHaveClass("skeleton-animation");
  });

  it("should render skeleton with custom width and height", () => {
    render(<SegmentedControlButtonSkeleton width="200px" height="50px" />);
    const skeleton = screen.getByRole("progressbar");

    expect(skeleton).toHaveStyle({
      width: "200px",
      height: "50px",
    });
  });

  it("should apply additional props to skeleton element", () => {
    render(<SegmentedControlButtonSkeleton data-testid="custom-skeleton" />);
    const skeleton = screen.getByTestId("custom-skeleton");

    expect(skeleton).toBeInTheDocument();
  });

  it("should maintain default appearance class from segmentedButton styles", () => {
    render(<SegmentedControlButtonSkeleton />);
    const skeleton = screen.getByRole("progressbar");

    expect(skeleton.className).toContain("appearance.default");
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import { SegmentedControlButtonSkeleton } from ".";

describe("SegmentedControlButtonSkeleton", () => {
  it("should render skeleton with default props", () => {
    render(<SegmentedControlButtonSkeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton).toBeInTheDocument();
    expect(skeleton.className).toContain("nimbus-skeleton_base");
  });

  it("should render skeleton with custom width and height", () => {
    render(<SegmentedControlButtonSkeleton width="200px" height="50px" data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton).toHaveStyle({
      "--width__1jbm2xp0": "200px",
      "--height__1jbm2xp1": "50px",
    });
  });

  it("should apply additional props to skeleton element", () => {
    render(<SegmentedControlButtonSkeleton data-testid="custom-skeleton" />);
    const skeleton = screen.getByTestId("custom-skeleton");

    expect(skeleton).toBeInTheDocument();
  });

  it("should apply border radius", () => {
    render(<SegmentedControlButtonSkeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton).toHaveStyle({
      "--borderRadius__1jbm2xp2": "0.25rem",
    });
  });
});

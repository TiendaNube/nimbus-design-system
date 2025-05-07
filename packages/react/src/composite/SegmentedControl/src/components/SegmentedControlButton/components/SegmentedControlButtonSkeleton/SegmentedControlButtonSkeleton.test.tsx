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

  it("should apply additional props to skeleton element", () => {
    render(<SegmentedControlButtonSkeleton data-testid="custom-skeleton" />);
    const skeleton = screen.getByTestId("custom-skeleton");

    expect(skeleton).toBeInTheDocument();
  });
});

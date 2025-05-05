import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SegmentedControl } from "./SegmentedControl";

describe("SegmentedControl", () => {
  const defaultProps = {
    children: [
      <SegmentedControl.Item key="option1" label="Option 1" />,
      <SegmentedControl.Item key="option2" label="Option 2" />,
    ],
  };

  it("renders correctly", () => {
    render(<SegmentedControl {...defaultProps} />);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("applies default styling", () => {
    render(<SegmentedControl {...defaultProps} />);
    const container = screen.getByTestId("segmented-control-container");
    expect(container).toBeInTheDocument();
  });

  it("selects the default segment", () => {
    render(<SegmentedControl {...defaultProps} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
    expect(buttons[1]).toHaveAttribute("aria-pressed", "false");
  });

  describe("Controlled mode", () => {
    it("maintains selected state when controlled", () => {
      const handleSegmentSelect = jest.fn();
      const { rerender } = render(
        <SegmentedControl
          {...defaultProps}
          selected={1}
          onSegmentSelect={handleSegmentSelect}
        />
      );

      const buttons = screen.getAllByRole("button");
      expect(buttons[0]).toHaveAttribute("aria-pressed", "false");
      expect(buttons[1]).toHaveAttribute("aria-pressed", "true");

      fireEvent.click(buttons[0]);
      expect(handleSegmentSelect).toHaveBeenCalledWith(0);

      // Selection doesn't change until parent rerenders with new selection
      expect(buttons[1]).toHaveAttribute("aria-pressed", "true");

      rerender(
        <SegmentedControl
          {...defaultProps}
          selected={0}
          onSegmentSelect={handleSegmentSelect}
        />
      );

      expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
      expect(buttons[1]).toHaveAttribute("aria-pressed", "false");
    });
  });

  describe("Uncontrolled mode", () => {
    it("toggles selected state when clicked", () => {
      render(<SegmentedControl {...defaultProps} />);
      const buttons = screen.getAllByRole("button");

      // Default selection is the first segment
      expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
      expect(buttons[1]).toHaveAttribute("aria-pressed", "false");

      // Click second segment
      fireEvent.click(buttons[1]);
      expect(buttons[0]).toHaveAttribute("aria-pressed", "false");
      expect(buttons[1]).toHaveAttribute("aria-pressed", "true");
    });

    it("uses preSelectedSegment when provided", () => {
      render(<SegmentedControl {...defaultProps} preSelectedSegment={1} />);
      const buttons = screen.getAllByRole("button");

      expect(buttons[0]).toHaveAttribute("aria-pressed", "false");
      expect(buttons[1]).toHaveAttribute("aria-pressed", "true");
    });
  });

  describe("Accessibility", () => {
    it("has correct ARIA attributes", () => {
      render(<SegmentedControl {...defaultProps} />);
      const buttons = screen.getAllByRole("button");

      expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
      expect(buttons[1]).toHaveAttribute("aria-pressed", "false");
    });
  });

  // These tests verify button identifiers match the expected format
  describe("ID generation", () => {
    it("generates correct button IDs from labels", () => {
      render(
        <SegmentedControl>
          <SegmentedControl.Item key="option1" label="Option 1">
            Content 1
          </SegmentedControl.Item>
          <SegmentedControl.Item key="option2" label="Option 2">
            Content 2
          </SegmentedControl.Item>
        </SegmentedControl>
      );

      const buttons = screen.getAllByRole("button");

      expect(buttons[0].id).toBe("segment-option-1");
      expect(buttons[1].id).toBe("segment-option-2");
    });
  });
});

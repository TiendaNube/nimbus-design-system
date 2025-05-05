import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SegmentedControl } from "./SegmentedControl";

describe("SegmentedControl", () => {
  const defaultProps = {
    children: "Test Button",
  };

  it("renders correctly", () => {
    render(<SegmentedControl {...defaultProps} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("Test Button")).toBeInTheDocument();
  });

  it("applies default class when not selected", () => {
    render(<SegmentedControl {...defaultProps} />);
    expect(screen.getByRole("button")).toHaveClass("segmented-control", "default");
  });

  it("applies selected class when selected", () => {
    render(<SegmentedControl {...defaultProps} selected />);
    expect(screen.getByRole("button")).toHaveClass("segmented-control", "selected");
  });

  describe("Controlled mode", () => {
    it("maintains selected state when controlled", () => {
      const handleClick = jest.fn();
      const { rerender } = render(
        <SegmentedControl {...defaultProps} selected onClick={handleClick} />
      );

      const button = screen.getByRole("button");
      expect(button).toHaveClass("segmented-control", "selected");
      
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(button).toHaveClass("segmented-control", "selected");

      rerender(<SegmentedControl {...defaultProps} selected={false} onClick={handleClick} />);
      expect(button).toHaveClass("segmented-control", "default");
    });
  });

  describe("Uncontrolled mode", () => {
    it("toggles selected state when clicked", () => {
      render(<SegmentedControl {...defaultProps} />);
      const button = screen.getByRole("button");
      
      expect(button).toHaveClass("segmented-control", "default");
      
      fireEvent.click(button);
      expect(button).toHaveClass("segmented-control", "selected");
      
      fireEvent.click(button);
      expect(button).toHaveClass("segmented-control", "default");
    });
  });

  describe("Accessibility", () => {
    it("has correct ARIA attributes", () => {
      const { rerender } = render(<SegmentedControl {...defaultProps} />);
      const button = screen.getByRole("button");
      
      expect(button).toHaveAttribute("role", "button");
      expect(button).toHaveAttribute("aria-pressed", "false");
      
      rerender(<SegmentedControl {...defaultProps} selected />);
      expect(button).toHaveAttribute("aria-pressed", "true");
    });

    it("is keyboard accessible", () => {
      const handleClick = jest.fn();
      render(<SegmentedControl {...defaultProps} onClick={handleClick} />);
      const button = screen.getByRole("button");
      
      button.focus();
      expect(button).toHaveFocus();
      
      fireEvent.keyDown(button, { key: "Enter" });
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      fireEvent.keyDown(button, { key: " " });
      expect(handleClick).toHaveBeenCalledTimes(2);
    });
  });

  describe("Edge cases", () => {
    it("handles disabled state", () => {
      const handleClick = jest.fn();
      render(<SegmentedControl {...defaultProps} disabled onClick={handleClick} />);
      const button = screen.getByRole("button");
      
      expect(button).toBeDisabled();
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("handles empty children", () => {
      render(<SegmentedControl />);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<SegmentedControl {...defaultProps} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });
}); 
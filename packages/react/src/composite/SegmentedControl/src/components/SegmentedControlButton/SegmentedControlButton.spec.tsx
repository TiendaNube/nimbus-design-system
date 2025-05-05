import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SegmentedControlButton } from "./SegmentedControlButton";

describe("SegmentedControlButton", () => {
  const defaultProps = {
    label: "Option 1",
    index: 0,
    setActiveSegment: jest.fn(),
  };

  it("renders correctly", () => {
    render(<SegmentedControlButton {...defaultProps} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("applies selected style when active", () => {
    render(<SegmentedControlButton {...defaultProps} active />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("applies default style when not active", () => {
    render(<SegmentedControlButton {...defaultProps} />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("calls setActiveSegment when clicked", () => {
    const setActiveSegment = jest.fn();
    render(
      <SegmentedControlButton
        {...defaultProps}
        setActiveSegment={setActiveSegment}
      />
    );
    
    fireEvent.click(screen.getByRole("button"));
    expect(setActiveSegment).toHaveBeenCalledWith(0);
  });

  it("renders as an anchor when 'as' prop is set to 'a'", () => {
    render(
      <SegmentedControlButton
        {...defaultProps}
        as="a"
        href="#"
      />
    );
    const anchor = screen.getByRole("button");
    expect(anchor.tagName).toBe("A");
    expect(anchor).toHaveAttribute("href", "#");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<SegmentedControlButton {...defaultProps} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  describe("SegmentedControlButton.Skeleton", () => {
    it("renders skeleton component", () => {
      render(<SegmentedControlButton.Skeleton data-testid="skeleton" />);
      expect(screen.getByTestId("skeleton")).toBeInTheDocument();
    });
  });
}); 
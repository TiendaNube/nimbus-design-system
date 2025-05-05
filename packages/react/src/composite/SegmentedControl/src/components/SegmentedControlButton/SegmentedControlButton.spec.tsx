import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SegmentedControl } from "./SegmentedControlButton";

describe("SegmentedControl", () => {
  it("renders correctly", () => {
    render(<SegmentedControl>Option 1</SegmentedControl>);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("handles controlled selected state", () => {
    render(<SegmentedControl selected>Option 1</SegmentedControl>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button).toHaveClass("selected");
  });

  it("handles uncontrolled selected state", () => {
    render(<SegmentedControl>Option 1</SegmentedControl>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-pressed", "false");
    
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-pressed", "true");
    
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("calls onClick handler", () => {
    const handleClick = jest.fn();
    render(<SegmentedControl onClick={handleClick}>Option 1</SegmentedControl>);
    
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders as an anchor when 'as' prop is set to 'a'", () => {
    render(
      <SegmentedControl as="a" href="#">
        Option 1
      </SegmentedControl>
    );
    const anchor = screen.getByRole("button");
    expect(anchor.tagName).toBe("A");
    expect(anchor).toHaveAttribute("href", "#");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<SegmentedControl ref={ref}>Option 1</SegmentedControl>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  describe("SegmentedControl.Skeleton", () => {
    it("renders skeleton component", () => {
      render(<SegmentedControl.Skeleton />);
      expect(screen.getByTestId("segmented-control-skeleton")).toBeInTheDocument();
    });
  });
}); 
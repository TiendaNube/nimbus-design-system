import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { segmentedControl } from "@nimbus-ds/styles";
import { SegmentedControlButton } from "./SegmentedControlButton";

describe("SegmentedControlButton", () => {
  const defaultProps = {
    label: "Option 1",
    children: "Option 1",
    index: 0,
    setActiveSegment: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  it("calls setActiveSegment when clicked", async () => {
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

  it("does not call setActiveSegment when disabled", async () => {
    const setActiveSegment = jest.fn();
    render(
      <SegmentedControlButton
        {...defaultProps}
        setActiveSegment={setActiveSegment}
        disabled
      >
        Test Button
      </SegmentedControlButton>
    );

    await userEvent.click(screen.getByRole("button"));
    expect(setActiveSegment).not.toHaveBeenCalled();
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

  it("applies the correct classes when active", () => {
    render(
      <SegmentedControlButton
        {...defaultProps}
        active
      >
        Test Button
      </SegmentedControlButton>
    );

    const selectedClass = segmentedControl.subcomponents.button.classnames.appearance.selected;
    expect(screen.getByRole("button").className).toContain(selectedClass);
  });

  it("applies fullWidth class when fullWidth prop is true", () => {
    render(
      <SegmentedControlButton
        {...defaultProps}
        fullWidth
      >
        Test Button
      </SegmentedControlButton>
    );

    const fullWidthClass = segmentedControl.subcomponents.button.classnames.fullWidth;
    expect(screen.getByRole("button").className).toContain(fullWidthClass);
  });

  it("does not apply fullWidth class when fullWidth prop is false", () => {
    render(
      <SegmentedControlButton
        {...defaultProps}
        fullWidth={false}
      >
        Test Button
      </SegmentedControlButton>
    );

    const fullWidthClass = segmentedControl.subcomponents.button.classnames.fullWidth;
    expect(screen.getByRole("button").className).not.toContain(fullWidthClass);
  });

  describe("accessibility check useEffect", () => {
    beforeEach(() => {
      jest.spyOn(console, "error").mockImplementation(() => undefined);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should not call console.error when rendered as a button", () => {
      render(<SegmentedControlButton {...defaultProps} />);
      expect(console.error).not.toHaveBeenCalled();
    });

    it("should not call console.error when rendered as an anchor", () => {
      render(<SegmentedControlButton {...defaultProps} as="a" href="#" />);
      expect(console.error).not.toHaveBeenCalled();
    });

    it("should call console.error when rendered as a non-accessible element", () => {
      render(<SegmentedControlButton {...defaultProps} as="div" />);
      expect(console.error).toHaveBeenCalledWith(
        "Error: Found `SegmentedControlButton` component that renders an inaccessible element",
        expect.anything(),
        "Please ensure `SegmentedControlButton` always renders as <a> or <button>"
      );
    });
  });

  describe("SegmentedControlButton.Skeleton", () => {
    it("renders skeleton component", () => {
      render(<SegmentedControlButton.Skeleton data-testid="skeleton" />);
      expect(screen.getByTestId("skeleton")).toBeInTheDocument();
    });
  });
}); 
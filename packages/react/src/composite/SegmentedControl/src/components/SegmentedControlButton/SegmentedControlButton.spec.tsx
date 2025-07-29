import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { segmentedControl } from "@nimbus-ds/styles";
import { SegmentedControlButton } from ".";
import { SegmentedControlButtonSkeleton } from "./components";

describe("SegmentedControlButton", () => {
  const defaultProps = {
    id: "test-button",
    label: "Option 1",
    children: "Option 1",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    render(<SegmentedControlButton {...defaultProps} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("applies selected style when selected", () => {
    render(<SegmentedControlButton {...defaultProps} selected />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("applies default style when not selected", () => {
    render(<SegmentedControlButton {...defaultProps} />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("calls onClick when clicked", async () => {
    const onClick = jest.fn();
    render(<SegmentedControlButton {...defaultProps} onClick={onClick} />);

    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });

  it("renders as an anchor when 'as' prop is set to 'a'", () => {
    render(<SegmentedControlButton {...defaultProps} as="a" href="#" />);
    const anchor = screen.getByRole("button");
    expect(anchor.tagName).toBe("A");
    expect(anchor).toHaveAttribute("href", "#");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<SegmentedControlButton {...defaultProps} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("applies the correct classes when selected", () => {
    render(
      <SegmentedControlButton {...defaultProps} selected>
        Option 1
      </SegmentedControlButton>
    );

    const button = screen.getByRole("button");
    expect(button.className).toContain(
      segmentedControl.subcomponents.button.classnames.appearance.selected
    );
  });

  it("applies fullWidth class when fullWidth prop is true", () => {
    render(
      <SegmentedControlButton {...defaultProps} fullWidth>
        Option 1
      </SegmentedControlButton>
    );

    const button = screen.getByRole("button");
    expect(button.className).toContain("fullWidth");
  });

  it("does not apply fullWidth class when fullWidth prop is false", () => {
    render(
      <SegmentedControlButton {...defaultProps} fullWidth={false}>
        Option 1
      </SegmentedControlButton>
    );

    const button = screen.getByRole("button");
    expect(button.className).not.toContain("fullWidth");
  });

  describe("accessibility check useEffect", () => {
    beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      jest.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
      (console.error as jest.Mock).mockRestore();
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
      const CustomDiv = React.forwardRef<HTMLDivElement>((props, ref) => (
        <div {...props} ref={ref} />
      ));

      render(
        <SegmentedControlButton {...defaultProps} as={CustomDiv as any} />
      );
      expect(console.error).toHaveBeenCalledWith(
        "Error: Found `SegmentedControlButton` component that renders an inaccessible element",
        expect.any(Object),
        "Please ensure `SegmentedControlButton` always renders as <a> or <button>"
      );
    });

    it("should export SegmentedControlButton correctly", () => {
      render(
        <SegmentedControlButton id="test" label="Test">Test</SegmentedControlButton>
      );
      expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should export SegmentedControlButtonSkeleton correctly", () => {
      render(<SegmentedControlButtonSkeleton data-testid="skeleton" />);
      expect(screen.getByTestId("skeleton")).toBeInTheDocument();
    });
  });

  describe("SegmentedControlButtonSkeleton", () => {
    it("renders correctly with default props", () => {
      render(<SegmentedControlButtonSkeleton data-testid="skeleton" />);
      expect(screen.getByTestId("skeleton")).toBeInTheDocument();
    });

    it("renders with custom dimensions", () => {
      render(
        <SegmentedControlButtonSkeleton 
          data-testid="skeleton" 
          width="100px" 
          height="50px" 
        />
      );
      expect(screen.getByTestId("skeleton")).toBeInTheDocument();
    });
  });
});

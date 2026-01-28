import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { segmentedControl } from "@nimbus-ds/styles";
import { SegmentedControlButton } from ".";
import { SegmentedControlButtonSkeleton } from "./components";
import type { SegmentedControlContextValue } from "../../contexts/SegmentedControlContext";
import { SegmentedControlContext } from "../../contexts/SegmentedControlContext";

// Mock context value for testing
const createMockContextValue = (
  overrides: Partial<SegmentedControlContextValue> = {}
): SegmentedControlContextValue => ({
  registerButton: jest.fn(),
  unregisterButton: jest.fn(),
  toggleSegment: jest.fn(),
  isSelected: jest.fn().mockReturnValue(false),
  fullWidth: false,
  ...overrides,
});

// Test wrapper component
const SegmentedControlTestWrapper = ({
  children,
  contextValue = {},
}: {
  children: React.ReactNode;
  contextValue?: Partial<SegmentedControlContextValue>;
}) => {
  const mockContext = createMockContextValue(contextValue);
  return (
    <SegmentedControlContext.Provider value={mockContext}>
      {children}
    </SegmentedControlContext.Provider>
  );
};

SegmentedControlTestWrapper.defaultProps = {
  contextValue: {},
};

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
    render(
      <SegmentedControlTestWrapper>
        <SegmentedControlButton {...defaultProps} />
      </SegmentedControlTestWrapper>
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("applies selected style when selected", () => {
    render(
      <SegmentedControlTestWrapper
        contextValue={{ isSelected: jest.fn().mockReturnValue(true) }}
      >
        <SegmentedControlButton {...defaultProps} />
      </SegmentedControlTestWrapper>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("applies default style when not selected", () => {
    render(
      <SegmentedControlTestWrapper>
        <SegmentedControlButton {...defaultProps} />
      </SegmentedControlTestWrapper>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("calls onClick when clicked", async () => {
    const onClick = jest.fn();
    render(
      <SegmentedControlTestWrapper>
        <SegmentedControlButton {...defaultProps} onClick={onClick} />
      </SegmentedControlTestWrapper>
    );

    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });

  it("renders as an anchor when 'as' prop is set to 'a'", () => {
    render(
      <SegmentedControlTestWrapper>
        <SegmentedControlButton {...defaultProps} as="a" href="#" />
      </SegmentedControlTestWrapper>
    );
    const anchor = screen.getByRole("button");
    expect(anchor.tagName).toBe("A");
    expect(anchor).toHaveAttribute("href", "#");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <SegmentedControlTestWrapper>
        <SegmentedControlButton {...defaultProps} ref={ref} />
      </SegmentedControlTestWrapper>
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("applies the correct classes when selected", () => {
    render(
      <SegmentedControlTestWrapper
        contextValue={{ isSelected: jest.fn().mockReturnValue(true) }}
      >
        <SegmentedControlButton {...defaultProps}>
          Option 1
        </SegmentedControlButton>
      </SegmentedControlTestWrapper>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      segmentedControl.subcomponents.button.classnames.appearance.selected
    );
  });

  it("applies fullWidth class when fullWidth prop is true", () => {
    render(
      <SegmentedControlTestWrapper contextValue={{ fullWidth: true }}>
        <SegmentedControlButton {...defaultProps} fullWidth>
          Option 1
        </SegmentedControlButton>
      </SegmentedControlTestWrapper>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      segmentedControl.subcomponents.button.classnames.fullWidth
    );
  });

  it("does not apply fullWidth class when fullWidth prop is false", () => {
    render(
      <SegmentedControlTestWrapper>
        <SegmentedControlButton {...defaultProps} fullWidth={false}>
          Option 1
        </SegmentedControlButton>
      </SegmentedControlTestWrapper>
    );

    const button = screen.getByRole("button");
    expect(button).not.toHaveClass(
      segmentedControl.subcomponents.button.classnames.fullWidth
    );
  });

  describe("accessibility check useEffect", () => {
    let consoleErrorSpy: jest.SpyInstance;
    beforeAll(() => {
      consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    });

    afterAll(() => {
      consoleErrorSpy.mockRestore();
    });

    it("should not call console.error when rendered as a button", () => {
      render(
        <SegmentedControlTestWrapper>
          <SegmentedControlButton {...defaultProps} />
        </SegmentedControlTestWrapper>
      );
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it("should not call console.error when rendered as an anchor", () => {
      render(
        <SegmentedControlTestWrapper>
          <SegmentedControlButton {...defaultProps} as="a" href="#" />
        </SegmentedControlTestWrapper>
      );
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it("should call console.error when rendered as a non-accessible element", () => {
      render(
        <SegmentedControlTestWrapper>
          <SegmentedControlButton {...defaultProps} as="div" />
        </SegmentedControlTestWrapper>
      );
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it("should export SegmentedControlButton correctly", () => {
      render(
        <SegmentedControlTestWrapper>
          <SegmentedControlButton {...defaultProps} />
        </SegmentedControlTestWrapper>
      );
      expect(screen.getByRole("button")).toBeInTheDocument();
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
          width="100px"
          height="50px"
          data-testid="skeleton"
        />
      );
      const skeleton = screen.getByTestId("skeleton");
      expect(skeleton).toBeInTheDocument();
    });
  });
});

import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SegmentedControl } from "./SegmentedControl";

describe("<SegmentedControl />", () => {
  const defaultProps = {
    children: [
      <SegmentedControl.Button key="option1" label="Option 1" selected>
        Option 1
      </SegmentedControl.Button>,
      <SegmentedControl.Button key="option2" label="Option 2">
        Option 2
      </SegmentedControl.Button>,
      <SegmentedControl.Button key="option3" label="Option 3">
        Option 3
      </SegmentedControl.Button>,
    ],
  };

  const mockOnSegmentsSelect = jest.fn();

  beforeEach(() => {
    mockOnSegmentsSelect.mockClear();
  });

  it("renders correctly", () => {
    render(<SegmentedControl {...defaultProps} />);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  it("applies default styling", () => {
    render(<SegmentedControl {...defaultProps} />);
    const container = screen.getByTestId("segmented-control-container");
    expect(container).toBeInTheDocument();
  });

  it("selects the first segment by default", () => {
    render(<SegmentedControl {...defaultProps} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
    expect(buttons[1]).toHaveAttribute("aria-pressed", "false");
    expect(buttons[2]).toHaveAttribute("aria-pressed", "false");
  });

  it("initializes with selected segments from children props", () => {
    const children = [
      <SegmentedControl.Button key="option1" label="Option 1" selected />,
      <SegmentedControl.Button key="option2" label="Option 2" />,
      <SegmentedControl.Button key="option3" label="Option 3" selected />,
    ];

    render(<SegmentedControl>{children}</SegmentedControl>);
    const buttons = screen.getAllByRole("button");

    expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
    expect(buttons[1]).toHaveAttribute("aria-pressed", "false");
    expect(buttons[2]).toHaveAttribute("aria-pressed", "true");
  });

  it("passes fullWidth prop to SegmentedControlButton", () => {
    render(
      <SegmentedControl fullWidth data-testid="segmented-control">
        <SegmentedControl.Button label="Option 1">
          Option 1
        </SegmentedControl.Button>
        <SegmentedControl.Button label="Option 2">
          Option 2
        </SegmentedControl.Button>
      </SegmentedControl>
    );

    const buttons = screen.getAllByRole("button");

    // Check that all buttons have the fullWidth class
    buttons.forEach((button) => {
      expect(button.className).toContain("fullWidth");
    });
  });

  it("handles selection correctly in uncontrolled mode", async () => {
    const user = userEvent.setup();

    render(
      <SegmentedControl>
        <SegmentedControl.Button label="Option 1" selected>
          Option 1
        </SegmentedControl.Button>
        <SegmentedControl.Button label="Option 2">
          Option 2
        </SegmentedControl.Button>
      </SegmentedControl>
    );

    // First button should be selected by default
    expect(screen.getAllByRole("button")[0]).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(screen.getAllByRole("button")[1]).toHaveAttribute(
      "aria-pressed",
      "false"
    );

    // Click the second button
    await act(async () => {
      await user.click(screen.getByText("Option 2"));
    });

    // Wait for the state update - both buttons should now be selected
    await waitFor(() => {
      expect(screen.getAllByRole("button")[0]).toHaveAttribute(
        "aria-pressed",
        "true"
      );
      expect(screen.getAllByRole("button")[1]).toHaveAttribute(
        "aria-pressed",
        "true"
      );
    });
  });

  it("allows selecting multiple segments when clicked", () => {
    render(<SegmentedControl {...defaultProps} />);
    const buttons = screen.getAllByRole("button");

    // Default selection is the first segment
    expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
    expect(buttons[1]).toHaveAttribute("aria-pressed", "false");
    expect(buttons[2]).toHaveAttribute("aria-pressed", "false");

    // Click second segment to add it
    act(() => {
      fireEvent.click(buttons[1]);
    });
    expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
    expect(buttons[1]).toHaveAttribute("aria-pressed", "true");
    expect(buttons[2]).toHaveAttribute("aria-pressed", "false");

    // Click third segment to add it
    act(() => {
      fireEvent.click(buttons[2]);
    });
    expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
    expect(buttons[1]).toHaveAttribute("aria-pressed", "true");
    expect(buttons[2]).toHaveAttribute("aria-pressed", "true");
  });

  it("passes fullWidth when true", () => {
    const { rerender } = render(
      <SegmentedControl fullWidth>
        <SegmentedControl.Button label="Option 1">
          Option 1
        </SegmentedControl.Button>
        <SegmentedControl.Button label="Option 2">
          Option 2
        </SegmentedControl.Button>
      </SegmentedControl>
    );

    expect(screen.getAllByRole("button")[0].className).toContain("fullWidth");
    expect(screen.getAllByRole("button")[1].className).toContain("fullWidth");

    // Rerender without fullWidth
    rerender(
      <SegmentedControl>
        <SegmentedControl.Button label="Option 1">
          Option 1
        </SegmentedControl.Button>
        <SegmentedControl.Button label="Option 2">
          Option 2
        </SegmentedControl.Button>
      </SegmentedControl>
    );

    expect(screen.getAllByRole("button")[0].className).not.toContain(
      "fullWidth"
    );
    expect(screen.getAllByRole("button")[1].className).not.toContain(
      "fullWidth"
    );
  });

  it("allows deselecting a segment when multiple are selected", () => {
    render(<SegmentedControl {...defaultProps} />);
    const buttons = screen.getAllByRole("button");

    // First select multiple segments
    act(() => {
      fireEvent.click(buttons[1]);
    });
    expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
    expect(buttons[1]).toHaveAttribute("aria-pressed", "true");

    // Deselect first segment
    act(() => {
      fireEvent.click(buttons[0]);
    });
    expect(buttons[0]).toHaveAttribute("aria-pressed", "false");
    expect(buttons[1]).toHaveAttribute("aria-pressed", "true");
  });

  it("renders with selected segments in controlled mode", () => {
    render(
      <SegmentedControl
        {...defaultProps}
        selectedSegments={[1, 2]}
        onSegmentsSelect={mockOnSegmentsSelect}
      />
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveAttribute("aria-pressed", "false");
    expect(buttons[1]).toHaveAttribute("aria-pressed", "true");
    expect(buttons[2]).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onSegmentsSelect when selecting a segment", () => {
    render(
      <SegmentedControl
        {...defaultProps}
        selectedSegments={[0]}
        onSegmentsSelect={mockOnSegmentsSelect}
      />
    );

    const buttons = screen.getAllByRole("button");
    act(() => {
      fireEvent.click(buttons[1]);
    });

    expect(mockOnSegmentsSelect).toHaveBeenCalledWith([0, 1]);
  });

  it("calls onSegmentsSelect when deselecting a segment", () => {
    render(
      <SegmentedControl
        {...defaultProps}
        selectedSegments={[0, 1]}
        onSegmentsSelect={mockOnSegmentsSelect}
      />
    );

    const buttons = screen.getAllByRole("button");
    act(() => {
      fireEvent.click(buttons[0]);
    });

    expect(mockOnSegmentsSelect).toHaveBeenCalledWith([1]);
  });

  it("ignores child selected props in controlled mode", () => {
    const children = [
      <SegmentedControl.Button key="option1" label="Option 1" selected />,
      <SegmentedControl.Button key="option2" label="Option 2" selected />,
    ];

    render(
      <SegmentedControl
        selectedSegments={[1]}
        onSegmentsSelect={mockOnSegmentsSelect}
      >
        {children}
      </SegmentedControl>
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveAttribute("aria-pressed", "false");
    expect(buttons[1]).toHaveAttribute("aria-pressed", "true");
  });

  it("updates selection when selectedSegments prop changes", () => {
    const { rerender } = render(
      <SegmentedControl
        {...defaultProps}
        selectedSegments={[0]}
        onSegmentsSelect={mockOnSegmentsSelect}
      />
    );

    let buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
    expect(buttons[1]).toHaveAttribute("aria-pressed", "false");

    rerender(
      <SegmentedControl
        {...defaultProps}
        selectedSegments={[1, 2]}
        onSegmentsSelect={mockOnSegmentsSelect}
      />
    );

    buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveAttribute("aria-pressed", "false");
    expect(buttons[1]).toHaveAttribute("aria-pressed", "true");
    expect(buttons[2]).toHaveAttribute("aria-pressed", "true");
  });

  it("has correct ARIA attributes", () => {
    render(<SegmentedControl {...defaultProps} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
    expect(buttons[0]).toHaveAttribute("id", "segment-option-1");
    expect(buttons[0]).toHaveAttribute("role", "button");

    expect(buttons[1]).toHaveAttribute("aria-pressed", "false");
    expect(buttons[1]).toHaveAttribute("id", "segment-option-2");
    expect(buttons[1]).toHaveAttribute("role", "button");

    expect(buttons[2]).toHaveAttribute("aria-pressed", "false");
    expect(buttons[2]).toHaveAttribute("id", "segment-option-3");
    expect(buttons[2]).toHaveAttribute("role", "button");
  });

  it("generates correct button IDs from labels", () => {
    render(<SegmentedControl {...defaultProps} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveAttribute("id", "segment-option-1");
    expect(buttons[1]).toHaveAttribute("id", "segment-option-2");
    expect(buttons[2]).toHaveAttribute("id", "segment-option-3");
  });

  it("renders the skeleton component correctly", () => {
    render(
      <SegmentedControl>
        <SegmentedControl.Button label="Option 1">
          Option 1
        </SegmentedControl.Button>
        <SegmentedControl.ButtonSkeleton data-testid="skeleton" />
        <SegmentedControl.Button label="Option 2">
          Option 2
        </SegmentedControl.Button>
      </SegmentedControl>
    );

    // Verify the buttons are rendered
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    
    // Check that the skeleton is rendered
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("returns non-button children as is", () => {
    const TestComponent = () => <div data-testid="test-component">Test</div>;
    
    render(
      <SegmentedControl>
        <SegmentedControl.Button label="Option 1">
          Option 1
        </SegmentedControl.Button>
        <TestComponent />
      </SegmentedControl>
    );

    // Verify the button is rendered
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    
    // Check that the custom component is rendered
    expect(screen.getByTestId("test-component")).toBeInTheDocument();
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});

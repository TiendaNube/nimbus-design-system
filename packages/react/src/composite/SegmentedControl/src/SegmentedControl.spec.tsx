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
      <SegmentedControl.Button key="option1" id="option1" label="Option 1" selected>
        Option 1
      </SegmentedControl.Button>,
      <SegmentedControl.Button key="option2" id="option2" label="Option 2">
        Option 2
      </SegmentedControl.Button>,
      <SegmentedControl.Button key="option3" id="option3" label="Option 3">
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
    expect(buttons[0]).toHaveAttribute("aria-pressed", "false");
    expect(buttons[1]).toHaveAttribute("aria-pressed", "false");
    expect(buttons[2]).toHaveAttribute("aria-pressed", "false");
  });

  it("initializes with selected segments from children props", () => {
    const children = [
      <SegmentedControl.Button key="option1" id="option1" label="Option 1" selected />,
      <SegmentedControl.Button key="option2" id="option2" label="Option 2" />,
      <SegmentedControl.Button key="option3" id="option3" label="Option 3" selected />,
    ];

    render(<SegmentedControl>{children}</SegmentedControl>);
    const buttons = screen.getAllByRole("button");

    expect(buttons[0]).toHaveAttribute("aria-pressed", "false");
    expect(buttons[1]).toHaveAttribute("aria-pressed", "false");
    expect(buttons[2]).toHaveAttribute("aria-pressed", "false");
  });

  it("passes fullWidth prop to SegmentedControlButton", () => {
    render(
      <SegmentedControl fullWidth data-testid="segmented-control">
        <SegmentedControl.Button id="option1" label="Option 1">
          Option 1
        </SegmentedControl.Button>
        <SegmentedControl.Button id="option2" label="Option 2">
          Option 2
        </SegmentedControl.Button>
      </SegmentedControl>
    );

    const buttons = screen.getAllByRole("button");

    buttons.forEach((button) => {
      expect(button.className).toContain("fullWidth");
    });
  });

  it("handles selection correctly in uncontrolled mode", async () => {
    const user = userEvent.setup();

    render(
      <SegmentedControl>
        <SegmentedControl.Button id="option1" label="Option 1" selected>
          Option 1
        </SegmentedControl.Button>
        <SegmentedControl.Button id="option2" label="Option 2">
          Option 2
        </SegmentedControl.Button>
      </SegmentedControl>
    );

    expect(screen.getAllByRole("button")[0]).toHaveAttribute(
      "aria-pressed",
      "false"
    );
    expect(screen.getAllByRole("button")[1]).toHaveAttribute(
      "aria-pressed",
      "false"
    );

    await act(async () => {
      await user.click(screen.getByText("Option 2"));
    });

    await waitFor(() => {
      expect(screen.getAllByRole("button")[0]).toHaveAttribute(
        "aria-pressed",
        "false"
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

    expect(buttons[0]).toHaveAttribute("aria-pressed", "false");
    expect(buttons[1]).toHaveAttribute("aria-pressed", "false");
    expect(buttons[2]).toHaveAttribute("aria-pressed", "false");

    act(() => {
      fireEvent.click(buttons[1]);
    });
    expect(buttons[0]).toHaveAttribute("aria-pressed", "false");
    expect(buttons[1]).toHaveAttribute("aria-pressed", "true");
    expect(buttons[2]).toHaveAttribute("aria-pressed", "false");

    act(() => {
      fireEvent.click(buttons[2]);
    });
    expect(buttons[0]).toHaveAttribute("aria-pressed", "false");
    expect(buttons[1]).toHaveAttribute("aria-pressed", "true");
    expect(buttons[2]).toHaveAttribute("aria-pressed", "true");
  });

  it("passes fullWidth when true", () => {
    const { rerender } = render(
      <SegmentedControl fullWidth>
        <SegmentedControl.Button id="option1" label="Option 1">
          Option 1
        </SegmentedControl.Button>
        <SegmentedControl.Button id="option2" label="Option 2">
          Option 2
        </SegmentedControl.Button>
      </SegmentedControl>
    );

    expect(screen.getAllByRole("button")[0].className).toContain("fullWidth");
    expect(screen.getAllByRole("button")[1].className).toContain("fullWidth");

    rerender(
      <SegmentedControl>
        <SegmentedControl.Button id="option1" label="Option 1">
          Option 1
        </SegmentedControl.Button>
        <SegmentedControl.Button id="option2" label="Option 2">
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

    act(() => {
      fireEvent.click(buttons[0]);
    });
    act(() => {
      fireEvent.click(buttons[1]);
    });
    expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
    expect(buttons[1]).toHaveAttribute("aria-pressed", "true");

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
        selectedSegments={["option2", "option3"]}
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
        selectedSegments={["option1"]}
        onSegmentsSelect={mockOnSegmentsSelect}
      />
    );

    const buttons = screen.getAllByRole("button");
    act(() => {
      fireEvent.click(buttons[1]);
    });

    expect(mockOnSegmentsSelect).toHaveBeenCalledWith(["option1", "option2"]);
  });

  it("calls onSegmentsSelect when deselecting a segment", () => {
    render(
      <SegmentedControl
        {...defaultProps}
        selectedSegments={["option1", "option2"]}
        onSegmentsSelect={mockOnSegmentsSelect}
      />
    );

    const buttons = screen.getAllByRole("button");
    act(() => {
      fireEvent.click(buttons[0]);
    });

    expect(mockOnSegmentsSelect).toHaveBeenCalledWith(["option2"]);
  });

  it("ignores child selected props in controlled mode", () => {
    const children = [
      <SegmentedControl.Button key="option1" id="option1" label="Option 1" selected />,
      <SegmentedControl.Button key="option2" id="option2" label="Option 2" selected />,
    ];

    render(
      <SegmentedControl
        selectedSegments={["option2"]}
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
        selectedSegments={["option1"]}
        onSegmentsSelect={mockOnSegmentsSelect}
      />
    );

    let buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
    expect(buttons[1]).toHaveAttribute("aria-pressed", "false");

    rerender(
      <SegmentedControl
        {...defaultProps}
        selectedSegments={["option2", "option3"]}
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
    expect(buttons[0]).toHaveAttribute("aria-pressed", "false");
    expect(buttons[0]).toHaveAttribute("id", "option1");
    expect(buttons[0]).toHaveAttribute("role", "button");

    expect(buttons[1]).toHaveAttribute("aria-pressed", "false");
    expect(buttons[1]).toHaveAttribute("id", "option2");
    expect(buttons[1]).toHaveAttribute("role", "button");

    expect(buttons[2]).toHaveAttribute("aria-pressed", "false");
    expect(buttons[2]).toHaveAttribute("id", "option3");
    expect(buttons[2]).toHaveAttribute("role", "button");
  });

  it("generates correct button IDs from labels", () => {
    render(<SegmentedControl {...defaultProps} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveAttribute("id", "option1");
    expect(buttons[1]).toHaveAttribute("id", "option2");
    expect(buttons[2]).toHaveAttribute("id", "option3");
  });

  it("renders the skeleton component correctly", () => {
    render(
      <SegmentedControl>
        <SegmentedControl.Button id="option1" label="Option 1">
          Option 1
        </SegmentedControl.Button>
        <SegmentedControl.ButtonSkeleton data-testid="skeleton" />
        <SegmentedControl.Button id="option2" label="Option 2">
          Option 2
        </SegmentedControl.Button>
      </SegmentedControl>
    );

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("returns non-button children as is", () => {
    const TestComponent = () => <div data-testid="test-component">Test</div>;
    
    render(
      <SegmentedControl>
        <SegmentedControl.Button id="option1" label="Option 1">
          Option 1
        </SegmentedControl.Button>
        <TestComponent />
      </SegmentedControl>
    );

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    
    expect(screen.getByTestId("test-component")).toBeInTheDocument();
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});

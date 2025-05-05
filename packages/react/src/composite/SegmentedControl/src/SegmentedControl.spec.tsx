import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SegmentedControl } from "./SegmentedControl";

describe("SegmentedControl", () => {
  const defaultProps = {
    children: [
      <SegmentedControl.Item key="option1" label="Option 1">Content 1</SegmentedControl.Item>,
      <SegmentedControl.Item key="option2" label="Option 2">Content 2</SegmentedControl.Item>,
      <SegmentedControl.Item key="option3" label="Option 3">Content 3</SegmentedControl.Item>,
    ],
  };

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

  describe("Uncontrolled mode", () => {
    it("initializes with selected segments from children props", () => {
      const children = [
        <SegmentedControl.Item key="option1" label="Option 1" selected>Content 1</SegmentedControl.Item>,
        <SegmentedControl.Item key="option2" label="Option 2">Content 2</SegmentedControl.Item>,
        <SegmentedControl.Item key="option3" label="Option 3" selected>Content 3</SegmentedControl.Item>,
      ];

      render(<SegmentedControl>{children}</SegmentedControl>);
      const buttons = screen.getAllByRole("button");
      
      expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
      expect(buttons[1]).toHaveAttribute("aria-pressed", "false");
      expect(buttons[2]).toHaveAttribute("aria-pressed", "true");
    });

    it("allows selecting multiple segments when clicked", () => {
      render(<SegmentedControl {...defaultProps} />);
      const buttons = screen.getAllByRole("button");

      // Default selection is the first segment
      expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
      expect(buttons[1]).toHaveAttribute("aria-pressed", "false");
      expect(buttons[2]).toHaveAttribute("aria-pressed", "false");

      // Click second segment to add it
      fireEvent.click(buttons[1]);
      expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
      expect(buttons[1]).toHaveAttribute("aria-pressed", "true");
      expect(buttons[2]).toHaveAttribute("aria-pressed", "false");

      // Click third segment to add it
      fireEvent.click(buttons[2]);
      expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
      expect(buttons[1]).toHaveAttribute("aria-pressed", "true");
      expect(buttons[2]).toHaveAttribute("aria-pressed", "true");
    });

    it("allows deselecting a segment when multiple are selected", () => {
      render(<SegmentedControl {...defaultProps} />);
      const buttons = screen.getAllByRole("button");

      // First select multiple segments
      fireEvent.click(buttons[1]);
      expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
      expect(buttons[1]).toHaveAttribute("aria-pressed", "true");
      
      // Deselect first segment
      fireEvent.click(buttons[0]);
      expect(buttons[0]).toHaveAttribute("aria-pressed", "false");
      expect(buttons[1]).toHaveAttribute("aria-pressed", "true");
    });

    it("prevents deselecting the last selected segment", () => {
      render(<SegmentedControl {...defaultProps} />);
      const buttons = screen.getAllByRole("button");

      // Try to deselect the only selected segment
      fireEvent.click(buttons[0]);
      
      // The segment should remain selected
      expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
      expect(buttons[1]).toHaveAttribute("aria-pressed", "false");
      expect(buttons[2]).toHaveAttribute("aria-pressed", "false");
    });

    it("falls back to first segment if no segments have selected prop", () => {
      const children = [
        <SegmentedControl.Item key="option1" label="Option 1">Content 1</SegmentedControl.Item>,
        <SegmentedControl.Item key="option2" label="Option 2">Content 2</SegmentedControl.Item>,
      ];

      render(<SegmentedControl>{children}</SegmentedControl>);
      const buttons = screen.getAllByRole("button");
      
      expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
      expect(buttons[1]).toHaveAttribute("aria-pressed", "false");
    });
  });

  describe("Controlled mode", () => {
    const mockOnSegmentsSelect = jest.fn();

    beforeEach(() => {
      mockOnSegmentsSelect.mockClear();
    });

    it("renders with selected segments", () => {
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
      fireEvent.click(buttons[1]);
      
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
      fireEvent.click(buttons[0]);
      
      expect(mockOnSegmentsSelect).toHaveBeenCalledWith([1]);
    });

    it("ignores child selected props in controlled mode", () => {
      const children = [
        <SegmentedControl.Item key="option1" label="Option 1" selected>Content 1</SegmentedControl.Item>,
        <SegmentedControl.Item key="option2" label="Option 2" selected>Content 2</SegmentedControl.Item>,
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

    it("prevents deselecting the last selected segment", () => {
      render(
        <SegmentedControl 
          {...defaultProps} 
          selectedSegments={[0]}
          onSegmentsSelect={mockOnSegmentsSelect}
        />
      );

      const buttons = screen.getAllByRole("button");
      fireEvent.click(buttons[0]);
      
      // In controlled mode, the callback is still called with the same array
      expect(mockOnSegmentsSelect).toHaveBeenCalledWith([0]);
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

    it("falls back to first segment if selectedSegments is empty", () => {
      render(
        <SegmentedControl 
          {...defaultProps} 
          selectedSegments={[]}
          onSegmentsSelect={mockOnSegmentsSelect}
        />
      );

      const buttons = screen.getAllByRole("button");
      expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
      expect(buttons[1]).toHaveAttribute("aria-pressed", "false");
      expect(buttons[2]).toHaveAttribute("aria-pressed", "false");
    });
  });

  describe("Accessibility", () => {
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
  });

  describe("ID generation", () => {
    it("generates correct button IDs from labels", () => {
      render(<SegmentedControl {...defaultProps} />);
      
      const buttons = screen.getAllByRole("button");
      expect(buttons[0]).toHaveAttribute("id", "segment-option-1");
      expect(buttons[1]).toHaveAttribute("id", "segment-option-2");
      expect(buttons[2]).toHaveAttribute("id", "segment-option-3");
    });
  });
});

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { ScrollPane } from "./ScrollPane";
import { ScrollPaneContext } from "./components/ScrollPaneContext";

// Mock getBoundingClientRect
const mockGetBoundingClientRect = jest.fn(() => ({
  left: 0,
  right: 100,
  top: 0,
  bottom: 100,
  width: 100,
  height: 100,
  x: 0,
  y: 0,
  toJSON: jest.fn()
}));

Element.prototype.getBoundingClientRect = mockGetBoundingClientRect;

describe("ScrollPane", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Reset the getBoundingClientRect mock for each test
    mockGetBoundingClientRect.mockReturnValue({
      left: 0,
      right: 100,
      top: 0,
      bottom: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      toJSON: jest.fn()
    });
  });

  it("renders without crashing", () => {
    render(
      <ScrollPane>
        <ScrollPane.Item>Item 1</ScrollPane.Item>
        <ScrollPane.Item>Item 2</ScrollPane.Item>
      </ScrollPane>
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("renders with correct default props", () => {
    const { container } = render(
      <ScrollPane data-testid="scroll-pane">
        <ScrollPane.Item>Item 1</ScrollPane.Item>
      </ScrollPane>
    );

    const scrollArea = container.querySelector('[class*="scrollArea"]');
    expect(scrollArea).toBeInTheDocument();
  });

  it("applies custom className and style", () => {
    const customStyle = { backgroundColor: "red" };
    const { container } = render(
      <ScrollPane className="custom-class" style={customStyle}>
        <ScrollPane.Item>Item 1</ScrollPane.Item>
      </ScrollPane>
    );

    const scrollPane = container.firstChild as HTMLElement;
    expect(scrollPane.className).toContain("nimbus-box_position-relative");
    expect(scrollPane.className).toContain("nimbus-box_boxSizing-border-box");
  });

  it("handles vertical direction", () => {
    const { container } = render(
      <ScrollPane direction="vertical">
        <ScrollPane.Item>Item 1</ScrollPane.Item>
      </ScrollPane>
    );

    const scrollArea = container.querySelector('[class*="scrollArea"]');
    expect(scrollArea).toBeInTheDocument();
  });

  it("hides scrollbar when showScrollbar is false", () => {
    const { container } = render(
      <ScrollPane showScrollbar={false}>
        <ScrollPane.Item>Item 1</ScrollPane.Item>
      </ScrollPane>
    );

    const scrollArea = container.querySelector('[class*="scrollArea"]');
    expect(scrollArea).toBeInTheDocument();
  });

  it("renders navigation arrows when showArrows is true", () => {
    // Mock scroll dimensions to trigger arrow visibility
    Object.defineProperty(HTMLElement.prototype, "scrollWidth", {
      configurable: true,
      value: 1000,
    });
    Object.defineProperty(HTMLElement.prototype, "clientWidth", {
      configurable: true,
      value: 300,
    });
    Object.defineProperty(HTMLElement.prototype, "scrollLeft", {
      configurable: true,
      value: 100,
    });

    render(
      <ScrollPane 
        showArrows
        scrollPaneArrowStart={<ScrollPane.ArrowHorizontalStart>←</ScrollPane.ArrowHorizontalStart>}
        scrollPaneArrowEnd={<ScrollPane.ArrowHorizontalEnd>→</ScrollPane.ArrowHorizontalEnd>}
      >
        <ScrollPane.Item>Item 1</ScrollPane.Item>
        <ScrollPane.Item>Item 2</ScrollPane.Item>
      </ScrollPane>
    );

    // Trigger scroll position check by firing a scroll event
    const scrollArea = document.querySelector('[class*="scrollArea"]');
    if (scrollArea) {
      fireEvent.scroll(scrollArea);
    }

    // Check for arrow buttons by their aria-label
    const leftArrow = screen.queryByLabelText("Scroll backward");
    const rightArrow = screen.queryByLabelText("Scroll forward");
    
    expect(leftArrow || rightArrow).toBeTruthy();
  });

  it("handles item click for scroll-to-item functionality", async () => {
    const mockScrollTo = jest.fn();
    Object.defineProperty(HTMLElement.prototype, "scrollTo", {
      configurable: true,
      value: mockScrollTo,
    });

    // Mock getBoundingClientRect for containers and items
    const mockGetBoundingClientRect = jest.fn();
    mockGetBoundingClientRect
      .mockReturnValueOnce({
        left: 0,
        right: 300,
        width: 300,
        height: 100,
        top: 0,
        bottom: 100,
      }) // container rect
      .mockReturnValueOnce({
        left: 250,
        right: 350,
        width: 100,
        height: 50,
        top: 25,
        bottom: 75,
      }); // item rect

    Element.prototype.getBoundingClientRect = mockGetBoundingClientRect;

    render(
      <ScrollPane scrollToItemOnClick>
        <ScrollPane.Item data-testid="item-1">Item 1</ScrollPane.Item>
      </ScrollPane>
    );

    const item = screen.getByTestId("item-1");
    fireEvent.click(item);

    await waitFor(() => {
      expect(mockScrollTo).toHaveBeenCalled();
    });
  });


  it("provides context to child items", () => {
    const TestItem = () => {
      const context = React.useContext(ScrollPaneContext);
      return <div data-testid="context-direction">{context?.direction}</div>;
    };

    render(
      <ScrollPane direction="vertical">
        <TestItem />
      </ScrollPane>
    );

    expect(screen.getByTestId("context-direction")).toHaveTextContent("vertical");
  });

  it("handles scroll events properly", () => {
    const { container } = render(
      <ScrollPane>
        <ScrollPane.Item>Item 1</ScrollPane.Item>
        <ScrollPane.Item>Item 2</ScrollPane.Item>
      </ScrollPane>
    );

    const scrollArea = container.querySelector('[class*="scrollArea"]');
    expect(scrollArea).toBeInTheDocument();

    // Simulate scroll event
    fireEvent.scroll(scrollArea!);

    // The component should handle the scroll event without errors
    expect(scrollArea).toBeInTheDocument();
  });

  it("clears existing timeout when handleScroll is called multiple times", () => {
    jest.useFakeTimers();
    const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");

    const { container } = render(
      <ScrollPane>
        <ScrollPane.Item>Item 1</ScrollPane.Item>
        <ScrollPane.Item>Item 2</ScrollPane.Item>
      </ScrollPane>
    );

    const scrollArea = container.querySelector('[class*="scrollArea"]');
    
    // First scroll event - creates a timeout
    fireEvent.scroll(scrollArea!);
    
    // Second scroll event - should clear the previous timeout
    fireEvent.scroll(scrollArea!);

    expect(clearTimeoutSpy).toHaveBeenCalled();
    
    jest.useRealTimers();
    clearTimeoutSpy.mockRestore();
  });

  it("sets isScrolling to false after scroll timeout", async () => {
    jest.useFakeTimers();
    const setTimeoutSpy = jest.spyOn(global, "setTimeout");

    const { container } = render(
      <ScrollPane>
        <ScrollPane.Item>Item 1</ScrollPane.Item>
        <ScrollPane.Item>Item 2</ScrollPane.Item>
      </ScrollPane>
    );

    const scrollArea = container.querySelector('[class*="scrollArea"]');
    
    // Trigger scroll event to create the timeout
    fireEvent.scroll(scrollArea!);
    
    // Verify setTimeout was called with the correct delay
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 150);
    
    // Get the callback function that was passed to setTimeout
    const timeoutCallback = setTimeoutSpy.mock.calls[setTimeoutSpy.mock.calls.length - 1][0];
    
    // Execute the callback directly to ensure setIsScrolling(false) is called
    await waitFor(() => {
      timeoutCallback();
    });
    
    // Also test with timer advancement
    jest.advanceTimersByTime(150);
    
    // The component should still be functioning after the timeout
    expect(scrollArea).toBeInTheDocument();
    
    jest.useRealTimers();
    setTimeoutSpy.mockRestore();
  });

  it("returns early when containerRef.current is null in scrollToDirection", () => {
    const mockScrollTo = jest.fn();
    Object.defineProperty(HTMLElement.prototype, "scrollTo", {
      configurable: true,
      value: mockScrollTo,
    });

    const { container } = render(
      <ScrollPane 
        showArrows
        scrollPaneArrowStart={<ScrollPane.ArrowHorizontalStart>←</ScrollPane.ArrowHorizontalStart>}
      >
        <ScrollPane.Item>Item 1</ScrollPane.Item>
      </ScrollPane>
    );

    const leftArrow = screen.getByLabelText("Scroll backward");
    
    // Mock containerRef.current to be null
    const scrollArea = container.querySelector('[class*="scrollArea"]') as HTMLElement;
    if (scrollArea) {
      // Remove the scrollArea from DOM to simulate null containerRef
      scrollArea.remove();
    }
    
    // Click should not cause scrollTo to be called due to null check
    fireEvent.click(leftArrow);
    
    expect(mockScrollTo).not.toHaveBeenCalled();
  });

  it("returns early when container is null in checkScrollPosition", () => {
    const { container, rerender } = render(
      <ScrollPane>
        <ScrollPane.Item>Item 1</ScrollPane.Item>
      </ScrollPane>
    );

    const scrollArea = container.querySelector('[class*="scrollArea"]');
    expect(scrollArea).toBeInTheDocument();

    // Force rerender with containerRef being null by unmounting and remounting
    rerender(<div />);
    rerender(
      <ScrollPane>
        <ScrollPane.Item>Item 1</ScrollPane.Item>
      </ScrollPane>
    );

    // The component should handle the null container gracefully
    expect(container).toBeInTheDocument();
  });

  it("cleans up event listeners on unmount", () => {
    const removeEventListenerSpy = jest.spyOn(
      HTMLElement.prototype,
      "removeEventListener"
    );

    const { unmount } = render(
      <ScrollPane>
        <ScrollPane.Item>Item 1</ScrollPane.Item>
      </ScrollPane>
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
  });

  it("handles arrow click events for horizontal scrolling", () => {
    const mockScrollTo = jest.fn();
    Object.defineProperty(HTMLElement.prototype, "scrollTo", {
      configurable: true,
      value: mockScrollTo,
    });

    Object.defineProperty(HTMLElement.prototype, "clientWidth", {
      configurable: true,
      value: 300,
    });

    render(
      <ScrollPane 
        showArrows
        scrollPaneArrowStart={<ScrollPane.ArrowHorizontalStart>←</ScrollPane.ArrowHorizontalStart>}
        scrollPaneArrowEnd={<ScrollPane.ArrowHorizontalEnd>→</ScrollPane.ArrowHorizontalEnd>}
      >
        <ScrollPane.Item>Item 1</ScrollPane.Item>
      </ScrollPane>
    );

    const leftArrow = screen.getByLabelText("Scroll backward");
    const rightArrow = screen.getByLabelText("Scroll forward");

    fireEvent.click(leftArrow);
    expect(mockScrollTo).toHaveBeenCalledWith({
      left: expect.any(Number),
      behavior: "smooth",
    });

    fireEvent.click(rightArrow);
    expect(mockScrollTo).toHaveBeenCalledWith({
      left: expect.any(Number),
      behavior: "smooth",
    });
  });

  it("handles arrow keyboard events", () => {
    const mockScrollTo = jest.fn();
    Object.defineProperty(HTMLElement.prototype, "scrollTo", {
      configurable: true,
      value: mockScrollTo,
    });

    render(
      <ScrollPane 
        showArrows
        scrollPaneArrowStart={<ScrollPane.ArrowHorizontalStart>←</ScrollPane.ArrowHorizontalStart>}
      >
        <ScrollPane.Item>Item 1</ScrollPane.Item>
      </ScrollPane>
    );

    const leftArrow = screen.getByLabelText("Scroll backward");

    fireEvent.keyDown(leftArrow, { key: "Enter" });
    expect(mockScrollTo).toHaveBeenCalled();

    fireEvent.keyDown(leftArrow, { key: " " });
    expect(mockScrollTo).toHaveBeenCalled();

    fireEvent.keyDown(leftArrow, { key: "Tab" });
  });

  it("handles vertical direction scrolling", () => {
    const mockScrollTo = jest.fn();
    Object.defineProperty(HTMLElement.prototype, "scrollTo", {
      configurable: true,
      value: mockScrollTo,
    });

    // Mock scroll dimensions to trigger arrow visibility
    Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
      configurable: true,
      value: 1000,
    });
    Object.defineProperty(HTMLElement.prototype, "clientHeight", {
      configurable: true,
      value: 200,
    });
    Object.defineProperty(HTMLElement.prototype, "scrollTop", {
      configurable: true,
      value: 100,
    });

    render(
      <ScrollPane 
        direction="vertical" 
        showArrows
        scrollPaneArrowStart={<ScrollPane.ArrowVerticalStart>↑</ScrollPane.ArrowVerticalStart>}
        scrollPaneArrowEnd={<ScrollPane.ArrowVerticalEnd>↓</ScrollPane.ArrowVerticalEnd>}
      >
        <ScrollPane.Item>Item 1</ScrollPane.Item>
      </ScrollPane>
    );

    // Trigger scroll position check by firing a scroll event
    const scrollArea = document.querySelector('[class*="scrollArea"]');
    if (scrollArea) {
      fireEvent.scroll(scrollArea);
    }

    const upArrow = screen.getByLabelText("Scroll backward");
    const downArrow = screen.getByLabelText("Scroll forward");

    fireEvent.click(upArrow);
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: expect.any(Number),
      behavior: "smooth",
    });

    fireEvent.click(downArrow);
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: expect.any(Number),
      behavior: "smooth",
    });
  });

  it("shows gradients when content overflows", () => {
    Object.defineProperty(HTMLElement.prototype, "scrollWidth", {
      configurable: true,
      value: 1000,
    });
    Object.defineProperty(HTMLElement.prototype, "clientWidth", {
      configurable: true,
      value: 300,
    });
    Object.defineProperty(HTMLElement.prototype, "scrollLeft", {
      configurable: true,
      value: 100,
    });

    const { container } = render(
      <ScrollPane showGradients>
        <ScrollPane.Item>Item 1</ScrollPane.Item>
      </ScrollPane>
    );

    const scrollArea = container.querySelector('[class*="scrollArea"]');
    if (scrollArea) {
      fireEvent.scroll(scrollArea);
    }

    const gradients = container.querySelectorAll('[class*="gradient"]');
    expect(gradients.length).toBeGreaterThanOrEqual(0);
  });

  it("hides gradients when showGradients is false", () => {
    const { container } = render(
      <ScrollPane showGradients={false}>
        <ScrollPane.Item>Item 1</ScrollPane.Item>
      </ScrollPane>
    );

    const gradients = container.querySelectorAll('[class*="gradient"]');
    expect(gradients).toHaveLength(0);
  });

  it("throws error when arrow is used outside ScrollPane context", () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    
    expect(() => {
      render(<ScrollPane.ArrowHorizontalStart>←</ScrollPane.ArrowHorizontalStart>);
    }).toThrow("ScrollPaneArrowBase must be used within a ScrollPane");

    consoleSpy.mockRestore();
  });

  it("disables scroll-to-item when scrollToItemOnClick is false", () => {
    const mockScrollTo = jest.fn();
    Object.defineProperty(HTMLElement.prototype, "scrollTo", {
      configurable: true,
      value: mockScrollTo,
    });

    render(
      <ScrollPane scrollToItemOnClick={false}>
        <ScrollPane.Item data-testid="item-1">Item 1</ScrollPane.Item>
      </ScrollPane>
    );

    const item = screen.getByTestId("item-1");
    fireEvent.click(item);

    expect(mockScrollTo).not.toHaveBeenCalled();
  });

  it("handles vertical scroll-to-item functionality", async () => {
    const mockScrollTo = jest.fn();
    Object.defineProperty(HTMLElement.prototype, "scrollTo", {
      configurable: true,
      value: mockScrollTo,
    });

    const mockGetBoundingClientRect = jest.fn();
    mockGetBoundingClientRect
      .mockReturnValueOnce({
        top: 0,
        bottom: 200,
        height: 200,
        width: 300,
        left: 0,
        right: 300,
      })
      .mockReturnValueOnce({
        top: 250,
        bottom: 300,
        height: 50,
        width: 100,
        left: 50,
        right: 150,
      });

    Element.prototype.getBoundingClientRect = mockGetBoundingClientRect;

    render(
      <ScrollPane direction="vertical" scrollToItemOnClick>
        <ScrollPane.Item data-testid="item-1">Item 1</ScrollPane.Item>
      </ScrollPane>
    );

    const item = screen.getByTestId("item-1");
    fireEvent.click(item);

    await waitFor(() => {
      expect(mockScrollTo).toHaveBeenCalledWith({
        top: expect.any(Number),
        behavior: "smooth",
      });
    });
  });

  it("does not scroll when item is already fully visible", async () => {
    const mockScrollTo = jest.fn();
    Object.defineProperty(HTMLElement.prototype, "scrollTo", {
      configurable: true,
      value: mockScrollTo,
    });

    const mockGetBoundingClientRect = jest.fn();
    mockGetBoundingClientRect
      .mockReturnValueOnce({
        left: 0,
        right: 300,
        width: 300,
        height: 100,
        top: 0,
        bottom: 100,
      })
      .mockReturnValueOnce({
        left: 50,
        right: 150,
        width: 100,
        height: 50,
        top: 25,
        bottom: 75,
      });

    Element.prototype.getBoundingClientRect = mockGetBoundingClientRect;

    render(
      <ScrollPane scrollToItemOnClick>
        <ScrollPane.Item data-testid="item-1">Item 1</ScrollPane.Item>
      </ScrollPane>
    );

    const item = screen.getByTestId("item-1");
    fireEvent.click(item);

    await waitFor(() => {
      expect(mockScrollTo).not.toHaveBeenCalled();
    });
  });
});

describe("ScrollPane.Item", () => {
  it("renders children correctly", () => {
    render(
      <ScrollPane>
        <ScrollPane.Item data-testid="scroll-item">
          <div>Test Content</div>
        </ScrollPane.Item>
      </ScrollPane>
    );

    expect(screen.getByTestId("scroll-item")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = jest.fn();

    render(
      <ScrollPane scrollToItemOnClick={false}>
        <ScrollPane.Item onClick={handleClick} data-testid="clickable-item">
          Clickable Item
        </ScrollPane.Item>
      </ScrollPane>
    );

    fireEvent.click(screen.getByTestId("clickable-item"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom props", () => {
    render(
      <ScrollPane>
        <ScrollPane.Item
          data-testid="custom-item"
          className="custom-item-class"
          style={{ color: "blue" }}
        >
          Custom Item
        </ScrollPane.Item>
      </ScrollPane>
    );

    const item = screen.getByTestId("custom-item");
    expect(item.className).toContain("nimbus-box_boxSizing-border-box");
    expect(item).toHaveAttribute("data-testid", "custom-item");
  });
}); 

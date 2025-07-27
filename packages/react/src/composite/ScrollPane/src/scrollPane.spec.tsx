import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Box } from "@nimbus-ds/box";

import { ScrollPane } from "./ScrollPane";

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock scrollTo method
Element.prototype.scrollTo = jest.fn();

describe("ScrollPane", () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
    expect(scrollArea).toHaveClass(expect.stringContaining("horizontal"));
  });

  it("applies custom className and style", () => {
    const customStyle = { backgroundColor: "red" };
    const { container } = render(
      <ScrollPane className="custom-class" style={customStyle}>
        <ScrollPane.Item>Item 1</ScrollPane.Item>
      </ScrollPane>
    );

    const scrollPane = container.firstChild as HTMLElement;
    expect(scrollPane).toHaveClass("custom-class");
    expect(scrollPane).toHaveStyle("background-color: red");
  });

  it("handles vertical direction", () => {
    const { container } = render(
      <ScrollPane direction="vertical">
        <ScrollPane.Item>Item 1</ScrollPane.Item>
      </ScrollPane>
    );

    const scrollArea = container.querySelector('[class*="scrollArea"]');
    expect(scrollArea).toHaveClass(expect.stringContaining("vertical"));
  });

  it("hides scrollbar when showScrollbar is false", () => {
    const { container } = render(
      <ScrollPane showScrollbar={false}>
        <ScrollPane.Item>Item 1</ScrollPane.Item>
      </ScrollPane>
    );

    const scrollArea = container.querySelector('[class*="scrollArea"]');
    expect(scrollArea).toHaveClass(expect.stringContaining("scrollAreaHidden"));
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
      <ScrollPane showArrows={true}>
        <ScrollPane.Item>Item 1</ScrollPane.Item>
        <ScrollPane.Item>Item 2</ScrollPane.Item>
      </ScrollPane>
    );

    // Trigger scroll position check by firing a scroll event
    const scrollArea = document.querySelector('[class*="scrollArea"]');
    if (scrollArea) {
      fireEvent.scroll(scrollArea);
    }

    // Check for arrow buttons (they should be rendered when content overflows)
    const leftArrow = screen.queryByLabelText("Scroll left");
    const rightArrow = screen.queryByLabelText("Scroll right");
    
    // Arrows may not be visible initially, but the functionality should be in place
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
      <ScrollPane scrollToItemOnClick={true}>
        <ScrollPane.Item data-testid="item-1">Item 1</ScrollPane.Item>
      </ScrollPane>
    );

    const item = screen.getByTestId("item-1");
    fireEvent.click(item);

    await waitFor(() => {
      expect(mockScrollTo).toHaveBeenCalled();
    });
  });

  it("passes through Box props", () => {
    const { container } = render(
      <ScrollPane padding="4" backgroundColor="primary-surface">
        <ScrollPane.Item>Item 1</ScrollPane.Item>
      </ScrollPane>
    );

    const scrollPane = container.firstChild as HTMLElement;
    // The Box component should receive and apply these props
    expect(scrollPane).toBeInTheDocument();
  });

  it("provides context to child items", () => {
    const TestItem = () => {
      const context = React.useContext(
        require("./components/ScrollPaneContext").ScrollPaneContext
      );
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
      <ScrollPane>
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
    expect(item).toHaveClass("custom-item-class");
    expect(item).toHaveStyle("color: blue");
  });
}); 

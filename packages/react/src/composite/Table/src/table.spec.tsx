import React from "react";
import { render, screen, act } from "@testing-library/react";

import { Table } from "./Table";
import type { TableProps } from "./table.types";

const makeSut = (rest: TableProps) => {
  render(<Table {...rest} data-testid="table-element" />);
};

describe("GIVEN <Table />", () => {
  describe("WHEN rendered", () => {
    it("THEN should correctly render the submitted content", () => {
      makeSut({
        children: (
          <tbody>
            <tr>
              <td>My content</td>
            </tr>
          </tbody>
        ),
      });
      expect(screen.getByText("My content")).toBeDefined();
    });
  });

  describe("WHEN columnLayout is provided", () => {
    it("THEN should render a colgroup with calculated widths", () => {
      render(
        <Table
          data-testid="table-element"
          columnLayout={[
            { id: "column-1", width: "120px" },
            { id: "column-2", grow: 2 },
            { id: "column-3", grow: 1 },
          ]}
        >
          <tbody>
            <tr>
              <td>One</td>
              <td>Two</td>
              <td>Three</td>
            </tr>
          </tbody>
        </Table>
      );

      const columns = screen
        .getByTestId("table-element")
        .querySelectorAll("col");

      expect(columns).toHaveLength(3);
      expect(columns[0]).toHaveStyle({ width: "120px" });
    });

    it("THEN should apply minWidth to cells via column prop", () => {
      render(
        <Table
          data-testid="table-element"
          columnLayout={[
            { id: "column-1", width: "100px" },
            { id: "column-2", grow: 1, minWidth: "200px" },
            { id: "column-3", grow: 1 },
          ]}
        >
          <Table.Head>
            <Table.Row>
              <Table.Cell as="th" column={0} data-testid="header-0">
                Header 1
              </Table.Cell>
              <Table.Cell as="th" column={1} data-testid="header-1">
                Header 2
              </Table.Cell>
              <Table.Cell as="th" column={2} data-testid="header-2">
                Header 3
              </Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell column={0} data-testid="cell-0">
                Cell 1
              </Table.Cell>
              <Table.Cell column={1} data-testid="cell-1">
                Cell 2
              </Table.Cell>
              <Table.Cell column={2} data-testid="cell-2">
                Cell 3
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );

      expect(screen.getByTestId("header-1")).toHaveStyle({ minWidth: "200px" });
      expect(screen.getByTestId("cell-1")).toHaveStyle({ minWidth: "200px" });
    });
  });

  describe("WHEN minWidth and maxWidth are provided", () => {
    it("THEN should apply minWidth to the table element", () => {
      makeSut({
        minWidth: "800px",
        children: (
          <tbody>
            <tr>
              <td>My content</td>
            </tr>
          </tbody>
        ),
      });
      expect(screen.getByTestId("table-element")).toHaveStyle({
        minWidth: "800px",
      });
    });

    it("THEN should apply maxWidth to the table element", () => {
      makeSut({
        maxWidth: "1200px",
        children: (
          <tbody>
            <tr>
              <td>My content</td>
            </tr>
          </tbody>
        ),
      });
      expect(screen.getByTestId("table-element")).toHaveStyle({
        maxWidth: "1200px",
      });
    });

    it("THEN should apply both minWidth and maxWidth to the table element", () => {
      makeSut({
        minWidth: "600px",
        maxWidth: "1000px",
        children: (
          <tbody>
            <tr>
              <td>My content</td>
            </tr>
          </tbody>
        ),
      });
      const tableElement = screen.getByTestId("table-element");
      expect(tableElement).toHaveStyle({ minWidth: "600px" });
      expect(tableElement).toHaveStyle({ maxWidth: "1000px" });
    });
  });

  describe("WHEN fixed columns are provided", () => {
    it("THEN should apply sticky positioning with left offset to left-fixed cells", () => {
      render(
        <Table
          data-testid="table-element"
          columnLayout={[
            { id: "column-1", width: "100px", fixed: "left" },
            { id: "column-2", width: "150px", fixed: "left" },
            { id: "column-3", grow: 1 },
          ]}
        >
          <Table.Head>
            <Table.Row>
              <Table.Cell as="th" column={0} data-testid="header-0">
                Fixed Header 1
              </Table.Cell>
              <Table.Cell as="th" column={1} data-testid="header-1">
                Fixed Header 2
              </Table.Cell>
              <Table.Cell as="th" column={2} data-testid="header-2">
                Header 3
              </Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell column={0} data-testid="cell-0">
                Fixed Cell 1
              </Table.Cell>
              <Table.Cell column={1} data-testid="cell-1">
                Fixed Cell 2
              </Table.Cell>
              <Table.Cell column={2} data-testid="cell-2">
                Cell 3
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );

      // First fixed column should have left: 0px
      expect(screen.getByTestId("header-0")).toHaveStyle({ left: "0px" });
      expect(screen.getByTestId("cell-0")).toHaveStyle({ left: "0px" });

      // Second fixed column should have left: 100px (cumulative from first column)
      expect(screen.getByTestId("header-1")).toHaveStyle({ left: "100px" });
      expect(screen.getByTestId("cell-1")).toHaveStyle({ left: "100px" });

      // Non-fixed column should not have left style
      expect(screen.getByTestId("header-2")).not.toHaveStyle({ left: "0px" });
      expect(screen.getByTestId("cell-2")).not.toHaveStyle({ left: "0px" });
    });

    it("THEN should apply sticky positioning with right offset to right-fixed cells", () => {
      render(
        <Table
          data-testid="table-element"
          columnLayout={[
            { id: "column-1", grow: 1 },
            { id: "column-2", width: "150px", fixed: "right" },
            { id: "column-3", width: "100px", fixed: "right" },
          ]}
        >
          <Table.Head>
            <Table.Row>
              <Table.Cell as="th" column={0} data-testid="header-0">
                Header 1
              </Table.Cell>
              <Table.Cell as="th" column={1} data-testid="header-1">
                Fixed Header 2
              </Table.Cell>
              <Table.Cell as="th" column={2} data-testid="header-2">
                Fixed Header 3
              </Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell column={0} data-testid="cell-0">
                Cell 1
              </Table.Cell>
              <Table.Cell column={1} data-testid="cell-1">
                Fixed Cell 2
              </Table.Cell>
              <Table.Cell column={2} data-testid="cell-2">
                Fixed Cell 3
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );

      // Last fixed column should have right: 0px
      expect(screen.getByTestId("header-2")).toHaveStyle({ right: "0px" });
      expect(screen.getByTestId("cell-2")).toHaveStyle({ right: "0px" });

      // Second-to-last fixed column should have right: 100px (cumulative from last column)
      expect(screen.getByTestId("header-1")).toHaveStyle({ right: "100px" });
      expect(screen.getByTestId("cell-1")).toHaveStyle({ right: "100px" });

      // Non-fixed column should not have right style
      expect(screen.getByTestId("header-0")).not.toHaveStyle({ right: "0px" });
      expect(screen.getByTestId("cell-0")).not.toHaveStyle({ right: "0px" });
    });

    it("THEN should support both left and right fixed columns simultaneously", () => {
      render(
        <Table
          data-testid="table-element"
          columnLayout={[
            { id: "column-1", width: "100px", fixed: "left" },
            { id: "column-2", grow: 1 },
            { id: "column-3", width: "120px", fixed: "right" },
          ]}
        >
          <Table.Head>
            <Table.Row>
              <Table.Cell as="th" column={0} data-testid="header-0">
                Left Fixed
              </Table.Cell>
              <Table.Cell as="th" column={1} data-testid="header-1">
                Normal
              </Table.Cell>
              <Table.Cell as="th" column={2} data-testid="header-2">
                Right Fixed
              </Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell column={0} data-testid="cell-0">
                Left Cell
              </Table.Cell>
              <Table.Cell column={1} data-testid="cell-1">
                Normal Cell
              </Table.Cell>
              <Table.Cell column={2} data-testid="cell-2">
                Right Cell
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );

      // Left-fixed column should have left: 0px
      expect(screen.getByTestId("header-0")).toHaveStyle({ left: "0px" });
      expect(screen.getByTestId("cell-0")).toHaveStyle({ left: "0px" });

      // Right-fixed column should have right: 0px
      expect(screen.getByTestId("header-2")).toHaveStyle({ right: "0px" });
      expect(screen.getByTestId("cell-2")).toHaveStyle({ right: "0px" });

      // Non-fixed column should not have either positioning
      expect(screen.getByTestId("header-1")).not.toHaveStyle({ left: "0px" });
      expect(screen.getByTestId("header-1")).not.toHaveStyle({ right: "0px" });
    });

    it("THEN should not apply fixed styles when fixed is undefined", () => {
      render(
        <Table
          data-testid="table-element"
          columnLayout={[
            { id: "column-1", width: "100px" },
            { id: "column-2", width: "150px" },
            { id: "column-3", grow: 1 },
          ]}
        >
          <Table.Head>
            <Table.Row>
              <Table.Cell as="th" column={0} data-testid="header-0">
                Header 1
              </Table.Cell>
              <Table.Cell as="th" column={1} data-testid="header-1">
                Header 2
              </Table.Cell>
              <Table.Cell as="th" column={2} data-testid="header-2">
                Header 3
              </Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell column={0} data-testid="cell-0">
                Cell 1
              </Table.Cell>
              <Table.Cell column={1} data-testid="cell-1">
                Cell 2
              </Table.Cell>
              <Table.Cell column={2} data-testid="cell-2">
                Cell 3
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );

      // None of the cells should have left or right positioning
      expect(screen.getByTestId("header-0")).not.toHaveStyle({ left: "0px" });
      expect(screen.getByTestId("header-1")).not.toHaveStyle({ left: "0px" });
      expect(screen.getByTestId("cell-0")).not.toHaveStyle({ left: "0px" });
      expect(screen.getByTestId("cell-1")).not.toHaveStyle({ left: "0px" });
    });
  });

  describe("WHEN scroll position changes with fixed columns", () => {
    beforeEach(() => {
      global.ResizeObserver = jest.fn(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      }));
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("THEN scroll indicators should only appear after user scrolls", () => {
      const { container } = render(
        <Table
          data-testid="table-element"
          columnLayout={[
            { id: "column-1", width: "100px", fixed: "left" },
            { id: "column-2", grow: 1 },
            { id: "column-3", width: "100px", fixed: "right" },
          ]}
        >
          <Table.Body>
            <Table.Row>
              <Table.Cell column={0}>Left</Table.Cell>
              <Table.Cell column={1}>Middle</Table.Cell>
              <Table.Cell column={2}>Right</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );

      const wrapper = container.querySelector(
        '[class*="container__wrapper"]'
      ) as HTMLElement;

      expect(wrapper).not.toHaveAttribute("data-scroll-left");
      expect(wrapper).not.toHaveAttribute("data-scroll-right");

      Object.defineProperties(wrapper, {
        scrollLeft: { value: 50, configurable: true },
        scrollWidth: { value: 500, configurable: true },
        clientWidth: { value: 300, configurable: true },
      });
      act(() => {
        wrapper.dispatchEvent(new Event("scroll"));
      });

      expect(wrapper).toHaveAttribute("data-scroll-left", "true");
      expect(wrapper).toHaveAttribute("data-scroll-right", "true");
    });

    it("THEN scroll indicators should reflect edge positions correctly", () => {
      const { container } = render(
        <Table
          data-testid="table-element"
          columnLayout={[
            { id: "column-1", width: "100px", fixed: "left" },
            { id: "column-2", grow: 1 },
          ]}
        >
          <Table.Body>
            <Table.Row>
              <Table.Cell column={0}>Left</Table.Cell>
              <Table.Cell column={1}>Content</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );

      const wrapper = container.querySelector(
        '[class*="container__wrapper"]'
      ) as HTMLElement;

      Object.defineProperties(wrapper, {
        scrollLeft: { value: 0, configurable: true },
        scrollWidth: { value: 500, configurable: true },
        clientWidth: { value: 300, configurable: true },
      });
      act(() => {
        wrapper.dispatchEvent(new Event("scroll"));
      });

      expect(wrapper).not.toHaveAttribute("data-scroll-left");
      expect(wrapper).toHaveAttribute("data-scroll-right", "true");

      Object.defineProperty(wrapper, "scrollLeft", {
        value: 200,
        configurable: true,
      });
      act(() => {
        wrapper.dispatchEvent(new Event("scroll"));
      });

      expect(wrapper).toHaveAttribute("data-scroll-left", "true");
      expect(wrapper).not.toHaveAttribute("data-scroll-right");
    });
  });

  describe("WHEN stickyScrollbar is enabled", () => {
    type ResizeObserverCb = (
      entries: ResizeObserverEntry[],
      observer: ResizeObserver
    ) => void;

    let originalRAF: typeof requestAnimationFrame;
    let mockResizeObserver: jest.Mock;
    let resizeCallback: ResizeObserverCb;

    beforeEach(() => {
      originalRAF = global.requestAnimationFrame;
      global.requestAnimationFrame = (cb: (time: number) => void) => {
        cb(0);
        return 0;
      };

      mockResizeObserver = jest.fn((callback: ResizeObserverCb) => {
        resizeCallback = callback;
        return {
          observe: jest.fn(),
          unobserve: jest.fn(),
          disconnect: jest.fn(),
        };
      });
      global.ResizeObserver = mockResizeObserver;
    });

    afterEach(() => {
      global.requestAnimationFrame = originalRAF;
      jest.restoreAllMocks();
    });

    it("THEN should apply hidden scrollbar class to wrapper", () => {
      const { container } = render(
        <Table stickyScrollbar data-testid="table-element">
          <tbody>
            <tr>
              <td>Content</td>
            </tr>
          </tbody>
        </Table>
      );

      const wrapper = container.querySelector(
        '[class*="container__wrapper"]'
      ) as HTMLElement;
      expect(wrapper.className).toContain(
        "container__wrapper_hidden_scrollbar"
      );
    });

    it("THEN should not apply hidden scrollbar class when disabled", () => {
      const { container } = render(
        <Table stickyScrollbar={false} data-testid="table-element">
          <tbody>
            <tr>
              <td>Content</td>
            </tr>
          </tbody>
        </Table>
      );

      const wrapper = container.querySelector(
        '[class*="container__wrapper"]'
      ) as HTMLElement;
      expect(wrapper.className).not.toContain(
        "container__wrapper_hidden_scrollbar"
      );
    });

    it("THEN should sync scroll position from wrapper to track", () => {
      const { container } = render(
        <Table stickyScrollbar data-testid="table-element">
          <tbody>
            <tr>
              <td>Content</td>
            </tr>
          </tbody>
        </Table>
      );

      const wrapper = container.querySelector(
        '[class*="container__wrapper"]'
      ) as HTMLElement;
      const track = container.querySelector(
        '[class*="sticky_scrollbar_track"]'
      ) as HTMLElement;

      Object.defineProperty(wrapper, "scrollLeft", {
        value: 150,
        writable: true,
      });
      wrapper.dispatchEvent(new Event("scroll"));

      expect(track.scrollLeft).toBe(150);
    });

    it("THEN should sync scroll position from track to wrapper", () => {
      const { container } = render(
        <Table stickyScrollbar data-testid="table-element">
          <tbody>
            <tr>
              <td>Content</td>
            </tr>
          </tbody>
        </Table>
      );

      const wrapper = container.querySelector(
        '[class*="container__wrapper"]'
      ) as HTMLElement;
      const track = container.querySelector(
        '[class*="sticky_scrollbar_track"]'
      ) as HTMLElement;

      Object.defineProperty(track, "scrollLeft", {
        value: 200,
        writable: true,
      });
      track.dispatchEvent(new Event("scroll"));

      expect(wrapper.scrollLeft).toBe(200);
    });

    it("THEN should set scrollbar inner width to match wrapper scroll width", () => {
      const { container } = render(
        <Table stickyScrollbar data-testid="table-element">
          <tbody>
            <tr>
              <td>Content</td>
            </tr>
          </tbody>
        </Table>
      );

      const wrapper = container.querySelector(
        '[class*="container__wrapper"]'
      ) as HTMLElement;
      const inner = container.querySelector(
        '[class*="sticky_scrollbar_inner"]'
      ) as HTMLElement;

      Object.defineProperty(wrapper, "scrollWidth", { value: 1500 });
      resizeCallback([], {} as ResizeObserver);

      expect(inner.style.width).toBe("1500px");
    });

    it("THEN should remove scroll event listeners on unmount", () => {
      const removeEventListenerSpy = jest.spyOn(
        HTMLElement.prototype,
        "removeEventListener"
      );

      const { unmount } = render(
        <Table stickyScrollbar data-testid="table-element">
          <tbody>
            <tr>
              <td>Content</td>
            </tr>
          </tbody>
        </Table>
      );

      unmount();

      const scrollEventsCleaned = removeEventListenerSpy.mock.calls.filter(
        (call) => call[0] === "scroll"
      ).length;

      expect(scrollEventsCleaned).toBeGreaterThanOrEqual(2);
    });
  });
});

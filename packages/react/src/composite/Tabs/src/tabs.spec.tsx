import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { Tabs } from "./Tabs";
import { TabsProps, ControlledTabsProperties } from "./tabs.types";

const tabContent = "myTabsContent";

const tabsChildren = [
  <Tabs.Item key="myTabsChildren" label="myTabsChildren">
    {tabContent}
  </Tabs.Item>,
  <Tabs.Item key="myTabsChildren2" label="myTabsChildren2">
    {tabContent}
  </Tabs.Item>,
];

const makeSut = (
  rest?: Omit<TabsProps, "children">,
  children = tabsChildren
) => {
  render(
    <Tabs {...rest} data-testid="tabs-element">
      {children}
    </Tabs>
  );
};

describe("GIVEN <Tabs />", () => {
  it("THEN should correctly render the first tab as active by default", () => {
    makeSut();
    expect(screen.getAllByRole("tab")[0].getAttribute("class")).toContain(
      "active"
    );
  });

  it("THEN should correctly render the children", () => {
    makeSut();
    expect(screen.getAllByRole("tab")).toBeTruthy();
  });

  it("THEN should correctly render the fullWidth property", () => {
    makeSut({ fullWidth: true });
    expect(
      screen.getAllByRole("presentation")[0].getAttribute("class")
    ).toContain("fullWidth");
  });

  it("THEN should correctly render the preselected tab as active", () => {
    makeSut({ preSelectedTab: 1 });
    expect(
      screen.getByRole("tab", { selected: true }).getAttribute("class")
    ).toContain("active");
  });

  describe("controlled mode", () => {
    const mockOnTabSelect = jest.fn();

    beforeEach(() => {
      mockOnTabSelect.mockClear();
    });

    const renderControlled = (props: Partial<Omit<ControlledTabsProperties, "children">>) => {
      return render(
        <Tabs selected={0} onTabSelect={mockOnTabSelect} {...props}>
          <Tabs.Item label="Tab 1">Content 1</Tabs.Item>
          <Tabs.Item label="Tab 2">Content 2</Tabs.Item>
          <Tabs.Item label="Tab 3">Content 3</Tabs.Item>
        </Tabs>
      );
    };

    it("should render with selected tab", () => {
      renderControlled({ selected: 1 });

      expect(screen.getByText("Content 2")).toBeTruthy();
      expect(screen.queryByText("Content 1")).toBeNull();
      expect(screen.queryByText("Content 3")).toBeNull();
    });

    it("should call onTabSelect when clicking a tab", () => {
      renderControlled({ selected: 0 });

      fireEvent.click(screen.getByText("Tab 2"));
      expect(mockOnTabSelect).toHaveBeenCalledWith(1);
    });

    it("should ignore preSelectedTab in controlled mode", () => {
      renderControlled({ selected: 1 });

      expect(screen.getByText("Content 2")).toBeTruthy();
      expect(screen.queryByText("Content 1")).toBeNull();
    });

    it("should update content when selected prop changes", () => {
      const { rerender } = renderControlled({ selected: 0 });

      expect(screen.getByText("Content 1")).toBeTruthy();

      rerender(
        <Tabs selected={1} onTabSelect={mockOnTabSelect}>
          <Tabs.Item label="Tab 1">Content 1</Tabs.Item>
          <Tabs.Item label="Tab 2">Content 2</Tabs.Item>
          <Tabs.Item label="Tab 3">Content 3</Tabs.Item>
        </Tabs>
      );

      expect(screen.getByText("Content 2")).toBeTruthy();
      expect(screen.queryByText("Content 1")).toBeNull();
    });
  });
});

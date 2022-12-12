import React from "react";
import { render, screen } from "@testing-library/react";

import { Tabs } from "./Tabs";
import { TabsProps } from "./tabs.types";

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
});

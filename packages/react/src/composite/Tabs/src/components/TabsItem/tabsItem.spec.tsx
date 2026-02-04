import React from "react";
import { render, screen } from "@testing-library/react";

import { TabsItem } from "./TabsItem";
import { type TabsItemProps } from "./tabsItem.types";

import { generateID } from "../../tabs.definitions";

const itemLabel = generateID("myItemLabel");
const itemChildren = "myItemChildren";

const makeSut = (
  rest?: Omit<TabsItemProps, "label" | "childre">,
  label = itemLabel,
  children = itemChildren
) => {
  render(
    <TabsItem {...rest} label={label} data-testid="item-element">
      {children}
    </TabsItem>
  );
};

describe("GIVEN <Item />", () => {
  it("THEN should correctly render the children", () => {
    makeSut();
    expect(screen.getByRole("tabpanel").textContent).toContain(itemChildren);
  });

  it("THEN should correctly render the label", () => {
    makeSut();
    expect(screen.getByRole("tabpanel").getAttribute("id")).toContain(
      `panel-${itemLabel}`
    );
  });
});

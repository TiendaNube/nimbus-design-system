import React from "react";
import { render, screen } from "@testing-library/react";

import { Item } from "./Item";
import { ItemProps } from "./item.types";

import { generateID } from "../../tabs.definitions";

const itemLabel = generateID("myItemLabel");
const itemChildren = "myItemChildren";

const makeSut = (
  rest?: Omit<ItemProps, "label" | "childre">,
  label = itemLabel,
  children = itemChildren
) => {
  render(
    <Item {...rest} label={label} data-testid="item-element">
      {children}
    </Item>
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

import React from "react";
import { render, screen } from "@testing-library/react";

import { List } from "./List";
import { type ListProps } from "./list.types";

const content = "myText";

const makeSut = (rest?: Omit<ListProps, "children">, children = content) => {
  render(
    <List {...rest} data-testid="list-element">
      {children}
    </List>
  );
};

describe("GIVEN <List />", () => {
  describe("WHEN rendered", () => {
    it("THEN it should correctly render as an unordered list", () => {
      makeSut();
      expect(screen.getByTestId("list-element").nodeName).toEqual("UL");
    });

    it("THEN it should correctly render as an ordered list", () => {
      makeSut({ as: "ol" });
      expect(screen.getByTestId("list-element").nodeName).toEqual("OL");
    });
  });
});

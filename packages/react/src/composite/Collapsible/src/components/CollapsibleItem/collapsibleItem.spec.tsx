import React from "react";
import { render, screen } from "@testing-library/react";

import { CollapsibleItem } from "./CollapsibleItem";
import { CollapsibleItemProps } from "./collapsibleItem.types";

const makeSut = (props: CollapsibleItemProps) => {
  render(<CollapsibleItem {...props} data-testid="element" />);
};

describe("GIVEN <Collapsible.item />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render the submitted content", () => {
      makeSut({ children: "My content" });
      expect(screen.getByText("My content")).toBeDefined();
    });
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";

import { Label } from "./Label";
import { LabelProps } from "./label.types";

const content = "myText";

const makeSut = (rest?: Omit<LabelProps, "children">, children = content) => {
  render(
    <Label {...rest} data-testid="label-element">
      {children}
    </Label>
  );
};

describe("GIVEN <Label />", () => {
  it("THEN it should correctly remain visually hidden", () => {
    makeSut({ hidden: true });
    expect(screen.getByTestId("label-element").getAttribute("class")).toContain(
      "hidden_true"
    );
  });
});

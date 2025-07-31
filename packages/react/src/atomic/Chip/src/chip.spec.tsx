import React from "react";
import { render, screen } from "@testing-library/react";

import { Chip } from "./Chip";
import { ChipProps } from "./chip.types";

const makeSut = (rest: ChipProps) => {
  render(<Chip {...rest} data-testid="chip-element" />);
};

describe("GIVEN <Chip />", () => {
  it("THEN it should correctly display the sent icon", () => {
    makeSut({ text: "chip", icon: <svg data-testid="icon" /> });
    expect(screen.getByTestId("icon")).toBeDefined();
  });

  it("THEN it should correctly display the sent text", () => {
    makeSut({ text: "text_chip", icon: <svg data-testid="icon" /> });
    expect(screen.getByText("text_chip")).toBeDefined();
  });

  it("THEN it should correctly display the close icon", () => {
    makeSut({
      text: "text_chip",
      icon: <svg data-testid="icon" />,
      removable: true,
    });
    expect(screen.getByTestId("close-chip")).toBeDefined();
  });
});

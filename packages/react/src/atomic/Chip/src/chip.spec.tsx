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

  it("THEN it should correctly render the neutral appearance by default", () => {
    makeSut({ text: "chip" });
    expect(screen.getByTestId("chip-element").getAttribute("class")).toContain(
      "appearance_neutral"
    );
  });

  it("THEN it should correctly render the ai-gradient appearance", () => {
    makeSut({ text: "chip", appearance: "ai-gradient" });
    expect(screen.getByTestId("chip-element").getAttribute("class")).toContain(
      "appearance_ai-gradient"
    );
  });
});

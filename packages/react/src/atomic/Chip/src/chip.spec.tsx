import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Chip } from "./Chip";
import { type ChipProps } from "./chip.types";

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

  it("should correctly call the onClick function when the close icon is clicked", async () => {
    const onClick = jest.fn();

    makeSut({
      text: "text_chip",
      icon: <svg data-testid="icon" />,
      removable: true,
      onClick,
    });

    await userEvent.click(screen.getByTestId("dismiss-chip-button"));
    expect(onClick).toHaveBeenCalled();
  });

  it("THEN it should correctly display the close icon", () => {
    makeSut({
      text: "text_chip",
      icon: <svg data-testid="icon" />,
      removable: true,
    });
    expect(screen.getByTestId("close-chip")).toBeDefined();
  });

  it("THEN it should apply AI generative appearance when aiGenerated is true", () => {
    makeSut({ text: "ai_chip", aiGenerated: true });
    const className = screen
      .getByTestId("chip-element")
      .getAttribute("class") as string;
    expect(className).toContain("appearance_ai-generative");
  });

  it("THEN the remove button is named Dismiss chip by default", () => {
    makeSut({ text: "text_chip", removable: true });
    expect(screen.getByRole("button", { name: "Dismiss chip" })).toBeDefined();
  });

  it("THEN the remove button uses the removeLabel it receives", () => {
    makeSut({
      text: "text_chip",
      removable: true,
      removeLabel: "Quitar text_chip"
    });
    expect(
      screen.getByRole("button", { name: "Quitar text_chip" })
    ).toBeDefined();
    expect(screen.queryByRole("button", { name: "Dismiss chip" })).toBeNull();
  });
});

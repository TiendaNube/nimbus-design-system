import React from "react";
import { render, screen } from "@testing-library/react";

import { Select, type SelectProps } from "./Select";

const selectName = "myName";
const selectId = "myId";
const selectChildren = <option>myText</option>;

const makeSut = (
  rest?: Omit<SelectProps, "children" | "id" | "name">,
  children = selectChildren,
  id = selectId,
  name = selectName
) => {
  render(
    <Select {...rest} id={id} name={name} data-testid="select-element">
      {children}
    </Select>
  );
};

describe("GIVEN <Select />", () => {
  describe("WHEN rendered", () => {
    it("THEN should correctly render the appearance base", () => {
      makeSut();
      expect(
        screen.getByTestId("select-element").getAttribute("class")
      ).toContain("appearance_neutral");
    });

    it("THEN should correctly render the appearance neutral", () => {
      makeSut({ appearance: "neutral" });
      expect(
        screen.getByTestId("select-element").getAttribute("class")
      ).toContain("appearance_neutral");
    });

    it("THEN should correctly render the appearance success", () => {
      makeSut({ appearance: "success" });
      expect(
        screen.getByTestId("select-element").getAttribute("class")
      ).toContain("appearance_success");
    });

    it("THEN should correctly render the appearance warning", () => {
      makeSut({ appearance: "warning" });
      expect(
        screen.getByTestId("select-element").getAttribute("class")
      ).toContain("appearance_warning");
    });

    it("THEN should correctly render the appearance danger", () => {
      makeSut({ appearance: "danger" });
      expect(
        screen.getByTestId("select-element").getAttribute("class")
      ).toContain("appearance_danger");
    });

    it("THEN should correctly render the appearance ai-generative", () => {
      makeSut({ appearance: "ai-generative" });
      expect(
        screen.getByTestId("select-element").getAttribute("class")
      ).toContain("appearance_ai-generative");
    });

    it("THEN should correctly render aiGenerated as true", () => {
      makeSut({ aiGenerated: true });
      expect(
        screen.getByTestId("select-element").getAttribute("class")
      ).toContain("aiGenerated");
    });

    it("THEN should render aiGenerated style when aiGenerated is true, ignoring appearance", () => {
      makeSut({ aiGenerated: true, appearance: "danger" });
      expect(
        screen.getByTestId("select-element").getAttribute("class")
      ).toContain("aiGenerated");
      expect(
        screen.getByTestId("select-element").getAttribute("class")
      ).not.toContain("appearance_danger");
    });

    it("THEN should render the name", () => {
      makeSut();
      expect(screen.getByRole<HTMLSelectElement>("combobox").name).toContain(
        selectName
      );
    });

    it("THEN should render the id", () => {
      makeSut();
      expect(screen.getByRole<HTMLSelectElement>("combobox").id).toContain(
        selectId
      );
    });

    it("THEN should render the children", () => {
      makeSut();
      expect(screen.getByRole<HTMLOptionElement>("option")).toBeTruthy();
    });
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";

import { Select, SelectProps } from "./Select";

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
        screen.getByRole<HTMLSelectElement>("combobox").getAttribute("class")
      ).toContain("appearance_neutral");
    });

    it("THEN should correctly render the appearance neutral", () => {
      makeSut({ appearance: "neutral" });
      expect(
        screen.getByRole<HTMLSelectElement>("combobox").getAttribute("class")
      ).toContain("appearance_neutral");
    });

    it("THEN should correctly render the appearance success", () => {
      makeSut({ appearance: "success" });
      expect(
        screen.getByRole<HTMLSelectElement>("combobox").getAttribute("class")
      ).toContain("appearance_success");
    });

    it("THEN should correctly render the appearance warning", () => {
      makeSut({ appearance: "warning" });
      expect(
        screen.getByRole<HTMLSelectElement>("combobox").getAttribute("class")
      ).toContain("appearance_warning");
    });

    it("THEN should correctly render the appearance danger", () => {
      makeSut({ appearance: "danger" });
      expect(
        screen.getByRole<HTMLSelectElement>("combobox").getAttribute("class")
      ).toContain("appearance_danger");
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

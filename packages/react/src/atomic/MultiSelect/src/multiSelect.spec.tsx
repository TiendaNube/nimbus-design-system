import React from "react";
import { render, screen } from "@testing-library/react";

import { MultiSelect, MultiSelectProps } from "./MultiSelect";

const selectName = "myName";
const selectId = "myId";

const makeSut = (
  rest?: Omit<MultiSelectProps, "options" | "id" | "name">,
  id = selectId,
  name = selectName,
  options = []
) => {
  render(
    <MultiSelect
      {...rest}
      id={id}
      name={name}
      data-testid="multi-select-element"
      options={options}
    />
  );
};

describe("GIVEN <Select />", () => {
  describe("WHEN rendered", () => {
    it("THEN should correctly render the appearance base", () => {
      makeSut();
      expect(
        screen
          .getByTestId<HTMLSelectElement>("multi-select-element")
          .getAttribute("class")
      ).toContain("appearance_neutral");
    });

    it("THEN should correctly render the appearance neutral", () => {
      makeSut({ appearance: "neutral" });
      expect(
        screen
          .getByTestId<HTMLSelectElement>("multi-select-element")
          .getAttribute("class")
      ).toContain("appearance_neutral");
    });

    it("THEN should correctly render the appearance success", () => {
      makeSut({ appearance: "success" });
      expect(
        screen
          .getByTestId<HTMLSelectElement>("multi-select-element")
          .getAttribute("class")
      ).toContain("appearance_success");
    });

    it("THEN should correctly render the appearance warning", () => {
      makeSut({ appearance: "warning" });
      expect(
        screen
          .getByTestId<HTMLSelectElement>("multi-select-element")
          .getAttribute("class")
      ).toContain("appearance_warning");
    });

    it("THEN should correctly render the appearance danger", () => {
      makeSut({ appearance: "danger" });
      expect(
        screen
          .getByTestId<HTMLSelectElement>("multi-select-element")
          .getAttribute("class")
      ).toContain("appearance_danger");
    });

    it("THEN should render the id", () => {
      makeSut();
      expect(
        screen.getByTestId<HTMLSelectElement>("multi-select-element").id
      ).toContain(selectId);
    });
  });
});

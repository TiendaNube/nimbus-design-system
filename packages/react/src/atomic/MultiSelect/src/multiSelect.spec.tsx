import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { MultiSelect, MultiSelectProps } from "./MultiSelect";

const selectName = "myName";
const selectId = "myId";
const mockedOptions = [
  {
    label: "Option 1",
    value: "option-1",
  },
  {
    label: "Option 2",
    value: "option-2",
  },
  {
    label: "Option 3",
    value: "option-3",
  },
];
const mockedValues = [
  {
    label: "Option 1",
    value: "option-1",
  },
];

const makeSut = (
  rest?: Partial<Omit<MultiSelectProps, "id" | "name">>,
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
      options={rest?.options || options}
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

    it("THEN should correctly send the selected options in the onChange prop", () => {
      const mockedOnChange = jest.fn();
      makeSut({
        onChange: mockedOnChange,
        options: mockedOptions,
        placeholder: "Placeholder",
      });
      fireEvent.click(screen.getByTestId("multi-select-element"));
      fireEvent.click(screen.getByText(mockedOptions[0].label));
      expect(mockedOnChange).toBeCalledWith([mockedOptions[0]]);
      fireEvent.click(
        screen.getByTestId(`option-selected-${mockedOptions[0].value}`)
      );
      expect(mockedOnChange).toBeCalledWith([]);
    });

    it("THEN should correctly render items when value is changed", () => {
      makeSut({
        value: mockedValues,
        options: mockedOptions,
      });
      expect(
        screen.getByTestId<HTMLSelectElement>(
          `option-selected-${mockedValues[0].value}`
        )
      ).toBeDefined();
    });
  });
});

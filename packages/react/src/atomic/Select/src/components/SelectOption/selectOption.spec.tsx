import React from "react";
import { render, screen } from "@testing-library/react";

import { SelectOption } from "./SelectOption";
import { type SelectOptionProps } from "./selectOption.types";

const makeSut = (rest: SelectOptionProps) => {
  render(<SelectOption {...rest} data-testid="option-element" />);
};

const optLabel = "myLabel";
const optValue = "myValue";

describe("GIVEN <Option />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render the label", () => {
      makeSut({ label: optLabel, value: optValue });
      expect(screen.getByRole<HTMLOptionElement>("option").label).toContain(
        optLabel
      );
    });

    it("THEN should render the value", () => {
      makeSut({ label: optLabel, value: optValue });
      expect(screen.getByRole<HTMLOptionElement>("option").value).toContain(
        optValue
      );
    });
  });
});

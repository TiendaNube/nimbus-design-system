import React from "react";
import { render, screen } from "@testing-library/react";

import { Option } from "./Option";
import { OptionProps } from "./option.types";

const makeSut = (rest: OptionProps) => {
  render(<Option {...rest} data-testid="option-element" />);
};

const optLabel = "myLabel";
const optValue = "myValue";

describe("GIVEN <Option />", () => {
  describe("WHEN rendered", () => {
    it("THEN should disable the option", () => {
      makeSut({ disabled: true });
      expect(
        screen.getByRole<HTMLOptionElement>("option").disabled
      ).toBeTruthy();
    });

    it("THEN should select the option", () => {
      makeSut({ selected: true });
      expect(
        screen.getByRole<HTMLOptionElement>("option").selected
      ).toBeTruthy();
    });

    it("THEN should render the label", () => {
      makeSut({ label: optLabel });
      expect(screen.getByRole<HTMLOptionElement>("option").label).toContain(
        optLabel
      );
    });

    it("THEN should render the value", () => {
      makeSut({ value: optValue });
      expect(screen.getByRole<HTMLOptionElement>("option").value).toContain(
        optValue
      );
    });
  });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { InputSearch } from "./InputSearch";
import { InputSearchProps } from "./inputSearch.types";

const makeSut = (rest?: InputSearchProps) => {
  render(<InputSearch {...rest} data-testid="my-input" />);
};

describe("GIVEN <Input.Search />", () => {
  describe("WHEN rendered", () => {
    it("should correctly render the input type", () => {
      makeSut();
      const input = screen.getByTestId<HTMLInputElement>("my-input");
      fireEvent.change(input, { target: { value: "my search" } });
      expect(input.type).toEqual("search");
    });

    it("should position the search icon correctly", () => {
      makeSut();
      const input = screen.getByTestId("my-input");
      fireEvent.change(input, { target: { value: "my search" } });
      const icon = screen.getByTestId("icon-search");
      expect(icon.getAttribute("class")).toContain("append_start");
    });
  });
});

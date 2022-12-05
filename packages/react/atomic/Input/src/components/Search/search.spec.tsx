import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { Search } from "./Search";
import { SearchProps } from "./search.types";

const makeSut = (rest?: SearchProps) => {
  render(<Search {...rest} data-testid="my-input" />);
};

describe("GIVEN <Title />", () => {
  describe("WHEN rendered", () => {
    it("should correctly render the input type", () => {
      makeSut();
      const input = screen.getByTestId<HTMLInputElement>("my-input");
      fireEvent.change(input, { target: { value: "my password" } });
      expect(input.type).toEqual("search");
    });

    it("should position the password icon correctly", () => {
      makeSut();
      const input = screen.getByTestId("my-input");
      fireEvent.change(input, { target: { value: "my password" } });
      const icon = screen.getByTestId("icon-search");
      expect(input.getAttribute("class")).toContain("inputAppend_start");
      expect(icon.getAttribute("class")).toContain("append_start");
    });
  });
});

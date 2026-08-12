import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { type InputBaseProps } from "../../input.types";
import { InputSearch, type InputSearchProps } from "./InputSearch";

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

    it("aiGenerated should take precedence over appearance when both are provided", () => {
      makeSut({ appearance: "warning", aiGenerated: true });
      const container = screen.getByTestId("my-input")
        .parentElement as HTMLElement;
      expect(container.getAttribute("class")).toContain(
        "appearance_ai-generative"
      );
    });

    it("should accept an `InputBaseProps`-shaped object (e.g. props shared with `Input`) without a type error, ignoring the unsupported `prefix`", () => {
      // Regression guard for the collision fixed alongside #487: `prefix` is
      // a `ReactNode` on `InputBaseProps` but used to only exist as the
      // native, string-only RDFa attribute here, so spreading a shared props
      // object onto `Input.Search` failed to compile.
      const sharedProps: InputBaseProps = { prefix: "$", disabled: true };
      render(<InputSearch {...sharedProps} data-testid="my-input" />);
      expect(screen.getByTestId<HTMLInputElement>("my-input").disabled).toBe(
        true
      );
    });
  });
});

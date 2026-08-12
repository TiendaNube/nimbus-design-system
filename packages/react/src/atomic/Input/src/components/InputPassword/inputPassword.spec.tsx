import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { type InputBaseProps } from "../../input.types";
import { InputPassword, type InputPasswordProps } from "./InputPassword";

const makeSut = (rest?: InputPasswordProps) => {
  render(<InputPassword {...rest} data-testid="my-input" />);
};

describe("GIVEN <Input.Password />", () => {
  describe("WHEN rendered", () => {
    it("should display the password correctly to the user", () => {
      makeSut();
      expect(screen.queryByTestId("button-password-show")).toBeNull();
      const input = screen.getByTestId<HTMLInputElement>("my-input");
      fireEvent.change(input, { target: { value: "my password" } });
      expect(input.type).toEqual("password");
      fireEvent.click(screen.getByTestId("button-password-show"));
      expect(input.type).toEqual("text");
    });

    it("should correctly send the input change event to the onChange function", () => {
      const mockedOnChange = jest.fn();
      makeSut({ onChange: mockedOnChange });
      const input = screen.getByTestId<HTMLInputElement>("my-input");
      fireEvent.change(input, { target: { value: "my password" } });
      expect(mockedOnChange).toBeCalled();
    });

    it("should position the password icon correctly", () => {
      makeSut();
      const input = screen.getByTestId("my-input");
      fireEvent.change(input, { target: { value: "my password" } });
      const button = screen.getByTestId("button-password-show");
      expect(button.getAttribute("class")).toContain("append_end");
    });

    it("aiGenerated should take precedence over appearance when both are provided", () => {
      makeSut({ appearance: "success", aiGenerated: true });
      const container = screen.getByTestId("my-input")
        .parentElement as HTMLElement;
      expect(container.getAttribute("class")).toContain(
        "appearance_ai-generative"
      );
    });

    it("should accept an `InputBaseProps`-shaped object including `prefix` (e.g. props shared with `Input`) without a type error", () => {
      // Regression guard for the assignability break left by #487: it widened
      // `InputProperties.prefix` to a `ReactNode`, while `prefix` here was
      // still the native, string-only RDFa attribute, so an
      // `InputBaseProps`-typed object was no longer assignable to
      // `Input.Password`. This only covers that the spread compiles —
      // `Input.Password` still forwards `prefix` to the underlying `<input>`.
      const sharedProps: InputBaseProps = { prefix: "$", disabled: true };
      render(<InputPassword {...sharedProps} data-testid="my-input" />);
      expect(screen.getByTestId<HTMLInputElement>("my-input").disabled).toBe(
        true
      );
    });
  });
});

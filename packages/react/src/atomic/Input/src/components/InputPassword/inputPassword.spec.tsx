import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { InputPassword } from "./InputPassword";
import { InputPasswordProps } from "./inputPassword.types";

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
  });
});

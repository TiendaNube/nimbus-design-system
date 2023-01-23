import React from "react";
import { render, screen } from "@testing-library/react";

import { Title } from "./Title";
import { TitleProps } from "./title.types";

const content = "myText";

const makeSut = (rest?: Omit<TitleProps, "children">, children = content) => {
  render(<Title {...rest}>{children}</Title>);
};

describe("GIVEN <Title />", () => {
  describe("WHEN rendered", () => {
    it("THEN should default render element type", () => {
      makeSut();
      expect(
        screen.getByRole("heading", { name: content, level: 1 })
      ).toBeDefined();
    });

    it('THEN should render element type="h1"', () => {
      makeSut({ as: "h1" });
      expect(
        screen.getByRole("heading", { name: content, level: 1 })
      ).toBeDefined();
    });

    it('THEN should render element type="h2"', () => {
      makeSut({ as: "h2" });
      expect(
        screen.getByRole("heading", { name: content, level: 2 })
      ).toBeDefined();
    });

    it('THEN should render element type="h3"', () => {
      makeSut({ as: "h3" });
      expect(
        screen.getByRole("heading", { name: content, level: 3 })
      ).toBeDefined();
    });

    it('THEN should render element type="h4"', () => {
      makeSut({ as: "h4" });
      expect(
        screen.getByRole("heading", { name: content, level: 4 })
      ).toBeDefined();
    });

    it('THEN should render element type="h5"', () => {
      makeSut({ as: "h5" });
      expect(
        screen.getByRole("heading", { name: content, level: 5 })
      ).toBeDefined();
    });

    it('THEN should render element type="h6"', () => {
      makeSut({ as: "h6" });
      expect(
        screen.getByRole("heading", { name: content, level: 6 })
      ).toBeDefined();
    });
  });

  describe("THEN should correctly render the text", () => {
    it("THEN should correctly render the text on the left", () => {
      makeSut({ textAlign: "left" });
      expect(
        screen
          .getByRole("heading", { name: content, level: 1 })
          .getAttribute("class")
      ).toContain("textAlign_left");
    });

    it("THEN should correctly render the text on the center", () => {
      makeSut({ textAlign: "center" });
      expect(
        screen
          .getByRole("heading", { name: content, level: 1 })
          .getAttribute("class")
      ).toContain("textAlign_center");
    });

    it("THEN should correctly render the text on the right", () => {
      makeSut({ textAlign: "right" });
      expect(
        screen
          .getByRole("heading", { name: content, level: 1 })
          .getAttribute("class")
      ).toContain("textAlign_right");
    });

    it("THEN should correctly render the text on the justify", () => {
      makeSut({ textAlign: "justify" });
      expect(
        screen
          .getByRole("heading", { name: content, level: 1 })
          .getAttribute("class")
      ).toContain("textAlign_justify");
    });
  });
});
import React from "react";
import { render, screen } from "@testing-library/react";

import { Title } from "./Title";
import { type TitleProps } from "./title.types";

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

    it("THEN should render element type='h1'", () => {
      makeSut({ as: "h1" });
      expect(
        screen.getByRole("heading", { name: content, level: 1 })
      ).toBeDefined();
    });

    it("THEN should render element type='h2'", () => {
      makeSut({ as: "h2" });
      expect(
        screen.getByRole("heading", { name: content, level: 2 })
      ).toBeDefined();
    });

    it("THEN should render element type='h3'", () => {
      makeSut({ as: "h3" });
      expect(
        screen.getByRole("heading", { name: content, level: 3 })
      ).toBeDefined();
    });

    it("THEN should render element type='h4'", () => {
      makeSut({ as: "h4" });
      expect(
        screen.getByRole("heading", { name: content, level: 4 })
      ).toBeDefined();
    });

    it("THEN should render element type='h5'", () => {
      makeSut({ as: "h5" });
      expect(
        screen.getByRole("heading", { name: content, level: 5 })
      ).toBeDefined();
    });

    it("THEN should render element type='h6'", () => {
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

  describe("THEN should correctly render a fontWeight", () => {
    it("THEN should correctly render a bold", () => {
      makeSut({ fontWeight: "bold" });
      expect(screen.getByRole("heading").getAttribute("class")).toContain(
        "fontWeight_bold"
      );
    });

    it("THEN should correctly render a medium", () => {
      makeSut({ fontWeight: "medium" });
      expect(screen.getByRole("heading").getAttribute("class")).toContain(
        "fontWeight_medium"
      );
    });

    it("THEN should correctly render a regular", () => {
      makeSut({ fontWeight: "regular" });
      expect(screen.getByRole("heading").getAttribute("class")).toContain(
        "fontWeight_regular"
      );
    });
  });

  describe("THEN should correctly render the size", () => {
    it("THEN should correctly render the size h1", () => {
      makeSut({ fontSize: "h1" });
      expect(screen.getByRole("heading").getAttribute("class")).toContain(
        "fontSize_h1"
      );
    });

    it("THEN should correctly render the size h2", () => {
      makeSut({ fontSize: "h2" });
      expect(screen.getByRole("heading").getAttribute("class")).toContain(
        "fontSize_h2"
      );
    });

    it("THEN should correctly render the size h3", () => {
      makeSut({ fontSize: "h3" });
      expect(screen.getByRole("heading").getAttribute("class")).toContain(
        "fontSize_h3"
      );
    });

    it("THEN should correctly render the size h4", () => {
      makeSut({ fontSize: "h4" });
      expect(screen.getByRole("heading").getAttribute("class")).toContain(
        "fontSize_h4"
      );
    });

    it("THEN should correctly render the size h5", () => {
      makeSut({ fontSize: "h5" });
      expect(screen.getByRole("heading").getAttribute("class")).toContain(
        "fontSize_h5"
      );
    });

    it("THEN should correctly render the size h6", () => {
      makeSut({ fontSize: "h6" });
      expect(screen.getByRole("heading").getAttribute("class")).toContain(
        "fontSize_h6"
      );
    });
  });

  describe("THEN should correctly render the line height", () => {
    it("THEN should correctly render the line height h1", () => {
      makeSut({ lineHeight: "h1" });
      expect(screen.getByRole("heading").getAttribute("class")).toContain(
        "lineHeight_h1"
      );
    });

    it("THEN should correctly render the line height h2", () => {
      makeSut({ lineHeight: "h2" });
      expect(screen.getByRole("heading").getAttribute("class")).toContain(
        "lineHeight_h2"
      );
    });

    it("THEN should correctly render the line height h3", () => {
      makeSut({ lineHeight: "h3" });
      expect(screen.getByRole("heading").getAttribute("class")).toContain(
        "lineHeight_h3"
      );
    });

    it("THEN should correctly render the line height h4", () => {
      makeSut({ lineHeight: "h4" });
      expect(screen.getByRole("heading").getAttribute("class")).toContain(
        "lineHeight_h4"
      );
    });

    it("THEN should correctly render the line height h5", () => {
      makeSut({ lineHeight: "h5" });
      expect(screen.getByRole("heading").getAttribute("class")).toContain(
        "lineHeight_h5"
      );
    });

    it("THEN should correctly render the line height h6", () => {
      makeSut({ lineHeight: "h6" });
      expect(screen.getByRole("heading").getAttribute("class")).toContain(
        "lineHeight_h6"
      );
    });
  });
});

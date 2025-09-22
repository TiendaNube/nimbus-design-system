import React from "react";
import { render, screen } from "@testing-library/react";

import { Tag } from "./Tag";
import { TagProps } from "./tag.types";

const content = "myText";

const makeSut = (rest?: Omit<TagProps, "children">, children = content) => {
  render(
    <Tag {...rest} data-testid="tag-element">
      {children}
    </Tag>
  );
};

describe("GIVEN <Tag />", () => {
  describe("THEN should correctly render the appearance", () => {
    it("THEN should correctly render the appearance base", () => {
      makeSut();
      expect(screen.getByTestId("tag-element").getAttribute("class")).toContain(
        "appearance_neutral"
      );
    });

    it("THEN should correctly render the appearance primary", () => {
      makeSut({ appearance: "primary" });
      expect(screen.getByTestId("tag-element").getAttribute("class")).toContain(
        "appearance_primary"
      );
    });

    it("THEN should correctly render the appearance success", () => {
      makeSut({ appearance: "success" });
      expect(screen.getByTestId("tag-element").getAttribute("class")).toContain(
        "appearance_success"
      );
    });

    it("THEN should correctly render the appearance warning", () => {
      makeSut({ appearance: "warning" });
      expect(screen.getByTestId("tag-element").getAttribute("class")).toContain(
        "appearance_warning"
      );
    });

    it("THEN should correctly render the appearance danger", () => {
      makeSut({ appearance: "danger" });
      expect(screen.getByTestId("tag-element").getAttribute("class")).toContain(
        "appearance_danger"
      );
    });

    it("THEN should correctly render the appearance neutral", () => {
      makeSut({ appearance: "neutral" });
      expect(screen.getByTestId("tag-element").getAttribute("class")).toContain(
        "appearance_neutral"
      );
    });

    it("THEN should correctly render the appearance ai-generative", () => {
      makeSut({ appearance: "ai-generative" });
      expect(screen.getByTestId("tag-element").getAttribute("class")).toContain(
        "appearance_ai-generative"
      );
    });
  });
});

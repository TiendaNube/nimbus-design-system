import React from "react";
import { render, screen } from "@testing-library/react";

import { Textarea, TextareaProps } from "./Textarea";

const textareaId = "myId";

const makeSut = (rest?: Omit<TextareaProps, "id">, id = textareaId) => {
  render(<Textarea {...rest} id={id} data-testid="textarea-element" />);
};

describe("GIVEN <Textarea />", () => {
  describe("WHEN rendered", () => {
    it("THEN should correctly render the appearance base", () => {
      makeSut();
      expect(
        screen.getByRole<HTMLTextAreaElement>("textbox").getAttribute("class")
      ).toContain("appearance_neutral");
    });

    it("THEN should correctly render the appearance neutral", () => {
      makeSut({ appearance: "neutral" });
      expect(
        screen.getByRole<HTMLTextAreaElement>("textbox").getAttribute("class")
      ).toContain("appearance_neutral");
    });

    it("THEN should correctly render the appearance success", () => {
      makeSut({ appearance: "success" });
      expect(
        screen.getByRole<HTMLTextAreaElement>("textbox").getAttribute("class")
      ).toContain("appearance_success");
    });

    it("THEN should correctly render the appearance warning", () => {
      makeSut({ appearance: "warning" });
      expect(
        screen.getByRole<HTMLTextAreaElement>("textbox").getAttribute("class")
      ).toContain("appearance_warning");
    });

    it("THEN should correctly render the appearance danger", () => {
      makeSut({ appearance: "danger" });
      expect(
        screen.getByRole<HTMLTextAreaElement>("textbox").getAttribute("class")
      ).toContain("appearance_danger");
    });

    it("THEN should render the id", () => {
      makeSut();
      expect(screen.getByRole<HTMLTextAreaElement>("textbox").id).toContain(
        textareaId
      );
    });

    it("THEN should render the amount of lines specified", () => {
      makeSut();
      expect(
        screen.getByRole<HTMLTextAreaElement>("textbox").getAttribute("rows")
      ).toMatch(/\d/);
    });
  });
});

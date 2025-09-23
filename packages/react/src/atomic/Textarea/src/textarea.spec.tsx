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

    it("THEN should correctly render the appearance ai-generative", () => {
      makeSut({ appearance: "ai-generative" });
      expect(
        screen.getByRole<HTMLTextAreaElement>("textbox").getAttribute("class")
      ).toContain("appearance_ai-generative");
    });

    it("THEN should correctly render the appearance transparent", () => {
      makeSut({ appearance: "transparent" });
      expect(
        screen.getByRole<HTMLTextAreaElement>("textbox").getAttribute("class")
      ).toContain("appearance_transparent");
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

    it("THEN should render custom lines when specified", () => {
      makeSut({ lines: 5 });
      expect(
        screen.getByRole<HTMLTextAreaElement>("textbox").getAttribute("rows")
      ).toBe("5");
    });
  });

  describe("WHEN autoGrow is enabled", () => {
    it("THEN should include fieldSizing class", () => {
      makeSut({ autoGrow: true });
      expect(
        screen.getByRole<HTMLTextAreaElement>("textbox").getAttribute("class")
      ).toContain("fieldSizing");
    });

    it("THEN should not include fieldSizing class when autoGrow is false", () => {
      makeSut({ autoGrow: false });
      expect(
        screen.getByRole<HTMLTextAreaElement>("textbox").getAttribute("class")
      ).not.toContain("fieldSizing");
    });

    it("THEN should not include fieldSizing class by default", () => {
      makeSut();
      expect(
        screen.getByRole<HTMLTextAreaElement>("textbox").getAttribute("class")
      ).not.toContain("fieldSizing");
    });
  });

  describe("WHEN maxLines is set", () => {
    it("THEN should apply maxHeight style with CSS variables", () => {
      makeSut({ maxLines: 10 });
      const textarea = screen.getByRole<HTMLTextAreaElement>("textbox");
      expect(textarea.style.maxHeight).toBe(
        "calc(10lh + var(--textarea-vertical-padding) + var(--textarea-vertical-borders))"
      );
    });

    it("THEN should apply overflowY auto when maxLines is set", () => {
      makeSut({ maxLines: 5 });
      const textarea = screen.getByRole<HTMLTextAreaElement>("textbox");
      expect(textarea.style.overflowY).toBe("auto");
    });

    it("THEN should not apply maxHeight style when maxLines is not set", () => {
      makeSut();
      const textarea = screen.getByRole<HTMLTextAreaElement>("textbox");
      expect(textarea.style.maxHeight).toBe("");
      expect(textarea.style.overflowY).toBe("");
    });
  });

  describe("WHEN minLines is set", () => {
    it("THEN should apply minHeight style with CSS variables", () => {
      makeSut({ minLines: 3 });
      const textarea = screen.getByRole<HTMLTextAreaElement>("textbox");
      expect(textarea.style.minHeight).toBe(
        "calc(3lh + var(--textarea-vertical-padding) + var(--textarea-vertical-borders))"
      );
    });

    it("THEN should not apply minHeight style when minLines is not set", () => {
      makeSut();
      const textarea = screen.getByRole<HTMLTextAreaElement>("textbox");
      expect(textarea.style.minHeight).toBe("");
    });
  });

  describe("WHEN both maxLines and minLines are set", () => {
    it("THEN should apply both minHeight and maxHeight styles", () => {
      makeSut({ minLines: 2, maxLines: 8 });
      const textarea = screen.getByRole<HTMLTextAreaElement>("textbox");
      expect(textarea.style.minHeight).toBe(
        "calc(2lh + var(--textarea-vertical-padding) + var(--textarea-vertical-borders))"
      );
      expect(textarea.style.maxHeight).toBe(
        "calc(8lh + var(--textarea-vertical-padding) + var(--textarea-vertical-borders))"
      );
      expect(textarea.style.overflowY).toBe("auto");
    });
  });

  describe("WHEN autoGrow is combined with maxLines", () => {
    it("THEN should apply both fieldSizing class and maxHeight style", () => {
      makeSut({ autoGrow: true, maxLines: 6 });
      const textarea = screen.getByRole<HTMLTextAreaElement>("textbox");
      expect(textarea.getAttribute("class")).toContain("fieldSizing");
      expect(textarea.style.maxHeight).toBe(
        "calc(6lh + var(--textarea-vertical-padding) + var(--textarea-vertical-borders))"
      );
      expect(textarea.style.overflowY).toBe("auto");
    });
  });

  describe("WHEN autoGrow is combined with minLines", () => {
    it("THEN should apply both fieldSizing class and minHeight style", () => {
      makeSut({ autoGrow: true, minLines: 4 });
      const textarea = screen.getByRole<HTMLTextAreaElement>("textbox");
      expect(textarea.getAttribute("class")).toContain("fieldSizing");
      expect(textarea.style.minHeight).toBe(
        "calc(4lh + var(--textarea-vertical-padding) + var(--textarea-vertical-borders))"
      );
    });
  });

  describe("WHEN autoGrow, minLines, and maxLines are all set", () => {
    it("THEN should apply fieldSizing class and both height constraints", () => {
      makeSut({ autoGrow: true, minLines: 3, maxLines: 10 });
      const textarea = screen.getByRole<HTMLTextAreaElement>("textbox");
      expect(textarea.getAttribute("class")).toContain("fieldSizing");
      expect(textarea.style.minHeight).toBe(
        "calc(3lh + var(--textarea-vertical-padding) + var(--textarea-vertical-borders))"
      );
      expect(textarea.style.maxHeight).toBe(
        "calc(10lh + var(--textarea-vertical-padding) + var(--textarea-vertical-borders))"
      );
      expect(textarea.style.overflowY).toBe("auto");
    });
  });

  describe("WHEN edge case values are provided", () => {
    it("THEN should not apply styles when zero values are set", () => {
      makeSut({ minLines: 0, maxLines: 0 });
      const textarea = screen.getByRole<HTMLTextAreaElement>("textbox");
      expect(textarea.style.minHeight).toBe("");
      expect(textarea.style.maxHeight).toBe("");
      expect(textarea.style.overflowY).toBe("");
    });

    it("THEN should handle large values correctly", () => {
      makeSut({ minLines: 1, maxLines: 100 });
      const textarea = screen.getByRole<HTMLTextAreaElement>("textbox");
      expect(textarea.style.minHeight).toBe(
        "calc(1lh + var(--textarea-vertical-padding) + var(--textarea-vertical-borders))"
      );
      expect(textarea.style.maxHeight).toBe(
        "calc(100lh + var(--textarea-vertical-padding) + var(--textarea-vertical-borders))"
      );
    });

    it("THEN should handle undefined values correctly", () => {
      makeSut({ minLines: undefined, maxLines: undefined });
      const textarea = screen.getByRole<HTMLTextAreaElement>("textbox");
      expect(textarea.style.minHeight).toBe("");
      expect(textarea.style.maxHeight).toBe("");
      expect(textarea.style.overflowY).toBe("");
    });
  });
});

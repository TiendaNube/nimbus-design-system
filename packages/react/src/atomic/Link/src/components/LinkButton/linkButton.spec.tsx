import React from "react";
import { render, screen } from "@testing-library/react";

import { LinkButton } from "./LinkButton";
import { LinkButtonProps } from "./linkButton.types";

const makeSut = (rest: LinkButtonProps) => {
  render(<LinkButton {...rest} data-testid="link-element" />);
};

describe("GIVEN <LinkButton />", () => {
  describe("WHEN rendered", () => {
    it("THEN should correctly render the appearance default", () => {
      makeSut({ children: "link" });
      expect(screen.getByRole("button").getAttribute("class")).toContain(
        "appearance_neutral"
      );
    });

    it("THEN should correctly render the appearance primary", () => {
      makeSut({ appearance: "primary", children: "link" });
      expect(screen.getByRole("button").getAttribute("class")).toContain(
        "appearance_primary"
      );
    });

    it("THEN should correctly render the appearance danger", () => {
      makeSut({ appearance: "danger", children: "link" });
      expect(screen.getByRole("button").getAttribute("class")).toContain(
        "appearance_danger"
      );
    });

    it("THEN should correctly render the appearance neutral", () => {
      makeSut({ appearance: "neutral", children: "link" });
      expect(screen.getByRole("button").getAttribute("class")).toContain(
        "appearance_neutral"
      );
    });

    it("THEN should correctly render the appearance neutral.background", () => {
      makeSut({
        appearance: "neutral.background",
        children: "link",
      });
      expect(screen.getByRole("button").getAttribute("class")).toContain(
        "appearance_neutral.background"
      );
    });

    it("THEN should correctly render with size caption", () => {
      makeSut({ size: "caption", children: "link" });
      expect(screen.getByRole("button").getAttribute("class")).toContain(
        "size_caption"
      );
    });

    it("THEN should correctly render with size base", () => {
      makeSut({ size: "base", children: "link" });
      expect(screen.getByRole("button").getAttribute("class")).toContain(
        "size_base"
      );
    });

    it("THEN should correctly render with size highlight", () => {
      makeSut({ size: "highlight", children: "link" });
      expect(screen.getByRole("button").getAttribute("class")).toContain(
        "size_highlight"
      );
    });

    it("THEN should correctly render with textDecoration none", () => {
      makeSut({ textDecoration: "none", children: "link" });
      expect(screen.getByRole("button").getAttribute("class")).toContain(
        "textDecoration_none"
      );
    });

    it("THEN should correctly render with textDecoration underline", () => {
      makeSut({ textDecoration: "underline", children: "link" });
      expect(screen.getByRole("button").getAttribute("class")).toContain(
        "textDecoration_underline"
      );
    });
  });
});

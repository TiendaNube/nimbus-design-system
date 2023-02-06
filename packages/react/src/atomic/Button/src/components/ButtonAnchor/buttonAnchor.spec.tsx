import React from "react";
import { render, screen } from "@testing-library/react";

import { ButtonAnchor } from "./ButtonAnchor";
import { ButtonAnchorProps } from "./buttonAnchor.types";

const makeSut = (rest: Omit<ButtonAnchorProps, "href">) => {
  render(<ButtonAnchor {...rest} href="#" data-testid="button-element" />);
};

describe("GIVEN <ButtonAnchor />", () => {
  describe("THEN should correctly render the submitted appearance", () => {
    it("THEN should correctly render the appearance default", () => {
      makeSut({ children: "button" });
      expect(screen.getByRole("link").getAttribute("class")).toContain(
        "appearance_neutral"
      );
    });

    it("THEN should correctly render the appearance primary", () => {
      makeSut({ appearance: "primary", children: "button" });
      expect(screen.getByRole("link").getAttribute("class")).toContain(
        "appearance_primary"
      );
    });

    it("THEN should correctly render the appearance danger", () => {
      makeSut({ appearance: "danger", children: "button" });
      expect(screen.getByRole("link").getAttribute("class")).toContain(
        "appearance_danger"
      );
    });

    it("THEN should correctly render the appearance neutral", () => {
      makeSut({ appearance: "neutral", children: "button" });
      expect(screen.getByRole("link").getAttribute("class")).toContain(
        "appearance_neutral"
      );
    });

    it("THEN should correctly render the appearance transparent", () => {
      makeSut({ appearance: "transparent", children: "button" });
      expect(screen.getByRole("link").getAttribute("class")).toContain(
        "appearance_transparent"
      );
    });
  });
});

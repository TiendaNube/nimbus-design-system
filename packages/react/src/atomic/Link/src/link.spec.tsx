import React from "react";
import { render, screen } from "@testing-library/react";

import { Link } from "./Link";
import { LinkProps } from "./link.types";

const makeSut = (rest: LinkProps) => {
  render(<Link {...rest} data-testid="link-element" />);
};

describe("GIVEN <Link />", () => {
  describe("WHEN rendered", () => {
    it("THEN should correctly render the appearance default", () => {
      makeSut({ href: "#", children: "link" });
      expect(screen.getByRole("link").getAttribute("class")).toContain(
        "appearance_neutral"
      );
    });

    it("THEN should correctly render the appearance primary", () => {
      makeSut({ appearance: "primary", href: "#", children: "link" });
      expect(
        screen.getByRole("link", { name: "link" }).getAttribute("class")
      ).toContain("appearance_primary");
    });

    it("THEN should correctly render the appearance danger", () => {
      makeSut({ appearance: "danger", href: "#", children: "link" });
      expect(
        screen.getByRole("link", { name: "link" }).getAttribute("class")
      ).toContain("appearance_danger");
    });

    it("THEN should correctly render the appearance neutral", () => {
      makeSut({ appearance: "neutral", href: "#", children: "link" });
      expect(
        screen.getByRole("link", { name: "link" }).getAttribute("class")
      ).toContain("appearance_neutral");
    });

    it("THEN should correctly render without underline", () => {
      makeSut({ textDecoration: "none", href: "#", children: "link" });
      expect(
        screen.getByRole("link", { name: "link" }).getAttribute("class")
      ).toContain("textDecoration_none");
    });

    it("THEN should correctly render with size caption", () => {
      makeSut({ size: "caption", href: "#", children: "link" });
      expect(
        screen.getByRole("link", { name: "link" }).getAttribute("class")
      ).toContain("size_caption");
    });

    it("THEN should correctly render with size base", () => {
      makeSut({ size: "base", href: "#", children: "link" });
      expect(
        screen.getByRole("link", { name: "link" }).getAttribute("class")
      ).toContain("size_base");
    });

    it("THEN should correctly render with size highlight", () => {
      makeSut({ size: "highlight", href: "#", children: "link" });
      expect(
        screen.getByRole("link", { name: "link" }).getAttribute("class")
      ).toContain("size_highlight");
    });
  });
});

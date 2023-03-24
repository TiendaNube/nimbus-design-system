import React from "react";
import { render, screen } from "@testing-library/react";

import { Link, LinkProps } from "./Link";

const makeSut = (rest: LinkProps & { as?: "a" | "button"; href?: string }) => {
  render(<Link as={rest.as || "a"} {...rest} data-testid="link-element" />);
};

describe("GIVEN <Link />", () => {
  describe("WHEN rendered", () => {
    it("THEN should correctly render the button element", () => {
      makeSut({ children: "button", as: "button" });
      expect(screen.getByRole("button")).toBeDefined();
    });

    it("AND should correctly render the appearance default", () => {
      makeSut({ href: "#", children: "link" });
      expect(screen.getByRole("link").getAttribute("class")).toContain(
        "appearance_neutral"
      );
    });

    it("AND should correctly render the appearance primary", () => {
      makeSut({ appearance: "primary", href: "#", children: "link" });
      expect(
        screen.getByRole("link", { name: "link" }).getAttribute("class")
      ).toContain("appearance_primary");
    });

    it("AND should correctly render the appearance danger", () => {
      makeSut({ appearance: "danger", href: "#", children: "link" });
      expect(
        screen.getByRole("link", { name: "link" }).getAttribute("class")
      ).toContain("appearance_danger");
    });

    it("AND should correctly render the appearance neutral", () => {
      makeSut({ appearance: "neutral", href: "#", children: "link" });
      expect(
        screen.getByRole("link", { name: "link" }).getAttribute("class")
      ).toContain("appearance_neutral");
    });

    it("AND should correctly render the appearance neutral-background", () => {
      makeSut({
        appearance: "neutral-background",
        href: "#",
        children: "link",
      });
      expect(
        screen.getByRole("link", { name: "link" }).getAttribute("class")
      ).toContain("appearance_neutral-background");
    });

    it("AND should correctly render with fontSize caption", () => {
      makeSut({ fontSize: "caption", href: "#", children: "link" });
      expect(
        screen.getByRole("link", { name: "link" }).getAttribute("class")
      ).toContain("fontSize_caption");
    });

    it("AND should correctly render with fontSize base", () => {
      makeSut({ fontSize: "base", href: "#", children: "link" });
      expect(
        screen.getByRole("link", { name: "link" }).getAttribute("class")
      ).toContain("fontSize_base");
    });

    it("AND should correctly render with fontSize highlight", () => {
      makeSut({ fontSize: "highlight", href: "#", children: "link" });
      expect(
        screen.getByRole("link", { name: "link" }).getAttribute("class")
      ).toContain("fontSize_highlight");
    });

    it("AND should correctly render with lineHeight caption", () => {
      makeSut({ lineHeight: "caption", href: "#", children: "link" });
      expect(
        screen.getByRole("link", { name: "link" }).getAttribute("class")
      ).toContain("lineHeight_caption");
    });

    it("AND should correctly render with lineHeight base", () => {
      makeSut({ lineHeight: "base", href: "#", children: "link" });
      expect(
        screen.getByRole("link", { name: "link" }).getAttribute("class")
      ).toContain("lineHeight_base");
    });

    it("AND should correctly render with lineHeight highlight", () => {
      makeSut({ lineHeight: "highlight", href: "#", children: "link" });
      expect(
        screen.getByRole("link", { name: "link" }).getAttribute("class")
      ).toContain("lineHeight_highlight");
    });

    it("AND should correctly render with textDecoration none", () => {
      makeSut({ textDecoration: "none", href: "#", children: "link" });
      expect(
        screen.getByRole("link", { name: "link" }).getAttribute("class")
      ).toContain("textDecoration_none");
    });

    it("AND should correctly render with textDecoration underline", () => {
      makeSut({ textDecoration: "underline", href: "#", children: "link" });
      expect(
        screen.getByRole("link", { name: "link" }).getAttribute("class")
      ).toContain("textDecoration_underline");
    });
  });
});

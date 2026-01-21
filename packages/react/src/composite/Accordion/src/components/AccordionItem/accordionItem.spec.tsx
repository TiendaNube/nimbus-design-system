import React from "react";
import { render, screen } from "@testing-library/react";

import { AccordionItem } from "./AccordionItem";
import { AccordionItemProps } from "./accordionItem.types";

const makeSut = (props: AccordionItemProps) => {
  render(<AccordionItem {...props} data-testid="footer-element" />);
};

describe("GIVEN <Accordion.item />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render the submitted content", () => {
      makeSut({ children: "My content", index: "0" });
      expect(screen.getByText("My content")).toBeDefined();
    });
  });

  describe("WHEN interactive prop is provided", () => {
    it("THEN should pass interactive=true to context", () => {
      makeSut({
        children: "Interactive content",
        index: "0",
        interactive: true,
      });
      expect(screen.getByText("Interactive content")).toBeDefined();
    });

    it("THEN should pass interactive=false to context", () => {
      makeSut({
        children: "Non-interactive content",
        index: "0",
        interactive: false,
      });
      expect(screen.getByText("Non-interactive content")).toBeDefined();
    });

    it("THEN should default to interactive=true when not provided", () => {
      makeSut({ children: "Default interactive", index: "0" });
      expect(screen.getByText("Default interactive")).toBeDefined();
    });
  });
});

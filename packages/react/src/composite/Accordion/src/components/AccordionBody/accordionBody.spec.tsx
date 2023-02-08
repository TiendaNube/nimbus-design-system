import React from "react";
import { render, screen } from "@testing-library/react";

import { Accordion } from "../../Accordion";
import { AccordionBody } from "./AccordionBody";
import { AccordionBodyProps } from "./accordionBody.types";

const makeSut = (props: AccordionBodyProps, selectedDefault = "0") => {
  render(
    <Accordion selectedDefault={selectedDefault}>
      <Accordion.Item index="0">
        <AccordionBody {...props} data-testid="accordion-body-element" />
      </Accordion.Item>
    </Accordion>
  );
};

describe("GIVEN <Acordion.Body />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render the submitted content", () => {
      makeSut({ children: "My content" });
      expect(screen.getByText("My content")).toBeDefined();
    });

    it("AND should not render the content if the accordion is closed", () => {
      makeSut({ children: "My content" }, "1");
      expect(screen.queryByText("My content")).toBeNull();
    });
  });

  describe("THEN should correctly render the submitted borderBottom", () => {
    it("THEN should correctly render the borderBottom default", () => {
      makeSut({ children: "My content" });
      expect(
        screen.getByTestId("accordion-body-element").getAttribute("class")
      ).toContain("borderBottom_none");
    });

    it("THEN should correctly render the borderBottom none", () => {
      makeSut({ children: "My content", borderBottom: "none" });
      expect(
        screen.getByTestId("accordion-body-element").getAttribute("class")
      ).toContain("borderBottom_none");
    });

    it("THEN should correctly render the borderBottom base", () => {
      makeSut({ children: "My content", borderBottom: "base" });
      expect(
        screen.getByTestId("accordion-body-element").getAttribute("class")
      ).toContain("borderBottom_base");
    });
  });
});

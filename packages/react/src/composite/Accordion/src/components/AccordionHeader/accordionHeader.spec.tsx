import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { Accordion } from "../../Accordion";
import { AccordionHeader } from "./AccordionHeader";
import { AccordionHeaderProps } from "./accordionHeader.types";

const makeSut = (props?: AccordionHeaderProps, selectedDefault = "0") => {
  render(
    <Accordion selectedDefault={selectedDefault}>
      <Accordion.Item index="0">
        <AccordionHeader {...props} data-testid="accordion-header-element" />
      </Accordion.Item>
    </Accordion>
  );
};

describe("GIVEN <Accordion.Header />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render the submitted title", () => {
      makeSut({ title: "My title" });
      expect(screen.getByText("My title")).toBeDefined();
      expect(screen.getByTestId("accordion-header-title")).toBeDefined();
    });

    it("AND should not render the submitted title", () => {
      makeSut();
      expect(screen.queryByTestId("accordion-header-title")).toBeNull();
    });

    it("AND should render the submitted subTitle", () => {
      makeSut({ subtitle: "My subtitle" });
      expect(screen.getByText("My subtitle")).toBeDefined();
      expect(screen.getByTestId("accordion-header-subtitle")).toBeDefined();
    });

    it("AND should not render the submitted subTitle", () => {
      makeSut();
      expect(screen.queryByTestId("accordion-header-subtitle")).toBeNull();
    });

    it("AND should render the submitted Icon", () => {
      makeSut({
        icon: <svg data-testid="my-accodion-icon" />,
      });
      expect(screen.getByTestId("my-accodion-icon")).toBeDefined();
    });

    it("AND should render the IconToggle", () => {
      makeSut();
      expect(screen.getByTestId("accordion-icon-Toggle")).toBeDefined();
    });

    it("AND should not render the IconToggle", () => {
      makeSut({
        noIconToggle: true,
      });
      fireEvent.click(screen.getByTestId("accordion-header-element"));
      expect(screen.queryByTestId("accordion-icon-Toggle")).toBeNull();
    });

    it("AND should open accordion item", () => {
      makeSut({}, "1");
      fireEvent.click(screen.getByTestId("accordion-header-element"));
      expect(
        screen.getByTestId("accordion-header-element").getAttribute("class")
      ).toContain("active");
    });

    it("AND should not open accordion item", () => {
      makeSut({}, "1");
      expect(
        screen.getByTestId("accordion-header-element").getAttribute("class")
      ).not.toContain("active");
    });

    it("AND should send the props correctly via render props", () => {
      render(
        <Accordion selectedDefault="1">
          <Accordion.Item index="0">
            <AccordionHeader data-testid="accordion-header-element">
              {({ selected, index }) => (
                <div data-testid={`selected-${selected}-index-${index}`} />
              )}
            </AccordionHeader>
          </Accordion.Item>
        </Accordion>
      );
      expect(screen.getByTestId("selected-1-index-0")).toBeDefined();
    });
  });

  describe("THEN should correctly render the submitted borderBottom", () => {
    it("THEN should correctly render the borderBottom default", () => {
      makeSut();
      expect(
        screen.getByTestId("accordion-header-element").getAttribute("class")
      ).toContain("borderBottom_none");
    });

    it("THEN should correctly render the borderBottom none", () => {
      makeSut({ borderBottom: "none" });
      expect(
        screen.getByTestId("accordion-header-element").getAttribute("class")
      ).toContain("borderBottom_none");
    });

    it("THEN should correctly render the borderBottom base", () => {
      makeSut({ borderBottom: "base" }, "1");
      expect(
        screen.getByTestId("accordion-header-element").getAttribute("class")
      ).toContain("borderBottom_base");
    });
  });

  describe("THEN should correctly render the submitted borderTop", () => {
    it("THEN should correctly render the borderTop default", () => {
      makeSut();
      expect(
        screen.getByTestId("accordion-header-element").getAttribute("class")
      ).toContain("borderTop_base");
    });

    it("THEN should correctly render the borderTop none", () => {
      makeSut({ borderTop: "none" });
      expect(
        screen.getByTestId("accordion-header-element").getAttribute("class")
      ).toContain("borderTop_none");
    });

    it("THEN should correctly render the borderTop base", () => {
      makeSut({ borderTop: "base" });
      expect(
        screen.getByTestId("accordion-header-element").getAttribute("class")
      ).toContain("borderTop_base");
    });
  });
});

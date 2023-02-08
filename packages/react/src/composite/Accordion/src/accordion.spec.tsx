import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { Accordion } from "./Accordion";
import { AccordionProps } from "./accordion.types";

const makeSut = ({ children, ...rest }: AccordionProps) => {
  render(
    <Accordion {...rest} data-testid="accordion-element" selectedDefault="0">
      <Accordion.Item index="0">
        <Accordion.Header data-testid="accordion-header-0" title="Title one" />
        <Accordion.Body data-testid="accordion-body-0">
          {children}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item index="1">
        <Accordion.Header data-testid="accordion-header-1" title="Title two" />
        <Accordion.Body data-testid="accordion-body-1">
          {children}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item index="2">
        <Accordion.Header
          data-testid="accordion-header-2"
          title="Title three"
        />
        <Accordion.Body data-testid="accordion-body-2">
          {children}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

describe("GIVEN <Accordion />", () => {
  describe("WHEN rendered", () => {
    it("THEN should correctly render the submitted content", () => {
      makeSut({ children: <div>content</div> });
      expect(screen.getByText("content")).toBeDefined();
    });

    it("AND should display open accordion item correctly", () => {
      makeSut({ children: <div>content</div> });
      expect(screen.getByTestId("accordion-body-0")).toBeDefined();
      fireEvent.click(screen.getByTestId("accordion-header-1"));
      expect(screen.getByTestId("accordion-body-1")).toBeDefined();
      fireEvent.click(screen.getByTestId("accordion-header-2"));
      expect(screen.getByTestId("accordion-body-2")).toBeDefined();
    });
  });
});

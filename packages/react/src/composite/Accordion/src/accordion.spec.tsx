import React, { useState } from "react";
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

const ControlledAccordion = () => {
  const [selected, setSelected] = useState("0");

  return (
    <Accordion
      selected={selected}
      onSelect={setSelected}
      data-testid="controlled-accordion"
    >
      <Accordion.Item index="0">
        <Accordion.Header data-testid="controlled-header-0" title="Title one" />
        <Accordion.Body data-testid="controlled-body-0">
          <div>Content 0</div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item index="1">
        <Accordion.Header data-testid="controlled-header-1" title="Title two" />
        <Accordion.Body data-testid="controlled-body-1">
          <div>Content 1</div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

describe("GIVEN <Accordion />", () => {
  describe("WHEN rendered in uncontrolled mode", () => {
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

  describe("WHEN rendered in controlled mode", () => {
    it("THEN should correctly handle controlled selection", () => {
      render(<ControlledAccordion />);
      
      // Initially, item 0 should be selected
      expect(screen.getByTestId("controlled-body-0")).toBeDefined();
      
      // Click on header 1 to select item 1
      fireEvent.click(screen.getByTestId("controlled-header-1"));
      expect(screen.getByTestId("controlled-body-1")).toBeDefined();
      
      // Click on header 1 again to close it
      fireEvent.click(screen.getByTestId("controlled-header-1"));
      expect(screen.queryByTestId("controlled-body-1")).toBeNull();
    });
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";

import { ModalBody } from "./ModalBody";
import { ModalBodyProps } from "./modalBody.types";

const makeSut = (props: ModalBodyProps) => {
  render(<ModalBody {...props} data-testid="body-element" />);
};

describe("GIVEN <Modal.Body />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render the submitted content", () => {
      makeSut({ children: "My content" });
      expect(screen.getByText("My content")).toBeDefined();
    });
  });

  describe("THEN should correctly render the submitted padding", () => {
    it("THEN should correctly render the padding default", () => {
      makeSut({ children: "My content" });
      expect(
        screen.getByTestId("body-element").getAttribute("class")
      ).toContain("padding_base");
    });

    it("AND should correctly render the padding none", () => {
      makeSut({ padding: "none", children: "My content" });
      expect(
        screen.getByTestId("body-element").getAttribute("class")
      ).toContain("padding_none");
    });

    it("AND should correctly render the padding base", () => {
      makeSut({ padding: "base", children: "My content" });
      expect(
        screen.getByTestId("body-element").getAttribute("class")
      ).toContain("padding_base");
    });

    it("AND should correctly render the padding small", () => {
      makeSut({ padding: "small", children: "My content" });
      expect(
        screen.getByTestId("body-element").getAttribute("class")
      ).toContain("padding_small");
    });
  });
});

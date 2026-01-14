import React from "react";
import { render, screen } from "@testing-library/react";

import { ModalHeader } from "./ModalHeader";
import { ModalHeaderProps } from "./modalHeader.types";

const makeSut = (props?: ModalHeaderProps) => {
  render(<ModalHeader {...props} data-testid="header-element" />);
};

describe("GIVEN <Modal.Header />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render the submitted title", () => {
      makeSut({ title: "My Title" });
      expect(screen.getByText("My Title")).toBeDefined();
      expect(screen.getByTestId("header-title")).toBeDefined();
    });
    it("THEN should not render the submitted title", () => {
      makeSut();
      expect(screen.queryByTestId("header-title")).toBeNull();
    });
    it("THEN should render the submitted tag", () => {
      makeSut({ title: "My Title", tag: <span data-testid="header-tag">Tag</span> });
      expect(screen.getByTestId("header-tag")).toBeDefined();
      expect(screen.getByText("Tag")).toBeDefined();
    });
    it("THEN should render tag without title", () => {
      makeSut({ tag: <span data-testid="header-tag">Tag</span> });
      expect(screen.getByTestId("header-tag")).toBeDefined();
      expect(screen.queryByTestId("header-title")).toBeNull();
    });
  });
});

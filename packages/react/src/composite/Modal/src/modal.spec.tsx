import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { Modal } from "./Modal";
import { ModalProps } from "./modal.types";

const mockedOnDismiss = jest.fn();

const makeSut = (
  rest: Pick<ModalProps, "children" | "padding" | "onDismiss">
) => {
  render(<Modal {...rest} open data-testid="modal-element" />);
};

describe("GIVEN <Modal />", () => {
  describe("WHEN rendered", () => {
    it("THEN should correctly render the submitted content", () => {
      makeSut({ children: <div>My content</div> });
      expect(screen.getByText("My content")).toBeDefined();
    });

    it("AND should correctly call the onDismiss function when closing the modal", () => {
      makeSut({ children: <div>My content</div>, onDismiss: mockedOnDismiss });
      fireEvent.click(screen.getByTestId("dismiss-modal-button"));
      expect(mockedOnDismiss).toBeCalledWith(false);
    });

    it("AND should not call the onDismiss function when it is not provided", () => {
      makeSut({ children: <div>My content</div> });
      fireEvent.keyDown(document, {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
      });
      expect(screen.queryByTestId("dismiss-modal-button")).toBeNull();
    });
  });

  describe("THEN should correctly render the submitted padding", () => {
    it("THEN should correctly render the padding default", () => {
      makeSut({ children: "My content" });
      expect(screen.getByTestId("modal-element").getAttribute("style")).toMatch(
        /--padding-xs__\w{0,9}: var\(--nimbus-spacing-4\);/
      );
    });

    it("AND should correctly render the padding none", () => {
      makeSut({ padding: "none", children: "My content" });
      expect(screen.getByTestId("modal-element").getAttribute("style")).toMatch(
        /--padding-xs__\w{0,9}: 0;/
      );
    });

    it("AND should correctly render the padding base", () => {
      makeSut({ padding: "base", children: "My content" });
      expect(screen.getByTestId("modal-element").getAttribute("style")).toMatch(
        /--padding-xs__\w{0,9}: var\(--nimbus-spacing-4\);/
      );
    });

    it("AND should correctly render the padding small", () => {
      makeSut({ padding: "small", children: "My content" });
      expect(screen.getByTestId("modal-element").getAttribute("style")).toMatch(
        /--padding-xs__\w{0,9}: var\(--nimbus-spacing-2\);/
      );
    });
  });
});

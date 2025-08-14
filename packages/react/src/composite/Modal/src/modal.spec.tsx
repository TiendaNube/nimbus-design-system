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

    it("THEN should not close the modal if the close function is not provided", () => {
      makeSut({ children: <div>My content</div> });
      fireEvent.keyDown(document, {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
      });
      expect(screen.queryByTestId("dismiss-modal-button")).toBeNull();
      expect(screen.getByText("My content")).toBeDefined();
    });
  });

  describe("WHEN container is provided", () => {
    it("THEN renders overlay and content inside that container", () => {
      const container = document.createElement("div");
      container.setAttribute("data-testid", "scoped-root");
      // Ensure container has layout context
      container.style.position = "relative";
      document.body.appendChild(container);

      render(
        <Modal container={container} open onDismiss={mockedOnDismiss}>
          <div>Scoped content</div>
        </Modal>
      );

      const scopedRoot = screen.getByTestId("scoped-root");
      expect(scopedRoot).toContainElement(screen.getByText("Scoped content"));
    });

    it("THEN keeps default behavior when container is null", () => {
      render(
        <Modal container={null} open onDismiss={mockedOnDismiss}>
          <div>Fallback content</div>
        </Modal>
      );

      expect(screen.getByText("Fallback content")).toBeDefined();
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

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { Modal } from "./Modal";
import { ModalProps } from "./modal.types";

const mockedOnDismiss = jest.fn();

const makeSut = (
  rest: Pick<ModalProps, "children" | "padding" | "onDismiss" | "root">
) => render(<Modal {...rest} open data-testid="modal-element" />);

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
      const { container } = makeSut({ children: <div>My content</div> });
      fireEvent.keyDown(container, {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
      });
      expect(screen.queryByTestId("dismiss-modal-button")).toBeNull();
      expect(screen.getByText("My content")).toBeDefined();
    });
  });

  describe("WHEN root is provided", () => {
    it("THEN renders overlay and content inside that container", () => {
      const TestWrapper = () => {
        const [root, setRoot] = React.useState<HTMLDivElement | null>(null);

        return (
          <div>
            <div
              ref={setRoot}
              data-testid="scoped-root"
              style={{ position: "relative" }}
            />
            <Modal root={root} open onDismiss={mockedOnDismiss}>
              <div>Scoped content</div>
            </Modal>
          </div>
        );
      };

      render(<TestWrapper />);

      const scopedRoot = screen.getByTestId("scoped-root");
      expect(scopedRoot).toContainElement(screen.getByText("Scoped content"));
    });

    it("THEN keeps default behavior when root is null", () => {
      makeSut({
        root: null,
        children: <div>Fallback content</div>,
        onDismiss: mockedOnDismiss,
      });

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

  describe("WHEN closeOnOutsidePress is a function", () => {
    it("THEN does not dismiss when function returns false", () => {
      const onDismiss = jest.fn();
      const root = document.createElement("div");
      document.body.appendChild(root);

      render(
        <div>
          <div data-ignore-region>Outside</div>
          <Modal
            root={root}
            open
            onDismiss={onDismiss}
            closeOnOutsidePress={() => false}
          >
            <div>Content</div>
          </Modal>
        </div>
      );

      fireEvent.mouseDown(document.body);
      expect(onDismiss).not.toHaveBeenCalled();
    });

    it("THEN does not dismiss when event hits ignored attribute region", () => {
      const onDismiss = jest.fn();
      const root = document.createElement("div");
      document.body.appendChild(root);

      const ignore = document.createElement("div");
      ignore.setAttribute("data-nimbus-outside-press-ignore", "true");
      document.body.appendChild(ignore);

      render(
        <Modal
          root={root}
          open
          onDismiss={onDismiss}
          closeOnOutsidePress={() => true}
        >
          <div>Content</div>
        </Modal>
      );

      fireEvent.mouseDown(ignore);
      expect(onDismiss).not.toHaveBeenCalled();
    });

    it("THEN dismisses when function allows and event is not ignored", () => {
      const onDismiss = jest.fn();
      const root = document.createElement("div");
      document.body.appendChild(root);

      render(
        <Modal
          root={root}
          open
          onDismiss={onDismiss}
          closeOnOutsidePress={() => true}
        >
          <div>Content</div>
        </Modal>
      );

      fireEvent.mouseDown(document.body);
      expect(onDismiss).toHaveBeenCalledWith(
        false,
        expect.any(Object),
        "outside-press"
      );
    });
  });
});

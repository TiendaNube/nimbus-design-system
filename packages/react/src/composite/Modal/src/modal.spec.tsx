import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { modal, ThemeProvider } from "@nimbus-ds/styles";
import { Tooltip } from "@nimbus-ds/tooltip";

import { Modal } from "./Modal";
import { type ModalProps } from "./modal.types";

const mockedOnDismiss = jest.fn();

const makeSut = (
  rest: Pick<
    ModalProps,
    | "children"
    | "padding"
    | "onDismiss"
    | "root"
    | "renderDismissButton"
    | "zIndex"
  >
) => render(<Modal {...rest} open data-testid="modal-element" />);

type ProviderSlots = { base?: React.ReactNode; dark?: React.ReactNode };

const renderProviders = ({ base, dark }: ProviderSlots) => (
  <>
    <ThemeProvider theme="base" data-testid="provider-base">
      {base}
    </ThemeProvider>
    <ThemeProvider theme="next-dark" data-testid="provider-dark">
      {dark}
    </ThemeProvider>
  </>
);

const namedModal = (
  name: string,
  {
    open = true,
    portalId,
    children
  }: Partial<Pick<ModalProps, "open" | "portalId" | "children">> = {}
) => (
  <Modal
    data-testid={`modal-${name}`}
    onDismiss={mockedOnDismiss}
    open={open}
    portalId={portalId}
  >
    {children ?? name}
  </Modal>
);

const getPortalWrapper = (content: HTMLElement) =>
  content.closest("[data-floating-ui-portal]")?.parentElement ?? null;

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

  describe("WHEN renderDismissButton controls the close button", () => {
    it("THEN renders the button by default when onDismiss is provided", () => {
      makeSut({ children: <div>content</div>, onDismiss: jest.fn() });
      expect(screen.getByTestId("dismiss-modal-button")).toBeDefined();
    });

    it("AND hides the button when renderDismissButton is false", () => {
      const onDismiss = jest.fn();
      makeSut({
        children: <div>content</div>,
        onDismiss,
        renderDismissButton: false,
      });
      expect(screen.queryByTestId("dismiss-modal-button")).toBeNull();
    });

    it("AND still dismisses via Escape when the button is hidden", () => {
      const onDismiss = jest.fn();
      makeSut({
        children: <div>content</div>,
        onDismiss,
        renderDismissButton: false,
      });
      fireEvent.keyDown(document.body, {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
      });
      expect(onDismiss).toHaveBeenCalled();
    });
  });

  describe("WHEN zIndex selects a stacking layer", () => {
    it("THEN applies the base containerZIndex class by default", () => {
      makeSut({ children: <div>content</div> });
      const modalElement = screen.getByTestId("modal-element");
      expect(modalElement.className).toContain(modal.classnames.container);
      expect(modalElement.className).toContain(
        modal.classnames.containerZIndex.base
      );
    });

    it("AND applies the top containerZIndex class when zIndex='top'", () => {
      makeSut({ children: <div>content</div>, zIndex: "top" });
      const modalElement = screen.getByTestId("modal-element");
      expect(modalElement.className).toContain(modal.classnames.container);
      expect(modalElement.className).toContain(
        modal.classnames.containerZIndex.top
      );
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

  describe("WHEN rendered inside ThemeProviders", () => {
    beforeEach(() => {
      document.body.innerHTML = "";
    });

    it("THEN content mounts in its own provider after another provider's modal mounted first", () => {
      const { rerender } = render(renderProviders({}));
      rerender(renderProviders({ dark: namedModal("dark") }));
      expect(screen.getByTestId("modal-dark")).toBeDefined();
      rerender(
        renderProviders({ dark: namedModal("dark"), base: namedModal("base") })
      );

      const wrapper = getPortalWrapper(screen.getByTestId("modal-base"));
      expect(wrapper?.id).toEqual("nimbus-modal-floating");
      expect(wrapper?.parentElement).toBe(screen.getByTestId("provider-base"));
    });

    it("AND content mounts in its own provider when the providers are used in reverse order", () => {
      const { rerender } = render(renderProviders({}));
      rerender(renderProviders({ base: namedModal("base") }));
      expect(screen.getByTestId("modal-base")).toBeDefined();
      rerender(
        renderProviders({ base: namedModal("base"), dark: namedModal("dark") })
      );

      const wrapper = getPortalWrapper(screen.getByTestId("modal-dark"));
      expect(wrapper?.id).toEqual("nimbus-modal-floating");
      expect(wrapper?.parentElement).toBe(screen.getByTestId("provider-dark"));
    });

    it("AND content without a provider mounts in a body wrapper after a provider's modal mounted first", () => {
      const { rerender } = render(renderProviders({}));
      rerender(renderProviders({ base: namedModal("base") }));
      expect(screen.getByTestId("modal-base")).toBeDefined();
      render(namedModal("plain"));

      const wrapper = getPortalWrapper(screen.getByTestId("modal-plain"));
      expect(wrapper?.id).toEqual("nimbus-modal-floating");
      expect(wrapper?.parentElement).toBe(document.body);
    });

    it("AND a custom portalId is created inside its own provider after another provider used it", () => {
      const { rerender } = render(renderProviders({}));
      rerender(
        renderProviders({
          dark: namedModal("dark", { open: true, portalId: "custom-modal" })
        })
      );
      expect(screen.getByTestId("modal-dark")).toBeDefined();
      rerender(
        renderProviders({
          dark: namedModal("dark", { open: true, portalId: "custom-modal" }),
          base: namedModal("base", { open: true, portalId: "custom-modal" })
        })
      );

      const wrapper = getPortalWrapper(screen.getByTestId("modal-base"));
      expect(wrapper?.id).toEqual("custom-modal");
      expect(wrapper?.parentElement).toBe(screen.getByTestId("provider-base"));
    });

    it("AND a tooltip inside the modal mounts in the modal's provider after another provider's tooltip mounted first", async () => {
      const user = userEvent.setup();
      const tooltipIn = (name: string) => (
        <Tooltip content={name} data-testid={`tooltip-${name}`}>
          <p data-testid={`anchor-${name}`}>{name}</p>
        </Tooltip>
      );
      const { rerender } = render(renderProviders({}));
      rerender(renderProviders({ dark: tooltipIn("dark") }));
      await user.hover(
        screen.getByTestId("anchor-dark").parentElement as HTMLElement
      );
      await screen.findByTestId("tooltip-dark");
      rerender(
        renderProviders({
          dark: tooltipIn("dark"),
          base: namedModal("base", {
            open: true,
            children: tooltipIn("in-modal")
          })
        })
      );
      await user.hover(
        screen.getByTestId("anchor-in-modal").parentElement as HTMLElement
      );

      const wrapper = getPortalWrapper(
        await screen.findByTestId("tooltip-in-modal")
      );
      expect(wrapper?.id).toEqual("nimbus-tooltip-floating");
      expect(wrapper?.parentElement).toBe(screen.getByTestId("provider-base"));
    });

    it("AND a closed modal creates no portal wrapper", () => {
      render(renderProviders({ base: namedModal("base", { open: false }) }));

      expect(document.getElementById("nimbus-modal-floating")).toBeNull();
    });
  });
});

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { modal, ThemeProvider } from "@nimbus-ds/styles";
import { Tooltip } from "@nimbus-ds/tooltip";
import { Popover } from "@nimbus-ds/popover";

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
});

/**
 * Stage 0 mounts the providers with every modal closed, stage 1 opens the
 * nested provider modal and stage 2 opens the origin modal afterwards.
 */
type Stage = 0 | 1 | 2;

const MODAL_HOST_ID = "nimbus-modal-floating";
const TOOLTIP_HOST_ID = "nimbus-tooltip-floating";
const POPOVER_HOST_ID = "nimbus-popover-floating";

const providerOf = (element: HTMLElement): string | null =>
  element.closest("[data-provider]")?.getAttribute("data-provider") ?? null;

const hostOf = (element: HTMLElement, id: string): HTMLElement | null =>
  element.closest<HTMLElement>(`[id="${id}"]`);

interface ScopedModalProps {
  name: string;
  open: boolean;
  portalId: string | undefined;
}

const ScopedModal: React.FC<ScopedModalProps> = ({ name, open, portalId }) => (
  <Modal open={open} portalId={portalId} data-testid={`modal-${name}`}>
    <div>{`body ${name}`}</div>
  </Modal>
);

const FloatingInside: React.FC<{ name: string; popoverOpen: boolean }> = ({
  name,
  popoverOpen,
}) => (
  <>
    <Tooltip content={`tip ${name}`} data-testid={`tooltip-${name}`}>
      <button type="button" data-testid={`tooltip-anchor-${name}`}>
        tip
      </button>
    </Tooltip>
    <Popover
      visible={popoverOpen}
      content={<p>{`pop ${name}`}</p>}
      data-testid={`popover-${name}`}
    >
      <button type="button">pop</button>
    </Popover>
  </>
);

describe("GIVEN <Modal /> displayed inside theme providers", () => {
  beforeEach(() => {
    // Hosts created by earlier tests live in document.body; start clean.
    document.body.innerHTML = "";
  });

  describe("WHEN it opens inside a dark theme provider or outside any provider", () => {
    it("THEN should render inside the dark provider with the default host (AC-008)", async () => {
      const tree = (open: boolean) => (
        <ThemeProvider theme="dark" data-provider="Q">
          <ScopedModal name="q" open={open} portalId={undefined} />
        </ThemeProvider>
      );
      const { rerender } = render(tree(false));
      rerender(tree(true));
      const element = await screen.findByTestId("modal-q");
      expect(providerOf(element)).toBe("Q");
      expect(hostOf(element, MODAL_HOST_ID)?.parentElement).toBe(
        document.querySelector('[data-provider="Q"]')
      );
    });

    it("THEN should render inside the provider using a custom portalId as the host id (AC-008)", async () => {
      const tree = (open: boolean) => (
        <ThemeProvider theme="dark" data-provider="Q">
          <ScopedModal name="q" open={open} portalId="custom" />
        </ThemeProvider>
      );
      const { rerender } = render(tree(false));
      rerender(tree(true));
      const element = await screen.findByTestId("modal-q");
      expect(providerOf(element)).toBe("Q");
      expect(hostOf(element, "custom")?.parentElement).toBe(
        document.querySelector('[data-provider="Q"]')
      );
      expect(document.getElementById(MODAL_HOST_ID)).toBeNull();
    });

    it("THEN should render in the document body without a provider (AC-008)", async () => {
      const { rerender } = render(
        <ScopedModal name="none" open={false} portalId={undefined} />
      );
      rerender(<ScopedModal name="none" open portalId={undefined} />);
      const element = await screen.findByTestId("modal-none");
      expect(providerOf(element)).toBeNull();
      expect(hostOf(element, MODAL_HOST_ID)?.parentElement).toBe(document.body);
    });
  });

  describe("WHEN another provider already hosts a modal with the same identifier", () => {
    const nestedBefore = (stage: Stage, portalId?: string) => (
      <ThemeProvider data-provider="P">
        <ThemeProvider theme="dark" data-provider="Q">
          <ScopedModal name="q" open={stage >= 1} portalId={portalId} />
        </ThemeProvider>
        <ScopedModal name="p" open={stage >= 2} portalId={portalId} />
      </ThemeProvider>
    );

    const nestedAfter = (stage: Stage, portalId?: string) => (
      <ThemeProvider data-provider="P">
        <ScopedModal name="p" open={stage >= 2} portalId={portalId} />
        <ThemeProvider theme="dark" data-provider="Q">
          <ScopedModal name="q" open={stage >= 1} portalId={portalId} />
        </ThemeProvider>
      </ThemeProvider>
    );

    const sibling = (stage: Stage, portalId?: string) => (
      <>
        <ThemeProvider theme="dark" data-provider="Q">
          <ScopedModal name="q" open={stage >= 1} portalId={portalId} />
        </ThemeProvider>
        <ThemeProvider data-provider="P">
          <ScopedModal name="p" open={stage >= 2} portalId={portalId} />
        </ThemeProvider>
      </>
    );

    it.each([
      ["nested provider before the origin", nestedBefore, undefined],
      ["nested provider after the origin", nestedAfter, undefined],
      ["sibling provider before the origin", sibling, undefined],
      ["nested provider and a custom portalId", nestedBefore, "custom"],
    ])(
      "THEN should open later in its own provider with a %s (AC-009)",
      async (_label, tree, portalId) => {
        const { rerender } = render(tree(0, portalId));
        rerender(tree(1, portalId));
        expect(providerOf(await screen.findByTestId("modal-q"))).toBe("Q");
        rerender(tree(2, portalId));
        expect(providerOf(await screen.findByTestId("modal-p"))).toBe("P");
      }
    );
  });

  describe("WHEN a Tooltip and a Popover are displayed inside a base Modal in the outer provider", () => {
    const tree = (pOpen: boolean, popoverOpen: boolean) => (
      <ThemeProvider data-provider="P">
        <ThemeProvider theme="dark" data-provider="Q">
          <FloatingInside name="q" popoverOpen />
        </ThemeProvider>
        <Modal open={pOpen} data-testid="modal-p">
          <FloatingInside name="p" popoverOpen={popoverOpen} />
        </Modal>
      </ThemeProvider>
    );

    it("THEN should render the Modal, its Tooltip and its Popover inside the outer provider (AC-010)", async () => {
      const user = userEvent.setup();
      const { rerender } = render(tree(false, false));
      await screen.findByTestId("popover-q");
      await user.hover(screen.getByTestId("tooltip-anchor-q"));
      expect(await screen.findByTestId("tooltip-q")).toBeDefined();

      rerender(tree(true, false));
      expect(providerOf(await screen.findByTestId("modal-p"))).toBe("P");

      await user.hover(screen.getByTestId("tooltip-anchor-p"));
      const tooltipContent = await screen.findByTestId("tooltip-p");
      expect(providerOf(tooltipContent)).toBe("P");
      expect(hostOf(tooltipContent, TOOLTIP_HOST_ID)?.parentElement).toBe(
        document.querySelector('[data-provider="P"]')
      );

      rerender(tree(true, true));
      const popoverContent = await screen.findByTestId("popover-p");
      expect(providerOf(popoverContent)).toBe("P");
      expect(hostOf(popoverContent, POPOVER_HOST_ID)?.parentElement).toBe(
        document.querySelector('[data-provider="P"]')
      );
    });

    it("THEN should keep the Popover and the Tooltip of the side area inside their own provider (AC-007, AC-012)", async () => {
      const user = userEvent.setup();
      const { rerender } = render(tree(false, false));
      await user.hover(screen.getByTestId("tooltip-anchor-q"));
      const tooltipQ = await screen.findByTestId("tooltip-q");
      const popoverQ = await screen.findByTestId("popover-q");
      rerender(tree(true, true));
      await screen.findByTestId("popover-p");
      expect(providerOf(tooltipQ)).toBe("Q");
      expect(providerOf(popoverQ)).toBe("Q");
      await waitFor(() => {
        expect(providerOf(screen.getByTestId("popover-p"))).toBe("P");
      });
    });
  });

  describe("WHEN it uses the root input", () => {
    it("THEN should keep rendering into the root and create no default host", () => {
      const root = document.createElement("div");
      document.body.appendChild(root);
      render(
        <ThemeProvider theme="dark" data-provider="Q">
          <Modal root={root} open data-testid="modal-root">
            <div>Scoped</div>
          </Modal>
        </ThemeProvider>
      );
      expect(root).toContainElement(screen.getByTestId("modal-root"));
      expect(document.getElementById(MODAL_HOST_ID)).toBeNull();
    });
  });
});

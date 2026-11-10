import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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

type LayoutKind =
  | "q-nested-before"
  | "q-nested-after"
  | "q-sibling-before"
  | "q-sibling-after";

const LAYOUT_KINDS: LayoutKind[] = [
  "q-nested-before",
  "q-nested-after",
  "q-sibling-before",
  "q-sibling-after",
];

/** Builds P and a dark Q in the given document order; `outer` belongs to P and `inner` to Q. */
const buildLayout = (
  kind: LayoutKind,
  inner: React.ReactNode,
  outer: React.ReactNode
): React.ReactElement => {
  const q = (
    <ThemeProvider theme="dark" data-provider="Q">
      {inner}
    </ThemeProvider>
  );
  switch (kind) {
    case "q-nested-before":
      return (
        <ThemeProvider data-provider="P">
          {q}
          {outer}
        </ThemeProvider>
      );
    case "q-nested-after":
      return (
        <ThemeProvider data-provider="P">
          {outer}
          {q}
        </ThemeProvider>
      );
    case "q-sibling-before":
      return (
        <>
          {q}
          <ThemeProvider data-provider="P">{outer}</ThemeProvider>
        </>
      );
    default:
      return (
        <>
          <ThemeProvider data-provider="P">{outer}</ThemeProvider>
          {q}
        </>
      );
  }
};

/** Mounts its children only after the button is pressed, so they mount after earlier floating content. */
const LateMount: React.FC<{ children: React.ReactNode; label: string }> = ({
  children,
  label,
}) => {
  const [mounted, setMounted] = React.useState(false);
  return (
    <>
      <button type="button" onClick={() => setMounted(true)}>
        {label}
      </button>
      {mounted && children}
    </>
  );
};

const PROVIDER_ATTRIBUTE = "data-provider";

const providerOf = (element: HTMLElement): string | null =>
  element
    .closest(`[${PROVIDER_ATTRIBUTE}]`)
    ?.getAttribute(PROVIDER_ATTRIBUTE) ?? null;

/** Resets body-level portal hosts left by earlier tests so each scenario starts from a clean document. */
const removeBodyPortalHosts = (): void => {
  document.querySelectorAll("body > [id]").forEach((host) => host.remove());
};

describe("GIVEN <Modal /> inside theme providers", () => {
  beforeEach(removeBodyPortalHosts);

  describe("WHEN opened inside a dark provider, with a portalId or outside any provider", () => {
    it("THEN should render inside its dark provider", () => {
      render(
        <ThemeProvider theme="dark" data-provider="Q">
          <Modal open data-testid="modal-element">
            <div>content</div>
          </Modal>
        </ThemeProvider>
      );
      expect(providerOf(screen.getByTestId("modal-element"))).toBe("Q");
    });

    it("THEN should be hosted by an element carrying the custom portalId inside its provider", () => {
      render(
        <ThemeProvider theme="dark" data-provider="Q">
          <Modal open portalId="custom" data-testid="modal-element">
            <div>content</div>
          </Modal>
        </ThemeProvider>
      );
      const modalElement = screen.getByTestId("modal-element");
      expect(providerOf(modalElement)).toBe("Q");
      expect(modalElement.closest("#custom")).not.toBeNull();
    });

    it("THEN should render outside every provider element when there is none", () => {
      render(
        <>
          <ThemeProvider data-provider="P">
            <p>unrelated</p>
          </ThemeProvider>
          <Modal open data-testid="modal-element">
            <div>content</div>
          </Modal>
        </>
      );
      const modalElement = screen.getByTestId("modal-element");
      expect(modalElement).toBeVisible();
      expect(providerOf(modalElement)).toBeNull();
      expect(modalElement.closest("#nimbus-modal-floating")).not.toBeNull();
    });
  });

  describe.each(LAYOUT_KINDS)(
    "WHEN Q already opened a Modal and a Modal mounts later in P (%s)",
    (kind) => {
      it.each([
        ["the default id", undefined],
        ["a custom portalId", "custom"],
      ])(
        "THEN should render the Modal with %s inside P",
        async (_, portalId) => {
          const user = userEvent.setup();
          render(
            buildLayout(
              kind,
              <LateMount label="mount-q">
                <Modal open portalId={portalId} data-testid="modal-q">
                  <div>content</div>
                </Modal>
              </LateMount>,
              <LateMount label="mount-p">
                <Modal open portalId={portalId} data-testid="modal-p">
                  <div>content</div>
                </Modal>
              </LateMount>
            )
          );
          await user.click(screen.getByText("mount-q"));
          expect(providerOf(screen.getByTestId("modal-q"))).toBe("Q");
          await user.click(screen.getByText("mount-p"));
          expect(providerOf(screen.getByTestId("modal-p"))).toBe("P");
        }
      );
    }
  );

  describe("WHEN a base Modal in P holds a Tooltip and Q already displayed a Tooltip", () => {
    it("THEN should place the Modal and its Tooltip inside P and none inside Q", async () => {
      const user = userEvent.setup();
      render(
        buildLayout(
          "q-nested-before",
          <Tooltip content="content-q">
            <p data-testid="anchor-q">q</p>
          </Tooltip>,
          <LateMount label="mount-late">
            <Modal open zIndex="base" data-testid="modal-element">
              <Tooltip content="content-modal">
                <p data-testid="anchor-modal">modal</p>
              </Tooltip>
            </Modal>
          </LateMount>
        )
      );
      await user.hover(screen.getByTestId("anchor-q"));
      expect(providerOf(await screen.findByText("content-q"))).toBe("Q");
      await user.click(screen.getByText("mount-late"));
      await user.hover(screen.getByTestId("anchor-modal"));
      expect(providerOf(screen.getByTestId("modal-element"))).toBe("P");
      expect(providerOf(await screen.findByText("content-modal"))).toBe("P");
    });
  });

  describe("WHEN a press happens inside a Popover opened from a Modal with onDismiss", () => {
    it.each([
      ["inside a provider", true],
      ["outside any provider", false],
    ])(
      "THEN should keep the same dismissal outcome %s",
      async (_, withProvider) => {
        const user = userEvent.setup();
        const onDismiss = jest.fn();
        const modalWithPopover = (
          <LateMount label="mount-late">
            <Modal open onDismiss={onDismiss}>
              <Popover content={<p>content-popover</p>}>
                <button type="button">open-popover</button>
              </Popover>
            </Modal>
          </LateMount>
        );
        render(
          withProvider ? (
            <ThemeProvider data-provider="P">{modalWithPopover}</ThemeProvider>
          ) : (
            modalWithPopover
          )
        );
        await user.click(screen.getByText("mount-late"));
        await user.click(screen.getByText("open-popover"));
        onDismiss.mockClear();
        fireEvent.mouseDown(await screen.findByText("content-popover"));
        expect(onDismiss).not.toHaveBeenCalled();
      }
    );
  });

  describe("WHEN root is provided inside a provider", () => {
    it("THEN should render inside root and create no portal host", () => {
      const hostCount = (): number =>
        document.querySelectorAll("#nimbus-modal-floating").length;
      const before = hostCount();
      const root = document.createElement("div");
      document.body.appendChild(root);
      render(
        <ThemeProvider data-provider="P">
          <Modal open root={root} data-testid="modal-element">
            <div>content</div>
          </Modal>
        </ThemeProvider>
      );
      expect(root.contains(screen.getByTestId("modal-element"))).toBe(true);
      expect(hostCount()).toBe(before);
      document.body.removeChild(root);
    });
  });
});

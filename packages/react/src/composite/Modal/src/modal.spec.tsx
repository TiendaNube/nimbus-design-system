import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { modal, ThemeProvider } from "@nimbus-ds/styles";
import { Tooltip } from "@nimbus-ds/tooltip";
import { Popover } from "@nimbus-ds/popover";

import { Modal } from "./Modal";
import { type ModalProps } from "./modal.types";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

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

type Layout = "nested-after-origin" | "nested-before-origin" | "sibling-before";
type Name = "inner" | "outer";

const PROVIDER_P = "provider-p";
const PROVIDER_Q = "provider-q";
const DEFAULT_WRAPPER_ID = "nimbus-modal-floating";

const makeModal = (name: Name, open: boolean, portalId?: string) => (
  <Modal open={open} portalId={portalId} data-testid={`${name}-modal`}>
    <div>{`${name} modal`}</div>
  </Modal>
);

/**
 * P (base) declares the "outer" Modal, Q (dark) is a themed side area that
 * declares the "inner" Modal. `layout` places Q relative to the outer Modal.
 * Each Modal is open only while its name is in `opened`, so the second one
 * opens after the first has already created its floating wrapper.
 */
const makeScene = (layout: Layout, opened: Name[], portalId?: string) => {
  const inner = (
    <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
      {makeModal("inner", opened.includes("inner"), portalId)}
    </ThemeProvider>
  );
  const outer = makeModal("outer", opened.includes("outer"), portalId);

  if (layout === "sibling-before") {
    return (
      <>
        {inner}
        <ThemeProvider theme="base" data-testid={PROVIDER_P}>
          {outer}
        </ThemeProvider>
      </>
    );
  }

  return (
    <ThemeProvider theme="base" data-testid={PROVIDER_P}>
      {layout === "nested-before-origin" && inner}
      {outer}
      {layout === "nested-after-origin" && inner}
    </ThemeProvider>
  );
};

describe("GIVEN <Modal /> inside theme providers", () => {
  beforeEach(() => {
    // Modals rendered outside any provider leave their identified wrapper in
    // the body after unmount; remove it so each scenario starts from a clean document.
    document
      .querySelectorAll(`#${DEFAULT_WRAPPER_ID}, #custom`)
      .forEach((element) => element.remove());
  });

  describe.each([
    ["the default identifier", undefined, DEFAULT_WRAPPER_ID],
    ["a portalId", "custom", "custom"],
  ])("AND the Modals use %s", (_name, portalId, hostId) => {
    describe("WHEN it is open inside a single theme provider", () => {
      const getProviderAndContainer = () => ({
        provider: screen.getByTestId(PROVIDER_Q),
        container: screen.getByTestId("inner-modal"),
      });

      const makeSingle = (open: boolean) => (
        <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
          {makeModal("inner", open, portalId)}
        </ThemeProvider>
      );

      it("THEN should render overlay and container inside the provider, hosted by the identifier, when opened after mount", () => {
        const { rerender } = render(makeSingle(false));
        rerender(makeSingle(true));
        const { provider, container } = getProviderAndContainer();
        expect(provider.contains(container)).toBe(true);
        expect(container.closest(`#${hostId}`)?.parentElement).toBe(provider);
      });

      it("THEN should render overlay and container inside the provider, hosted by the identifier, when open on first render", () => {
        render(makeSingle(true));
        const { provider, container } = getProviderAndContainer();
        expect(provider.contains(container)).toBe(true);
        expect(container.closest(`#${hostId}`)?.parentElement).toBe(provider);
      });
    });
  });

  describe("WHEN it is open outside any theme provider", () => {
    it("THEN should still be displayed, without a theme scope", () => {
      render(makeModal("outer", true, "custom"));
      const container = screen.getByTestId("outer-modal");
      expect(container.closest(`[data-testid="${PROVIDER_P}"]`)).toBeNull();
      expect(container.closest("#custom")).not.toBeNull();
    });
  });

  describe.each<Layout>([
    "nested-after-origin",
    "nested-before-origin",
    "sibling-before",
  ])("AND the dark provider Q is placed as %s", (layout) => {
    describe.each([
      ["the default identifier", undefined],
      ["a portalId", "custom"],
    ])("AND the Modals use %s", (_name, portalId) => {
      it("THEN the Modal of P opened after Q opened its own is inside P and not inside Q", () => {
        const { rerender } = render(makeScene(layout, [], portalId));
        const p = screen.getByTestId(PROVIDER_P);
        const q = screen.getByTestId(PROVIDER_Q);

        rerender(makeScene(layout, ["inner"], portalId));
        expect(q.contains(screen.getByTestId("inner-modal"))).toBe(true);

        rerender(makeScene(layout, ["inner", "outer"], portalId));
        const outerContainer = screen.getByTestId("outer-modal");
        expect(p.contains(outerContainer)).toBe(true);
        expect(q.contains(outerContainer)).toBe(false);
      });

      it("THEN the Modal of Q opened after P opened its own is inside Q", () => {
        const { rerender } = render(makeScene(layout, [], portalId));
        const p = screen.getByTestId(PROVIDER_P);
        const q = screen.getByTestId(PROVIDER_Q);

        rerender(makeScene(layout, ["outer"], portalId));
        expect(p.contains(screen.getByTestId("outer-modal"))).toBe(true);

        rerender(makeScene(layout, ["outer", "inner"], portalId));
        expect(q.contains(screen.getByTestId("inner-modal"))).toBe(true);
      });
    });
  });
});

describe("GIVEN a base-layer <Modal /> opened in P with a themed side area Q", () => {
  const makeApp = (modalOpen: boolean) => (
    <ThemeProvider theme="base" data-testid={PROVIDER_P}>
      <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
        <Tooltip content="side content" data-testid="side-tooltip">
          <p>side anchor</p>
        </Tooltip>
      </ThemeProvider>
      <Modal open={modalOpen} zIndex="base" data-testid="modal-element">
        <Tooltip content="modal tooltip content" data-testid="modal-tooltip">
          <p>modal tooltip anchor</p>
        </Tooltip>
        <Popover content={<p>popover body</p>} data-testid="modal-popover">
          <p>modal popover anchor</p>
        </Popover>
      </Modal>
    </ThemeProvider>
  );

  beforeEach(() => {
    document
      .querySelectorAll(
        "#nimbus-modal-floating, #nimbus-tooltip-floating, #nimbus-popover-floating"
      )
      .forEach((element) => element.remove());
  });

  it("THEN the Modal, its Tooltip and its Popover are inside P and not inside Q after Q displayed a Tooltip", async () => {
    const user = userEvent.setup();
    const { rerender } = render(makeApp(false));
    const p = screen.getByTestId(PROVIDER_P);
    const q = screen.getByTestId(PROVIDER_Q);

    await user.hover(screen.getByText("side anchor").closest("div") as Element);
    const sideContent = await waitFor(() => screen.getByTestId("side-tooltip"));
    expect(q.contains(sideContent)).toBe(true);

    rerender(makeApp(true));
    expect(p.contains(screen.getByTestId("modal-element"))).toBe(true);
    expect(q.contains(screen.getByTestId("modal-element"))).toBe(false);

    await user.hover(
      screen.getByText("modal tooltip anchor").closest("div") as Element
    );
    const modalTooltip = await waitFor(() =>
      screen.getByTestId("modal-tooltip")
    );
    expect(p.contains(modalTooltip)).toBe(true);
    expect(q.contains(modalTooltip)).toBe(false);

    await user.click(
      screen.getByText("modal popover anchor").closest("div") as Element
    );
    const modalPopover = await waitFor(() =>
      screen.getByTestId("modal-popover")
    );
    expect(p.contains(modalPopover)).toBe(true);
    expect(q.contains(modalPopover)).toBe(false);
  });
});

describe("GIVEN the floating host lifecycle of <Modal />", () => {
  const hosts = (id = DEFAULT_WRAPPER_ID) =>
    document.querySelectorAll(`#${id}`);

  beforeEach(() => {
    hosts().forEach((element) => element.remove());
    hosts("custom").forEach((element) => element.remove());
  });

  const makeTwo = (opened: Name[]) => (
    <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
      {makeModal("inner", opened.includes("inner"))}
      {makeModal("outer", opened.includes("outer"))}
    </ThemeProvider>
  );

  it("THEN should not create a host while it is closed", () => {
    render(makeScene("nested-after-origin", []));
    expect(hosts()).toHaveLength(0);
  });

  it("THEN should host content outside any provider as a direct child of the body", () => {
    render(makeModal("outer", true));
    expect(
      screen.getByTestId("outer-modal").closest(`#${DEFAULT_WRAPPER_ID}`)
        ?.parentElement
    ).toBe(document.body);
  });

  it("THEN two open Modals share one host per provider and closing one keeps the other", () => {
    const { rerender } = render(makeTwo(["inner", "outer"]));
    const q = screen.getByTestId(PROVIDER_Q);
    expect(q.querySelectorAll(`#${DEFAULT_WRAPPER_ID}`)).toHaveLength(1);

    rerender(makeTwo(["outer"]));
    expect(screen.queryByTestId("inner-modal")).toBeNull();
    expect(screen.getByTestId("outer-modal")).toBeTruthy();
    expect(q.querySelectorAll(`#${DEFAULT_WRAPPER_ID}`)).toHaveLength(1);
  });

  it("THEN should remove its owned host once closed or unmounted", () => {
    const { rerender } = render(makeTwo(["inner"]));
    expect(hosts()).toHaveLength(1);

    rerender(makeTwo([]));
    expect(hosts()).toHaveLength(0);

    rerender(makeTwo(["inner"]));
    expect(hosts()).toHaveLength(1);
    rerender(<ThemeProvider theme="dark" data-testid={PROVIDER_Q} />);
    expect(hosts()).toHaveLength(0);
  });

  it("THEN should reuse a host placed by the consumer inside the provider and never remove it", () => {
    const { rerender } = render(makeTwo([]));
    const q = screen.getByTestId(PROVIDER_Q);
    const own = document.createElement("div");
    own.id = DEFAULT_WRAPPER_ID;
    q.appendChild(own);

    rerender(makeTwo(["inner"]));
    expect(own.contains(screen.getByTestId("inner-modal"))).toBe(true);
    expect(hosts()).toHaveLength(1);

    rerender(makeTwo([]));
    expect(q.contains(own)).toBe(true);
  });

  it("THEN should display its content again inside an attached provider host after being closed and reopened", () => {
    const { rerender } = render(makeTwo(["inner"]));
    const q = screen.getByTestId(PROVIDER_Q);

    rerender(makeTwo([]));
    expect(screen.queryByTestId("inner-modal")).toBeNull();

    rerender(makeTwo(["inner"]));
    const content = screen.getByTestId("inner-modal");
    expect(content.closest(`#${DEFAULT_WRAPPER_ID}`)?.parentElement).toBe(q);
    expect(document.body.contains(content)).toBe(true);
    expect(hosts()).toHaveLength(1);
  });

  it("THEN should move its content to a host with the new identifier when portalId changes while open", () => {
    const makeWithPortalId = (portalId: string) => (
      <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
        {makeModal("inner", true, portalId)}
      </ThemeProvider>
    );
    const { rerender } = render(makeWithPortalId("custom"));
    const q = screen.getByTestId(PROVIDER_Q);
    expect(
      screen.getByTestId("inner-modal").closest("#custom")?.parentElement
    ).toBe(q);

    rerender(makeWithPortalId("other"));
    const content = screen.getByTestId("inner-modal");
    expect(content.closest("#other")?.parentElement).toBe(q);
    expect(document.body.contains(content)).toBe(true);
    expect(hosts("custom")).toHaveLength(0);
    hosts("other").forEach((element) => element.remove());
  });

  it("THEN should render its content once, in the provider host, under StrictMode", () => {
    render(<React.StrictMode>{makeTwo(["inner"])}</React.StrictMode>);
    expect(screen.getAllByTestId("inner-modal")).toHaveLength(1);
    expect(
      screen.getByTestId("inner-modal").closest(`#${DEFAULT_WRAPPER_ID}`)
        ?.parentElement
    ).toBe(screen.getByTestId(PROVIDER_Q));
  });

  it("THEN should keep the root path inside root without creating a host", () => {
    const root = document.createElement("div");
    document.body.appendChild(root);
    render(
      <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
        <Modal open root={root} data-testid="root-modal">
          <div>root modal</div>
        </Modal>
      </ThemeProvider>
    );
    expect(root.contains(screen.getByTestId("root-modal"))).toBe(true);
    expect(hosts()).toHaveLength(0);
    root.remove();
  });
});

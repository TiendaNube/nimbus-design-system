import React, { forwardRef, type AnchorHTMLAttributes } from "react";
import { render, screen, waitFor, within, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { breadcrumb, link } from "@nimbus-ds/styles";
import { Modal } from "@nimbus-ds/modal";
import { Sidebar } from "@nimbus-ds/sidebar";

import { Breadcrumb } from "./Breadcrumb";
import { type BreadcrumbItem, type BreadcrumbProps } from "./breadcrumb.types";
import { getCollapsedPath } from "./utils";

/**
 * The jest `@nimbus-ds/icon` mapper also matches `@nimbus-ds/icons`, so both resolve to the Icon package and icons not mocked in jest.setup are undefined.
 */
jest.mock("@nimbus-ds/icons", () => ({
  __esModule: true,
  ...jest.requireActual("@nimbus-ds/icons"),
  ChevronRightIcon: () => <svg />,
  CloseIcon: () => <svg />,
  EllipsisIcon: () => <svg />
}));

const TRIGGER = "TRIGGER";

const makeItems = (count: number): BreadcrumbItem[] =>
  Array.from({ length: count }, (_, index) => ({
    label: `Level ${index + 1}`,
    href: `#level-${index + 1}`
  }));

const pathItems: BreadcrumbItem[] = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Category", href: "#category" },
  { label: "Subcategory", href: "#subcategory" },
  { label: "Item" }
];

const makeSut = (props: Partial<BreadcrumbProps> = {}) =>
  render(<Breadcrumb items={pathItems} {...props} />);

const getLandmark = (name = "Breadcrumb") =>
  screen.getByRole("navigation", { name });

const getMainList = (name?: string) =>
  getLandmark(name).querySelector("ol") as HTMLOListElement;

const getVisiblePath = (name?: string) =>
  Array.from(getMainList(name).children).map((item) =>
    item.querySelector("button") ? TRIGGER : item.textContent
  );

const getTrigger = (name = "Show hidden levels") =>
  screen.getByRole("button", { name });

const queryPanel = (name = "Show hidden levels") =>
  screen.queryByRole("navigation", { name });

const getPanelLabels = (name?: string) =>
  within(queryPanel(name) as HTMLElement)
    .getAllByRole("listitem")
    .map((item) => item.textContent);

const settleInitialFocus = async (element: () => HTMLElement) => {
  await waitFor(() => expect(element()).toHaveFocus());
  await act(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 50);
    });
  });
};

const RouterLink = forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement>
>(({ children, ...props }, ref) => (
  <a data-router="true" {...props} ref={ref}>
    {children}
  </a>
));
RouterLink.displayName = "RouterLink";

describe("GIVEN <Breadcrumb />", () => {
  describe("WHEN rendered with an ordered path", () => {
    it("THEN AC-001 exposes a named landmark with an ordered list and hidden chevrons", () => {
      const { container } = makeSut({ items: pathItems.slice(0, 3) });
      const list = getMainList();
      expect(list.tagName).toBe("OL");
      expect(getVisiblePath()).toEqual(["Home", "Products", "Category"]);
      const separators = container.querySelectorAll(
        `.${breadcrumb.classnames.separator}`
      );
      expect(separators).toHaveLength(2);
      separators.forEach((separator) =>
        expect(separator).toHaveAttribute("aria-hidden", "true")
      );
    });

    it("THEN AC-001 uses the provided ariaLabel as landmark name", () => {
      makeSut({ ariaLabel: "Ruta" });
      expect(getLandmark("Ruta")).toBeDefined();
    });

    it("THEN AC-002 renders native anchors and never prevents the default click", async () => {
      const user = userEvent.setup();
      const onDocumentClick = jest.fn((event: MouseEvent) => event);
      document.addEventListener("click", onDocumentClick);
      makeSut({ items: pathItems.slice(0, 3) });
      const home = screen.getByRole("link", { name: "Home" });
      expect(home.tagName).toBe("A");
      expect(home).toHaveAttribute("href", "#home");
      await user.click(home);
      expect(onDocumentClick).toHaveBeenCalledTimes(1);
      expect(onDocumentClick.mock.results[0].value.defaultPrevented).toBe(
        false
      );
      document.removeEventListener("click", onDocumentClick);
    });

    it("THEN AC-003 renders visible and panel links through linkAs with Breadcrumb appearance", async () => {
      const user = userEvent.setup();
      makeSut({ linkAs: RouterLink });
      await user.click(getTrigger());
      const links = screen.getAllByRole("link");
      expect(links.map((item) => item.getAttribute("href"))).toEqual([
        "#home",
        "#products",
        "#category",
        "#subcategory"
      ]);
      links.forEach((item) => {
        expect(item.tagName).toBe("A");
        expect(item).toHaveAttribute("data-router", "true");
        expect(item).toHaveClass(link.classnames.appearance.neutral);
      });
    });

    it("THEN AC-004 renders the current level as non-focusable text with aria-current", () => {
      makeSut({
        items: [
          { label: "Home", href: "#home" },
          { label: "Item", href: "#item" }
        ]
      });
      expect(screen.queryByRole("link", { name: "Item" })).toBeNull();
      const current = screen.getByText("Item");
      expect(current.tagName).toBe("SPAN");
      expect(current).toHaveAttribute("aria-current", "page");
      expect(current).not.toHaveAttribute("href");
      expect(current).not.toHaveAttribute("tabindex");
    });
  });

  describe("WHEN the path length is compared to the limit", () => {
    it.each`
      limit | count
      ${4}  | ${3}
      ${4}  | ${4}
      ${3}  | ${3}
      ${10} | ${8}
    `(
      "THEN AC-005 limit $limit with $count items shows every level and no trigger",
      ({ limit, count }) => {
        const items = makeItems(count);
        render(<Breadcrumb items={items} maxVisible={limit} />);
        expect(getVisiblePath()).toEqual(items.map(({ label }) => label));
        expect(screen.queryByRole("button")).toBeNull();
      }
    );

    it.each`
      limit | count | visible                                       | hidden
      ${4}  | ${5}  | ${["Level 1", TRIGGER, "Level 4", "Level 5"]} | ${["Level 2", "Level 3"]}
      ${4}  | ${8}  | ${["Level 1", TRIGGER, "Level 7", "Level 8"]} | ${["Level 2", "Level 3", "Level 4", "Level 5", "Level 6"]}
      ${3}  | ${4}  | ${["Level 1", TRIGGER, "Level 3", "Level 4"]} | ${["Level 2"]}
    `(
      "THEN AC-005 limit $limit with $count items collapses into the panel",
      async ({ limit, count, visible, hidden }) => {
        const user = userEvent.setup();
        render(<Breadcrumb items={makeItems(count)} maxVisible={limit} />);
        expect(getVisiblePath()).toEqual(visible);
        await user.click(getTrigger());
        expect(getPanelLabels()).toEqual(hidden);
      }
    );

    it("THEN AC-005 the collapse util never duplicates or loses items", () => {
      const items = makeItems(8);
      const { visible, hidden } = getCollapsedPath(items, 4);
      const shown = visible.filter(
        (entry): entry is BreadcrumbItem => entry !== "trigger"
      );
      expect([shown[0], ...hidden, ...shown.slice(1)]).toEqual(items);
    });
  });

  describe("WHEN maxVisible is out of range", () => {
    it.each`
      maxVisible   | fourItems                                       | fiveItems
      ${1}         | ${["Level 1", TRIGGER, "Level 3", "Level 4"]}   | ${["Level 1", TRIGGER, "Level 4", "Level 5"]}
      ${2}         | ${["Level 1", TRIGGER, "Level 3", "Level 4"]}   | ${["Level 1", TRIGGER, "Level 4", "Level 5"]}
      ${2.5}       | ${["Level 1", "Level 2", "Level 3", "Level 4"]} | ${["Level 1", TRIGGER, "Level 4", "Level 5"]}
      ${NaN}       | ${["Level 1", "Level 2", "Level 3", "Level 4"]} | ${["Level 1", TRIGGER, "Level 4", "Level 5"]}
      ${Infinity}  | ${["Level 1", "Level 2", "Level 3", "Level 4"]} | ${["Level 1", TRIGGER, "Level 4", "Level 5"]}
      ${undefined} | ${["Level 1", "Level 2", "Level 3", "Level 4"]} | ${["Level 1", TRIGGER, "Level 4", "Level 5"]}
    `(
      "THEN AC-006 maxVisible $maxVisible is normalized",
      ({ maxVisible, fourItems, fiveItems }) => {
        const { rerender } = render(
          <Breadcrumb items={makeItems(4)} maxVisible={maxVisible} />
        );
        expect(getVisiblePath()).toEqual(fourItems);
        rerender(<Breadcrumb items={makeItems(5)} maxVisible={maxVisible} />);
        expect(getVisiblePath()).toEqual(fiveItems);
      }
    );
  });

  describe("WHEN items are empty or single", () => {
    it("THEN AC-007 renders nothing for an empty list", () => {
      const { container } = makeSut({ items: [] });
      expect(container).toBeEmptyDOMElement();
    });

    it("THEN AC-007 renders only the current level for a single item", () => {
      const { container } = makeSut({ items: [{ label: "Home", href: "#" }] });
      expect(getVisiblePath()).toEqual(["Home"]);
      expect(screen.getByText("Home")).toHaveAttribute("aria-current", "page");
      expect(screen.queryByRole("button")).toBeNull();
      expect(screen.queryByRole("link")).toBeNull();
      expect(
        container.querySelector(`.${breadcrumb.classnames.separator}`)
      ).toBeNull();
    });
  });

  describe("WHEN labels are long", () => {
    it("THEN AC-008 the list wraps and labels carry the word-breaking class", () => {
      makeSut({
        items: [
          { label: "A very long ancestor label that wraps", href: "#a" },
          { label: "Supercalifragilisticexpialidocious" }
        ]
      });
      expect(getMainList()).toHaveClass(breadcrumb.classnames.list);
      expect(
        screen.getByText("Supercalifragilisticexpialidocious")
      ).toHaveClass(breadcrumb.classnames.label);
      expect(
        screen.getByText("A very long ancestor label that wraps")
      ).toHaveClass(breadcrumb.classnames.label);
    });
  });

  describe("WHEN the path is collapsed", () => {
    it("THEN AC-009 hidden levels exist only while the panel is open, in a named navigation group", async () => {
      const user = userEvent.setup();
      makeSut();
      expect(queryPanel()).toBeNull();
      expect(screen.queryByText("Products")).toBeNull();
      expect(screen.queryByText("Category")).toBeNull();
      await user.click(getTrigger());
      const panel = queryPanel() as HTMLElement;
      expect(panel.querySelector("ol")).not.toBeNull();
      expect(getPanelLabels()).toEqual(["Products", "Category"]);
      expect(
        within(panel)
          .getAllByRole("link")
          .map((item) => item.getAttribute("href"))
      ).toEqual(["#products", "#category"]);
      expect(screen.queryByRole("listbox")).toBeNull();
      expect(screen.queryByRole("menu")).toBeNull();
      expect(panel.querySelector("[aria-selected]")).toBeNull();
    });

    it("THEN AC-009 the panel group takes a custom hiddenLevelsLabel", async () => {
      const user = userEvent.setup();
      makeSut({ hiddenLevelsLabel: "Ver niveles" });
      await user.click(getTrigger("Ver niveles"));
      expect(queryPanel("Ver niveles")).not.toBeNull();
    });

    it("THEN AC-010 the trigger is a native button with expanded state and panel reference", async () => {
      const user = userEvent.setup();
      makeSut();
      const trigger = getTrigger();
      expect(trigger.tagName).toBe("BUTTON");
      expect(trigger).toHaveAttribute("type", "button");
      expect(trigger).toHaveClass(breadcrumb.classnames.trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(trigger).not.toHaveAttribute("aria-controls");
      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");
      expect(trigger).toHaveAttribute(
        "aria-controls",
        (queryPanel() as HTMLElement).id
      );
    });

    it("THEN AC-011 click opens with focus on the first panel link and a second click closes", async () => {
      const user = userEvent.setup();
      makeSut();
      const trigger = getTrigger();
      await user.click(trigger);
      expect(screen.getByRole("link", { name: "Products" })).toHaveFocus();
      await user.click(trigger);
      expect(queryPanel()).toBeNull();
      expect(trigger).toHaveFocus();
    });

    it.each(["{Enter}", " "])(
      "THEN AC-011 key %s opens and toggles the panel",
      async (key) => {
        const user = userEvent.setup();
        makeSut();
        const trigger = getTrigger();
        trigger.focus();
        await user.keyboard(key);
        expect(screen.getByRole("link", { name: "Products" })).toHaveFocus();
        await user.tab({ shift: true });
        expect(trigger).toHaveFocus();
        expect(queryPanel()).not.toBeNull();
        await user.keyboard(key);
        expect(queryPanel()).toBeNull();
        expect(trigger).toHaveFocus();
      }
    );

    it("THEN AC-011 a panel without links keeps focus on the trigger", async () => {
      const user = userEvent.setup();
      makeSut({
        items: [
          { label: "Home", href: "#home" },
          { label: "Products" },
          { label: "Category" },
          { label: "Subcategory", href: "#subcategory" },
          { label: "Item" }
        ]
      });
      const trigger = getTrigger();
      await user.click(trigger);
      expect(queryPanel()).not.toBeNull();
      expect(trigger).toHaveFocus();
    });
  });

  describe("WHEN the user tabs through the path", () => {
    const renderWithControls = (props: Partial<BreadcrumbProps> = {}) =>
      render(
        <>
          <button type="button">Before</button>
          <Breadcrumb items={pathItems} {...props} />
          <button type="button">After</button>
        </>
      );

    const before = () => screen.getByRole("button", { name: "Before" });
    const after = () => screen.getByRole("button", { name: "After" });
    const byLink = (name: string) => () => screen.getByRole("link", { name });

    const expectSequence = async (
      user: ReturnType<typeof userEvent.setup>,
      sequence: Array<() => HTMLElement>,
      shift = false
    ) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const element of sequence) {
        // eslint-disable-next-line no-await-in-loop
        await user.tab({ shift });
        expect(element()).toHaveFocus();
      }
    };

    it("THEN AC-012 a closed collapsed path follows root, trigger, parent and back", async () => {
      const user = userEvent.setup();
      renderWithControls();
      before().focus();
      const forward = [
        byLink("Home"),
        () => getTrigger(),
        byLink("Subcategory")
      ];
      await expectSequence(user, [...forward, after]);
      await expectSequence(user, [...forward].reverse().concat(before), true);
      expect(queryPanel()).toBeNull();
    });

    it("THEN AC-012 an open panel inserts hidden links after the trigger and Shift+Tab returns to the trigger", async () => {
      const user = userEvent.setup();
      renderWithControls();
      await user.click(getTrigger());
      expect(byLink("Products")()).toHaveFocus();
      await user.tab({ shift: true });
      expect(getTrigger()).toHaveFocus();
      expect(queryPanel()).not.toBeNull();
      await expectSequence(user, [
        byLink("Products"),
        byLink("Category"),
        byLink("Subcategory"),
        after
      ]);
    });

    it("THEN AC-012 an uncollapsed path skips the current level and arrows do not move focus", async () => {
      const user = userEvent.setup();
      renderWithControls({ items: pathItems.slice(1) });
      before().focus();
      await expectSequence(user, [
        byLink("Products"),
        byLink("Category"),
        byLink("Subcategory"),
        after
      ]);
      byLink("Products")().focus();
      await user.keyboard("{ArrowRight}{ArrowDown}");
      expect(byLink("Products")()).toHaveFocus();
      await user.keyboard("{ArrowLeft}{ArrowUp}");
      expect(byLink("Products")()).toHaveFocus();
    });

    it("THEN AC-013 tabbing out of the group closes the panel without restoring focus", async () => {
      const user = userEvent.setup();
      renderWithControls();
      await user.click(getTrigger());
      await user.tab();
      expect(byLink("Category")()).toHaveFocus();
      await user.tab();
      expect(byLink("Subcategory")()).toHaveFocus();
      expect(queryPanel()).toBeNull();

      await user.click(getTrigger());
      await user.tab({ shift: true });
      expect(getTrigger()).toHaveFocus();
      await user.tab({ shift: true });
      expect(byLink("Home")()).toHaveFocus();
      expect(queryPanel()).toBeNull();
    });
  });

  describe("WHEN Escape is pressed inside an open Modal", () => {
    it("THEN AC-014 the panel closes with focus on the trigger and the Modal stays open", async () => {
      const user = userEvent.setup();
      const onDismiss = jest.fn();
      render(
        <Modal open onDismiss={onDismiss}>
          <Breadcrumb items={pathItems} />
        </Modal>
      );
      await settleInitialFocus(() =>
        screen.getByRole("link", { name: "Home" })
      );

      await user.click(getTrigger());
      getTrigger().focus();
      await user.keyboard("{Escape}");
      expect(queryPanel()).toBeNull();
      expect(getTrigger()).toHaveFocus();
      expect(onDismiss).not.toHaveBeenCalled();

      await user.click(getTrigger());
      expect(screen.getByRole("link", { name: "Products" })).toHaveFocus();
      await user.keyboard("{Escape}");
      expect(queryPanel()).toBeNull();
      expect(getTrigger()).toHaveFocus();
      expect(onDismiss).not.toHaveBeenCalled();

      await user.keyboard("{Escape}");
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });
  });

  describe("WHEN the user presses outside the open panel", () => {
    const renderWithOutside = () =>
      render(
        <>
          <Breadcrumb items={pathItems} />
          <div data-testid="outside">Outside area</div>
          <button type="button">Outside control</button>
        </>
      );

    it.each`
      focusOn
      ${"panel"}
      ${"trigger"}
    `(
      "THEN AC-015 with focus on the $focusOn it closes and routes focus by target",
      async ({ focusOn }) => {
        const user = userEvent.setup();
        renderWithOutside();
        const open = async () => {
          await user.click(getTrigger());
          if (focusOn === "trigger") getTrigger().focus();
        };

        await open();
        await user.click(screen.getByTestId("outside"));
        expect(queryPanel()).toBeNull();
        await waitFor(() => expect(getTrigger()).toHaveFocus());

        await open();
        const control = screen.getByRole("button", { name: "Outside control" });
        await user.click(control);
        expect(queryPanel()).toBeNull();
        expect(control).toHaveFocus();
      }
    );
  });

  describe("WHEN a panel link is activated", () => {
    it("THEN AC-016 plain click and Enter close the panel without moving focus to the trigger", async () => {
      const user = userEvent.setup();
      const onDocumentClick = jest.fn((event: MouseEvent) => event);
      document.addEventListener("click", onDocumentClick);
      makeSut();

      await user.click(getTrigger());
      await user.click(screen.getByRole("link", { name: "Category" }));
      expect(queryPanel()).toBeNull();
      expect(getTrigger()).not.toHaveFocus();

      await user.click(getTrigger());
      await user.keyboard("{Enter}");
      expect(queryPanel()).toBeNull();
      expect(getTrigger()).not.toHaveFocus();

      onDocumentClick.mock.results.forEach(({ value }) =>
        expect(value.defaultPrevented).toBe(false)
      );
      document.removeEventListener("click", onDocumentClick);
    });

    it.each(["{Control>}", "{Meta>}", "{Shift>}"])(
      "THEN AC-016 modifier %s click leaves the panel open and focus unchanged",
      async (modifier) => {
        const user = userEvent.setup();
        makeSut();
        await user.click(getTrigger());
        const first = screen.getByRole("link", { name: "Products" });
        await user.keyboard(modifier);
        await user.click(first);
        await user.keyboard(`{/${modifier.slice(1, -2)}}`);
        expect(queryPanel()).not.toBeNull();
        expect(first).toHaveFocus();
      }
    );

    it("THEN AC-016 middle click leaves the panel open and focus unchanged", async () => {
      const user = userEvent.setup();
      makeSut();
      await user.click(getTrigger());
      const first = screen.getByRole("link", { name: "Products" });
      await user.pointer({ keys: "[MouseMiddle]", target: first });
      expect(queryPanel()).not.toBeNull();
      expect(first).toHaveFocus();
    });
  });

  describe("WHEN an ancestor has no href", () => {
    it("THEN AC-017 a visible level without href is plain text skipped by Tab", async () => {
      const user = userEvent.setup();
      render(
        <>
          <Breadcrumb
            items={[
              { label: "Home", href: "#home" },
              { label: "Section" },
              { label: "Item" }
            ]}
          />
          <button type="button">After</button>
        </>
      );
      const section = screen.getByText("Section");
      expect(section.tagName).toBe("SPAN");
      expect(section).not.toHaveAttribute("aria-current");
      expect(screen.queryByRole("link", { name: "Section" })).toBeNull();
      await user.tab();
      expect(screen.getByRole("link", { name: "Home" })).toHaveFocus();
      await user.tab();
      expect(screen.getByRole("button", { name: "After" })).toHaveFocus();
    });

    it("THEN AC-017 a hidden level without href is plain text in the panel and skipped", async () => {
      const user = userEvent.setup();
      makeSut({
        items: [
          { label: "Home", href: "#home" },
          { label: "Products" },
          { label: "Category", href: "#category" },
          { label: "Subcategory", href: "#subcategory" },
          { label: "Item" }
        ]
      });
      await user.click(getTrigger());
      expect(getPanelLabels()).toEqual(["Products", "Category"]);
      const products = screen.getByText("Products");
      expect(products.tagName).toBe("SPAN");
      expect(products).not.toHaveAttribute("aria-current");
      expect(screen.getByRole("link", { name: "Category" })).toHaveFocus();
      await user.tab({ shift: true });
      expect(getTrigger()).toHaveFocus();
    });
  });

  describe("WHEN placed inside a Modal or a Sidebar", () => {
    const expectReachable = async () => {
      const user = userEvent.setup();
      await user.tab();
      expect(getTrigger()).toHaveFocus();
      await user.keyboard("{Enter}");
      const panelLinks = within(queryPanel() as HTMLElement).getAllByRole(
        "link"
      );
      expect(panelLinks[0]).toHaveFocus();
      await user.tab();
      expect(panelLinks[1]).toHaveFocus();
      await user.tab();
      expect(screen.getByRole("link", { name: "Subcategory" })).toHaveFocus();
      [...screen.getAllByRole("link"), getTrigger(), getLandmark()].forEach(
        (element) => expect(element.closest("[aria-hidden='true']")).toBeNull()
      );
    };

    it("THEN AC-018 links, trigger and panel links are reachable inside a Modal", async () => {
      render(
        <Modal open onDismiss={jest.fn()}>
          <Breadcrumb items={pathItems} />
        </Modal>
      );
      await settleInitialFocus(() =>
        screen.getByRole("link", { name: "Home" })
      );
      await expectReachable();
      expect(queryPanel()).toBeNull();
    });

    it("THEN AC-018 links, trigger and panel links are reachable inside a Sidebar", async () => {
      render(
        <Sidebar open onRemove={jest.fn()}>
          <Breadcrumb items={pathItems} />
        </Sidebar>
      );
      await settleInitialFocus(() =>
        screen.getByRole("link", { name: "Home" })
      );
      await expectReachable();
      expect(queryPanel()).toBeNull();
    });
  });

  describe("WHEN two instances are rendered", () => {
    it("THEN AC-019 pressing the second trigger closes the first panel and opens the second", async () => {
      const user = userEvent.setup();
      render(
        <>
          <Breadcrumb
            items={pathItems}
            ariaLabel="First"
            hiddenLevelsLabel="First hidden"
          />
          <Breadcrumb
            items={makeItems(5)}
            ariaLabel="Second"
            hiddenLevelsLabel="Second hidden"
          />
        </>
      );
      await user.click(getTrigger("First hidden"));
      expect(queryPanel("First hidden")).not.toBeNull();
      await user.click(getTrigger("Second hidden"));
      expect(queryPanel("First hidden")).toBeNull();
      expect(queryPanel("Second hidden")).not.toBeNull();
      expect(screen.getByRole("link", { name: "Level 2" })).toHaveFocus();
      expect(screen.getAllByRole("navigation")).toHaveLength(3);
    });
  });

  describe("WHEN items or maxVisible change while the panel is open", () => {
    it("THEN AC-020 with focus on a panel link and the trigger kept, focus moves to the trigger", async () => {
      const user = userEvent.setup();
      const { rerender } = render(<Breadcrumb items={pathItems} />);
      await user.click(getTrigger());
      expect(screen.getByRole("link", { name: "Products" })).toHaveFocus();
      rerender(<Breadcrumb items={makeItems(6)} />);
      expect(queryPanel()).toBeNull();
      expect(getTrigger()).toHaveFocus();
      expect(getVisiblePath()).toEqual([
        "Level 1",
        TRIGGER,
        "Level 5",
        "Level 6"
      ]);
    });

    it("THEN AC-020 with focus on the trigger and maxVisible changed, focus stays on the trigger", async () => {
      const user = userEvent.setup();
      const { rerender } = render(<Breadcrumb items={makeItems(6)} />);
      await user.click(getTrigger());
      getTrigger().focus();
      rerender(<Breadcrumb items={makeItems(6)} maxVisible={5} />);
      expect(queryPanel()).toBeNull();
      expect(getTrigger()).toHaveFocus();
      expect(getTrigger()).toHaveAttribute("aria-expanded", "false");
    });

    it.each`
      focusOn
      ${"panel"}
      ${"trigger"}
    `(
      "THEN AC-020 with focus on the $focusOn and the trigger removed, focus is not relocated",
      async ({ focusOn }) => {
        const user = userEvent.setup();
        const { rerender } = render(
          <>
            <Breadcrumb items={pathItems} />
            <button type="button">After</button>
          </>
        );
        await user.click(getTrigger());
        if (focusOn === "trigger") getTrigger().focus();
        rerender(
          <>
            <Breadcrumb items={pathItems} maxVisible={10} />
            <button type="button">After</button>
          </>
        );
        expect(queryPanel()).toBeNull();
        expect(
          screen.queryByRole("button", { name: "Show hidden levels" })
        ).toBeNull();
        expect(document.activeElement).toBe(document.body);
        expect(getVisiblePath()).toEqual([
          "Home",
          "Products",
          "Category",
          "Subcategory",
          "Item"
        ]);
      }
    );
  });

  describe("WHEN appearance and direction are inspected", () => {
    it("THEN AC-021 ancestors use the neutral Link without underline and the current level is bold text", () => {
      makeSut({ items: pathItems.slice(0, 3) });
      const home = screen.getByRole("link", { name: "Home" });
      expect(home).toHaveClass(link.classnames.appearance.neutral);
      expect(home).toHaveClass(link.sprinkle({ textDecoration: "none" }));
      const current = screen.getByText("Category");
      expect(current).not.toHaveClass(link.classnames.appearance.neutral);
      expect(current).toHaveAttribute("aria-current", "page");
    });

    it("THEN AC-022 separators carry the mirroring class under RTL", () => {
      const { container } = render(
        <div dir="rtl">
          <Breadcrumb items={pathItems.slice(0, 3)} />
        </div>
      );
      expect(getVisiblePath()).toEqual(["Home", "Products", "Category"]);
      const separators = container.querySelectorAll("[aria-hidden='true']");
      expect(separators).toHaveLength(2);
      separators.forEach((separator) =>
        expect(separator).toHaveClass(breadcrumb.classnames.separator)
      );
    });

    it("THEN AC-023 the collapsed path keeps list and item classes that allow shrinking", () => {
      makeSut();
      expect(getMainList()).toHaveClass(breadcrumb.classnames.list);
      Array.from(getMainList().children).forEach((item) =>
        expect(item).toHaveClass(breadcrumb.classnames.item)
      );
    });
  });
});

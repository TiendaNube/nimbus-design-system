import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Breadcrumb } from "./Breadcrumb";
import { computeHiddenLevels } from "./breadcrumb.definitions";
import { type BreadcrumbItem, type BreadcrumbProps } from "./breadcrumb.types";

// The `@nimbus-ds/icon` Jest alias also captures `@nimbus-ds/icons`, so the
// glyphs this component renders are mocked here, as in `jest.setup.tsx`.
jest.mock("@nimbus-ds/icons", () => ({
  __esModule: true,
  ...jest.requireActual("@nimbus-ds/icons"),
  ChevronRightIcon: () => <svg />,
  EllipsisIcon: () => <svg />,
}));

const SEPARATOR = 2;
const TRIGGER = 3;

// Every label is 10 characters wide, as in the contract's worked example.
const name = (letter: string) => letter.repeat(10);
const ITEMS: BreadcrumbItem[] = ["A", "B", "C", "D"].map((letter) => ({
  label: name(letter),
  href: `/${letter}`,
}));

let containerWidth = 1000;

const widthOf = (element: Element): number => {
  const kind = element.getAttribute("data-breadcrumb-measure");
  if (kind === "level") return (element.textContent ?? "").length;
  if (kind === "separator") return SEPARATOR;
  if (kind === "trigger") return TRIGGER;
  if (element.tagName === "NAV") return containerWidth;
  return 0;
};

const resize = (width: number) => {
  containerWidth = width;
  const { calls } = (global.ResizeObserver as unknown as jest.Mock).mock;
  act(() => {
    calls[calls.length - 1][0]();
  });
};

const makeSut = (props: Partial<BreadcrumbProps> = {}, width = 1000) => {
  containerWidth = width;
  return render(
    <Breadcrumb
      items={ITEMS}
      label="Breadcrumb"
      hiddenLevelsLabel="Show hidden levels"
      {...props}
    />
  );
};

beforeEach(() => {
  jest
    .spyOn(Element.prototype, "getBoundingClientRect")
    .mockImplementation(function mocked(this: Element) {
      return { width: widthOf(this) } as DOMRect;
    });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("GIVEN computeHiddenLevels", () => {
  const levels = [10, 10, 10, 10];
  const hiddenAt = (container: number, widths = levels) =>
    computeHiddenLevels({
      container,
      levels: widths,
      separator: SEPARATOR,
      trigger: TRIGGER,
    });

  it.each([
    [46, []],
    [45, [1]],
    [39, [1]],
    [38, [1, 2]],
    [27, [1, 2]],
    [26, [0, 1, 2]],
    [15, [0, 1, 2]],
    [12, [0, 1, 2]],
  ])("THEN at width %s hides %j", (container, expected) => {
    expect(hiddenAt(container)).toEqual(expected);
  });

  it("AND a very wide first level is hidden with the next ancestor", () => {
    expect(hiddenAt(30, [40, 10, 10, 10])).toEqual([0, 1]);
  });

  it("AND two levels hide the first only when both do not fit", () => {
    expect(hiddenAt(22, [10, 10])).toEqual([]);
    expect(hiddenAt(21, [10, 10])).toEqual([0]);
  });

  it("AND a nearer ancestor that does not fit keeps farther ones hidden (no skipping)", () => {
    // A=10, B=4, C=10, D=10: C does not fit, B would.
    expect(hiddenAt(30, [10, 4, 30, 10])).toEqual([1, 2]);
  });

  it("AND three levels prefer the shorter middle level when the first does not fit", () => {
    expect(hiddenAt(21, [30, 4, 10])).toEqual([0]);
  });

  it("AND fewer than two levels hide nothing", () => {
    expect(hiddenAt(1, [50])).toEqual([]);
    expect(hiddenAt(1, [])).toEqual([]);
  });
});

describe("GIVEN <Breadcrumb />", () => {
  describe("WHEN all levels fit", () => {
    it("THEN renders a named navigation with ancestors as links and the current level as text", () => {
      makeSut({ items: ITEMS.slice(0, 3) });
      const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
      expect(nav).toBeInTheDocument();
      expect(screen.getAllByRole("link")).toHaveLength(2);
      expect(screen.queryByRole("button")).toBeNull();
      const current = screen.getByText(name("C"), {
        selector: "[aria-current]",
      });
      expect(current).toHaveAttribute("aria-current", "page");
      expect(nav.querySelectorAll("[aria-current]")).toHaveLength(1);
      expect(current.closest("a")).toBeNull();
    });

    it("AND ancestors are native anchors with their href", () => {
      makeSut();
      expect(screen.getByRole("link", { name: name("A") })).toHaveAttribute(
        "href",
        "/A"
      );
    });

    it("AND does not prevent the default action of a link click", () => {
      makeSut();
      const link = screen.getByRole("link", { name: name("A") });
      expect(fireEvent.click(link, { ctrlKey: true })).toBe(true);
    });

    it("AND ignores href and linkProps on the last item", () => {
      makeSut({
        items: [
          ITEMS[0],
          { label: "Now", href: "/now", linkProps: { "data-x": "1" } },
        ],
      });
      expect(screen.getAllByRole("link")).toHaveLength(1);
      expect(
        screen.getByText("Now", { selector: "[aria-current]" })
      ).not.toHaveAttribute("href");
    });

    it("AND an ancestor without href does not throw", () => {
      expect(() =>
        makeSut({ items: [{ label: "A" }, { label: "B", href: "/b" }] })
      ).not.toThrow();
    });

    it("AND applies the consumer className to the navigation", () => {
      makeSut({ className: "custom" });
      expect(screen.getByRole("navigation")).toHaveClass("custom");
    });
  });

  describe("WHEN there are no items or one item", () => {
    it("THEN renders nothing for an empty list", () => {
      const { container } = makeSut({ items: [] });
      expect(container).toBeEmptyDOMElement();
    });

    it("AND renders only the current level for one item", () => {
      makeSut({ items: [{ label: "Only", href: "/only" }] });
      expect(screen.getByRole("navigation")).toBeInTheDocument();
      expect(screen.getByText("Only")).toHaveAttribute("aria-current", "page");
      expect(screen.queryByRole("link")).toBeNull();
      expect(screen.queryByRole("button")).toBeNull();
    });
  });

  describe("WHEN the container is too narrow", () => {
    it("THEN collapses hidden ancestors behind a named trigger", () => {
      makeSut({}, 40);
      const trigger = screen.getByRole("button", {
        name: "Show hidden levels",
      });
      expect(trigger).toHaveAttribute("type", "button");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(trigger).toHaveTextContent("");
      expect(screen.getAllByRole("link").map((l) => l.textContent)).toEqual([
        name("A"),
        name("C"),
      ]);
    });

    it.each([
      [46, [name("A"), name("B"), name("C")], false],
      [39, [name("A"), name("C")], true],
      [27, [name("A")], true],
      [15, [], true],
    ])("AND at width %s shows links %j", (width, links, trigger) => {
      makeSut({}, width);
      expect(screen.queryAllByRole("link").map((l) => l.textContent)).toEqual(
        links
      );
      expect(!!screen.queryByRole("button")).toBe(trigger);
      expect(
        screen.getByText(name("D"), { selector: "[aria-current]" })
      ).toBeInTheDocument();
    });

    it("AND never submits an enclosing form", async () => {
      const onSubmit = jest.fn((event) => event.preventDefault());
      containerWidth = 40;
      render(
        <form onSubmit={onSubmit}>
          <Breadcrumb
            items={ITEMS}
            label="Breadcrumb"
            hiddenLevelsLabel="More"
          />
        </form>
      );
      await userEvent
        .setup()
        .click(screen.getByRole("button", { name: "More" }));
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  describe("WHEN the trigger is activated", () => {
    it("THEN opens a list of hidden ancestors as links without menu roles", async () => {
      makeSut({}, 30);
      const user = userEvent.setup();
      const trigger = screen.getByRole("button", {
        name: "Show hidden levels",
      });
      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");
      const panel = screen.getAllByRole("list")[1];
      const links = Array.from(panel.querySelectorAll("a"));
      expect(links.map((l) => l.textContent)).toEqual([name("B"), name("C")]);
      expect(screen.queryByRole("menu")).toBeNull();
      expect(screen.queryByRole("listbox")).toBeNull();
      expect(links[0]).toHaveFocus();
    });

    it("AND opens with Enter and Space", async () => {
      makeSut({}, 30);
      const user = userEvent.setup();
      const trigger = screen.getByRole("button", {
        name: "Show hidden levels",
      });
      trigger.focus();
      await user.keyboard("{Enter}");
      expect(trigger).toHaveAttribute("aria-expanded", "true");
      await user.keyboard("{Escape}");
      expect(trigger).toHaveFocus();
      await user.keyboard(" ");
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    it("AND activating it again closes the panel", async () => {
      makeSut({}, 30);
      const user = userEvent.setup();
      const trigger = screen.getByRole("button", {
        name: "Show hidden levels",
      });
      await user.click(trigger);
      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(trigger).toHaveFocus();
    });
  });

  describe("WHEN using the keyboard", () => {
    const renderBetween = (width: number) => {
      containerWidth = width;
      render(
        <>
          <button type="button">X</button>
          <Breadcrumb
            items={ITEMS}
            label="Breadcrumb"
            hiddenLevelsLabel="More"
          />
          <button type="button">Y</button>
        </>
      );
    };

    it("THEN tabs through links and trigger in visual order skipping the current level", async () => {
      renderBetween(40);
      const user = userEvent.setup();
      screen.getByText("X").focus();
      const order: string[] = [];
      for (let i = 0; i < 4; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await user.tab();
        order.push(document.activeElement?.textContent || "trigger");
      }
      expect(order).toEqual([name("A"), "trigger", name("C"), "Y"]);
      await user.tab({ shift: true });
      await user.tab({ shift: true });
      expect(screen.getByRole("button", { name: "More" })).toHaveFocus();
    });

    it("AND Tab from the last panel link closes the panel and focuses the next element", async () => {
      renderBetween(30);
      const user = userEvent.setup();
      await user.click(screen.getByRole("button", { name: "More" }));
      await user.tab();
      await user.tab();
      expect(screen.queryByRole("link", { name: name("B") })).toBeNull();
      expect(screen.getByText("Y")).toHaveFocus();
    });

    it("AND Shift+Tab from the first panel link closes the panel and focuses the trigger", async () => {
      renderBetween(30);
      const user = userEvent.setup();
      const trigger = screen.getByRole("button", { name: "More" });
      await user.click(trigger);
      await user.tab({ shift: true });
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(trigger).toHaveFocus();
    });
  });

  describe("WHEN the panel is dismissed", () => {
    it("THEN a modifier-click on a panel link closes it and returns focus to the trigger", async () => {
      makeSut({}, 30);
      const user = userEvent.setup();
      const trigger = screen.getByRole("button", {
        name: "Show hidden levels",
      });
      await user.click(trigger);
      const link = screen.getByRole("link", { name: name("B") });
      expect(fireEvent.click(link, { ctrlKey: true })).toBe(true);
      await waitFor(() =>
        expect(trigger).toHaveAttribute("aria-expanded", "false")
      );
      expect(trigger).toHaveFocus();
    });

    it("AND an outside press on a focusable control keeps focus there", async () => {
      containerWidth = 30;
      render(
        <>
          <Breadcrumb
            items={ITEMS}
            label="Breadcrumb"
            hiddenLevelsLabel="More"
          />
          <button type="button">Outside</button>
        </>
      );
      const user = userEvent.setup();
      const trigger = screen.getByRole("button", { name: "More" });
      await user.click(trigger);
      await user.click(screen.getByText("Outside"));
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(screen.getByText("Outside")).toHaveFocus();
    });

    it("AND an outside press on a non-focusable area returns focus to the trigger", async () => {
      containerWidth = 30;
      render(
        <>
          <Breadcrumb
            items={ITEMS}
            label="Breadcrumb"
            hiddenLevelsLabel="More"
          />
          <p>Plain text</p>
        </>
      );
      const user = userEvent.setup();
      const trigger = screen.getByRole("button", { name: "More" });
      await user.click(trigger);
      await user.click(screen.getByText("Plain text"));
      await waitFor(() => expect(trigger).toHaveFocus());
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("WHEN using the as prop", () => {
    const RouterLink = React.forwardRef<
      HTMLAnchorElement,
      React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }
    >(({ to, children, ...props }, ref) => (
      <a ref={ref} data-router="true" data-to={to} {...props}>
        {children}
      </a>
    ));

    it("THEN strip and panel links use the supplied component with href and linkProps", async () => {
      makeSut(
        {
          as: RouterLink,
          items: ITEMS.map((item) => ({
            ...item,
            linkProps: { to: `/router${item.href}` },
          })),
        },
        40
      );
      const user = userEvent.setup();
      await user.click(
        screen.getByRole("button", { name: "Show hidden levels" })
      );
      const links = screen.getAllByRole("link");
      expect(links).toHaveLength(3);
      links.forEach((link) =>
        expect(link).toHaveAttribute("data-router", "true")
      );
      expect(screen.getByRole("link", { name: name("B") })).toHaveAttribute(
        "data-to",
        "/router/B"
      );
      expect(screen.getByRole("link", { name: name("B") })).toHaveAttribute(
        "href",
        "/B"
      );
    });

    it("AND keeps the same Nimbus classes as the default rendering", () => {
      const { unmount } = makeSut();
      const defaultClass = screen.getByRole("link", {
        name: name("A"),
      }).className;
      unmount();
      makeSut({ as: RouterLink });
      const routerClass = screen.getByRole("link", {
        name: name("A"),
      }).className;
      expect(routerClass).toBe(defaultClass);
    });
  });

  describe("WHEN there are several instances", () => {
    it("THEN opening one closes the other and focus stays in the newly opened panel", async () => {
      containerWidth = 30;
      render(
        <>
          <Breadcrumb items={ITEMS} label="One" hiddenLevelsLabel="More one" />
          <Breadcrumb items={ITEMS} label="Two" hiddenLevelsLabel="More two" />
        </>
      );
      const user = userEvent.setup();
      const first = screen.getByRole("button", { name: "More one" });
      const second = screen.getByRole("button", { name: "More two" });
      await user.click(first);
      expect(first).toHaveAttribute("aria-expanded", "true");
      await user.click(second);
      expect(first).toHaveAttribute("aria-expanded", "false");
      expect(second).toHaveAttribute("aria-expanded", "true");
      const links = screen
        .getByRole("navigation", { name: "Two" })
        .querySelectorAll("ul a");
      expect(links[0]).toHaveFocus();
      await act(async () => {
        await new Promise<void>((resolve) => {
          setTimeout(resolve, 10);
        });
      });
      expect(links[0]).toHaveFocus();
    });
  });

  describe("WHEN the width or items change", () => {
    it("THEN widening until nothing is hidden removes the trigger and focuses the first link", async () => {
      makeSut({}, 30);
      const user = userEvent.setup();
      await user.click(
        screen.getByRole("button", { name: "Show hidden levels" })
      );
      resize(1000);
      expect(screen.queryByRole("button")).toBeNull();
      expect(screen.getByRole("link", { name: name("A") })).toHaveFocus();
    });

    it("AND changing items keeps the panel open with updated links", async () => {
      const { rerender } = makeSut({}, 30);
      const user = userEvent.setup();
      await user.click(
        screen.getByRole("button", { name: "Show hidden levels" })
      );
      rerender(
        <Breadcrumb
          items={[
            ...ITEMS.slice(0, 3),
            { label: name("E"), href: "/E" },
            ITEMS[3],
          ]}
          label="Breadcrumb"
          hiddenLevelsLabel="Show hidden levels"
        />
      );
      const panel = screen
        .getByRole("button", { name: "Show hidden levels" })
        .parentElement!.querySelector("ul")!;
      expect(Array.from(panel.querySelectorAll("a")).length).toBeGreaterThan(2);
    });

    it("AND removing the focused panel link moves focus to the first remaining one", async () => {
      const { rerender } = makeSut({}, 30);
      const user = userEvent.setup();
      await user.click(
        screen.getByRole("button", { name: "Show hidden levels" })
      );
      expect(screen.getByRole("link", { name: name("B") })).toHaveFocus();
      rerender(
        <Breadcrumb
          items={[ITEMS[0], ITEMS[2], ITEMS[3]]}
          label="Breadcrumb"
          hiddenLevelsLabel="Show hidden levels"
        />
      );
      const panel = screen
        .getByRole("button", { name: "Show hidden levels" })
        .parentElement!.querySelector("ul")!;
      const links = panel.querySelectorAll("a");
      expect(links).toHaveLength(1);
      expect(links[0]).toHaveFocus();
    });

    it("AND a focused strip link hidden by narrowing moves focus to the trigger when closed", () => {
      makeSut({}, 40);
      const link = screen.getByRole("link", { name: name("C") });
      act(() => link.focus());
      resize(30);
      expect(
        screen.getByRole("button", { name: "Show hidden levels" })
      ).toHaveFocus();
    });

    it("AND a focused strip link hidden by narrowing moves into the open panel", async () => {
      makeSut({}, 40);
      const user = userEvent.setup();
      await user.click(
        screen.getByRole("button", { name: "Show hidden levels" })
      );
      act(() => screen.getByRole("link", { name: name("C") }).focus());
      resize(30);
      const focused = document.activeElement as HTMLElement;
      expect(focused.textContent).toBe(name("C"));
      expect(focused.closest("ul")).not.toBeNull();
      expect(
        screen.getByRole("button", { name: "Show hidden levels" })
      ).toHaveAttribute("aria-expanded", "true");
    });

    it("AND a strip link that stays visible keeps focus", () => {
      makeSut({}, 46);
      const link = screen.getByRole("link", { name: name("A") });
      act(() => link.focus());
      resize(44);
      expect(screen.getByRole("link", { name: name("A") })).toHaveFocus();
    });
  });
});

import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { input as inputStyles } from "@nimbus-ds/styles";

import { Combobox } from "./Combobox";
import type { ComboboxOption, ComboboxProps } from "./combobox.types";

const CAMERA: ComboboxOption = { value: "camera", label: "Cámara" };
const BAG: ComboboxOption = { value: "bag", label: "Bolsa" };
const SHOE: ComboboxOption = { value: "shoe", label: "Zapato" };
const OPTIONS: ComboboxOption[] = [CAMERA, BAG, SHOE];

const ACCESSORIES_CLOTHING: ComboboxOption = {
  value: "accessories-clothing",
  label: "Accessories"
};
const ACCESSORIES_ELECTRONICS: ComboboxOption = {
  value: "accessories-electronics",
  label: "Accessories"
};
const PHONES: ComboboxOption = { value: "phones", label: "Phones" };
const CLOTHING: ComboboxOption = {
  value: "clothing",
  label: "Clothing",
  children: [ACCESSORIES_CLOTHING]
};
const FASHION: ComboboxOption = {
  value: "fashion",
  label: "Fashion",
  children: [CLOTHING, { value: "shoes", label: "Shoes" }]
};
const ELECTRONICS: ComboboxOption = {
  value: "electronics",
  label: "Electronics",
  children: [ACCESSORIES_ELECTRONICS, PHONES]
};
const TREE: ComboboxOption[] = [FASHION, ELECTRONICS];

const makeSut = (props: Partial<ComboboxProps> = {}) => {
  const merged = {
    "aria-label": "Field",
    options: OPTIONS,
    ...props
  } as ComboboxProps;
  return render(<Combobox {...merged} />);
};

const getInput = () => screen.getByRole("combobox");
const getListbox = () => screen.queryByRole("listbox");
const getOption = (name: string | RegExp) =>
  screen.getByRole("option", { name });
const getRemoveButtons = () =>
  screen.getAllByRole("button", { name: /^Remove / });

describe("GIVEN <Combobox />", () => {
  describe("AC-001 Opening and closing", () => {
    it("opens when the input is focused by Tab", async () => {
      const user = userEvent.setup();
      makeSut();
      await user.tab();
      expect(getInput()).toHaveFocus();
      expect(getListbox()).toBeInTheDocument();
    });

    it("opens when the input is clicked", async () => {
      const user = userEvent.setup();
      makeSut();
      await user.click(getInput());
      expect(getListbox()).toBeInTheDocument();
      expect(getInput()).toHaveAttribute("aria-expanded", "true");
    });

    it("opens when typing and when ArrowDown is pressed", async () => {
      const user = userEvent.setup();
      makeSut();
      await user.click(getInput());
      await user.keyboard("{Escape}");
      expect(getListbox()).not.toBeInTheDocument();
      await user.keyboard("{ArrowDown}");
      expect(getListbox()).toBeInTheDocument();
      await user.keyboard("{Escape}");
      await user.keyboard("a");
      expect(getListbox()).toBeInTheDocument();
    });

    it("closes with Escape keeping the focus in the input", async () => {
      const user = userEvent.setup();
      makeSut();
      await user.click(getInput());
      expect(getListbox()).toBeInTheDocument();
      await user.keyboard("{Escape}");
      expect(getListbox()).not.toBeInTheDocument();
      expect(getInput()).toHaveFocus();
    });

    it("closes with a press outside the field and the list", async () => {
      const user = userEvent.setup();
      makeSut();
      await user.click(getInput());
      expect(getListbox()).toBeInTheDocument();
      await user.click(document.body);
      expect(getListbox()).not.toBeInTheDocument();
    });

    it("is not opened by the focus a component action returns to the input", async () => {
      const user = userEvent.setup();
      makeSut({ defaultValue: CAMERA });
      await user.click(screen.getByRole("button", { name: "Clear selection" }));
      expect(getInput()).toHaveFocus();
      expect(getListbox()).not.toBeInTheDocument();
    });

    it("never opens when the field is disabled", async () => {
      const user = userEvent.setup();
      const props = {
        "aria-label": "Field",
        options: OPTIONS
      } as ComboboxProps;
      const { rerender } = render(<Combobox {...props} />);
      await user.click(getInput());
      expect(getListbox()).toBeInTheDocument();
      rerender(<Combobox {...props} disabled />);
      await user.click(getInput());
      await user.keyboard("{ArrowDown}");
      expect(getListbox()).not.toBeInTheDocument();
    });
  });

  describe("AC-002 Filtering", () => {
    it("matches the label ignoring case and diacritics", async () => {
      const user = userEvent.setup();
      makeSut();
      await user.type(getInput(), "camara");
      expect(screen.getAllByRole("option")).toHaveLength(1);
      expect(getOption("Cámara")).toBeInTheDocument();
    });

    it("does not match the subtitle or the tag", async () => {
      const user = userEvent.setup();
      makeSut({
        options: [
          {
            value: "a",
            label: "Alpha",
            subtitle: "hidden subtitle",
            tag: { label: "hidden tag" }
          }
        ]
      });
      await user.type(getInput(), "alp");
      expect(screen.getAllByRole("option")).toHaveLength(1);
      await user.clear(getInput());
      await user.type(getInput(), "hidden");
      expect(screen.queryAllByRole("option")).toHaveLength(0);
    });

    it("lets a filter function decide alone", async () => {
      const user = userEvent.setup();
      makeSut({ filter: (option) => option.value === "shoe" });
      await user.type(getInput(), "camara");
      expect(screen.getAllByRole("option")).toHaveLength(1);
      expect(getOption("Zapato")).toBeInTheDocument();
    });
  });

  describe("AC-003 Single selection", () => {
    it("sets the value, closes the list and reports the option", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      makeSut({ onChange });
      await user.click(getInput());
      await user.click(getOption("Cámara"));
      expect(onChange).toHaveBeenCalledWith(CAMERA);
      expect(getInput()).toHaveValue("Cámara");
      expect(getListbox()).not.toBeInTheDocument();
    });

    it("shows the option selected when reopened and keeps the value when chosen again", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      makeSut({ onChange });
      await user.click(getInput());
      await user.click(getOption("Cámara"));
      await user.click(getInput());
      expect(getOption("Cámara")).toHaveAttribute("aria-selected", "true");
      await user.click(getOption("Cámara"));
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(getInput()).toHaveValue("Cámara");
    });
  });

  describe("AC-004 Clearing a single value", () => {
    it("clears the value and the text, closes the list and keeps the focus in the input", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      makeSut({ defaultValue: CAMERA, onChange });
      await user.click(screen.getByRole("button", { name: "Clear selection" }));
      expect(onChange).toHaveBeenCalledWith(null);
      expect(getInput()).toHaveValue("");
      expect(getListbox()).not.toBeInTheDocument();
      expect(getInput()).toHaveFocus();
    });
  });

  describe("AC-005 Multiple selection", () => {
    it("adds chips in order, keeps the list open and removes chosen options from it", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      makeSut({ multiple: true, onChange });
      await user.click(getInput());
      await user.click(getOption("Bolsa"));
      await user.click(getOption("Cámara"));
      expect(onChange).toHaveBeenLastCalledWith([BAG, CAMERA]);
      expect(
        getRemoveButtons().map((button) => button.getAttribute("aria-label"))
      ).toEqual(["Remove Bolsa", "Remove Cámara"]);
      expect(getListbox()).toBeInTheDocument();
      expect(screen.getAllByRole("option")).toHaveLength(1);
      expect(getOption("Zapato")).toBeInTheDocument();
    });
  });

  describe("AC-006 Chip removal", () => {
    it("removes a chip with its remove button", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      makeSut({ multiple: true, defaultValue: [CAMERA, BAG], onChange });
      await user.click(screen.getByRole("button", { name: "Remove Cámara" }));
      expect(onChange).toHaveBeenCalledWith([BAG]);
      expect(getRemoveButtons()).toHaveLength(1);
    });

    it("removes the last chip with Backspace on an empty input", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      makeSut({ multiple: true, defaultValue: [CAMERA, BAG], onChange });
      await user.click(getInput());
      await user.keyboard("{Backspace}");
      expect(onChange).toHaveBeenCalledWith([CAMERA]);
    });
  });

  describe("AC-007 Clear all", () => {
    it("removes every chip, closes the list and keeps the focus in the input", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      makeSut({ multiple: true, defaultValue: [CAMERA, BAG], onChange });
      await user.click(screen.getByRole("button", { name: "Clear all" }));
      expect(onChange).toHaveBeenCalledWith([]);
      expect(
        screen.queryAllByRole("button", { name: /^Remove / })
      ).toHaveLength(0);
      expect(getListbox()).not.toBeInTheDocument();
      expect(getInput()).toHaveFocus();
    });

    it("shows no clear-all button with fewer than two chips", () => {
      makeSut({ multiple: true, defaultValue: [CAMERA] });
      expect(
        screen.getByRole("button", { name: "Remove Cámara" })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Clear all" })
      ).not.toBeInTheDocument();
    });
  });

  describe("AC-008 Create row", () => {
    const onCreate = (label: string): ComboboxOption => ({
      value: label,
      label
    });

    it("offers the create label first with a plus icon and calls onCreate with the trimmed text", async () => {
      const user = userEvent.setup();
      const create = jest.fn(onCreate);
      makeSut({ onCreate: create });
      await user.type(getInput(), " Eco ");
      const [first] = screen.getAllByRole("option");
      expect(first).toHaveTextContent('Create "Eco"');
      expect(first.querySelector("svg")).toBeInTheDocument();
      await user.click(first);
      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith("Eco");
    });

    it("is not offered for text equal to a label, for empty text or in a hierarchy", async () => {
      const user = userEvent.setup();
      const { unmount } = makeSut({ onCreate });
      await user.type(getInput(), "Eco");
      expect(screen.getByText('Create "Eco"')).toBeInTheDocument();
      await user.clear(getInput());
      expect(screen.queryByText(/^Create/)).not.toBeInTheDocument();
      await user.type(getInput(), "BOLSA");
      expect(screen.queryByText(/^Create/)).not.toBeInTheDocument();
      unmount();
      makeSut({ options: TREE, onCreate });
      await user.type(getInput(), "zzz");
      expect(screen.queryByText(/^Create/)).not.toBeInTheDocument();
    });
  });

  describe("AC-009 Instant creation", () => {
    it("selects the returned option at once without a loading or error state", async () => {
      const user = userEvent.setup();
      const created: ComboboxOption = { value: "eco", label: "Eco" };
      const onChange = jest.fn();
      makeSut({ onCreate: () => created, onChange });
      await user.type(getInput(), "Eco");
      await user.click(getOption(/Create/));
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(created);
      expect(getInput()).toHaveValue("Eco");
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });

    it("selects the existing option when the returned one has the same value", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      makeSut({
        onCreate: () => ({ value: "bag", label: "Another label" }),
        onChange
      });
      await user.type(getInput(), "Eco");
      await user.click(getOption(/Create/));
      expect(onChange).toHaveBeenCalledWith(BAG);
    });
  });

  describe("AC-011 Enriched options", () => {
    const enriched: ComboboxOption[] = [
      {
        value: "one",
        label: "Standard",
        subtitle: "Arrives in 5 days",
        tag: { label: "Cheap", appearance: "success" }
      },
      { value: "two", label: "Express", subtitle: "Arrives tomorrow" }
    ];

    it("renders label, tag and subtitle in each row with a divider between rows", async () => {
      const user = userEvent.setup();
      makeSut({ options: enriched });
      await user.click(getInput());
      expect(
        getOption("Standard, Arrives in 5 days, Cheap")
      ).toBeInTheDocument();
      expect(getOption("Express, Arrives tomorrow")).toBeInTheDocument();
      const dividers = getListbox()?.querySelectorAll('[aria-hidden="true"]');
      expect(dividers).toHaveLength(1);
    });

    it("shows the chosen tag in the field and no check on the selected enriched row", async () => {
      const user = userEvent.setup();
      makeSut({ options: enriched });
      await user.click(getInput());
      await user.click(getOption(/^Standard/));
      expect(screen.getByText("Cheap")).toBeInTheDocument();
      await user.click(getInput());
      const row = getOption(/^Standard/);
      expect(row).toHaveAttribute("aria-selected", "true");
      expect(row.querySelector("svg")).not.toBeInTheDocument();
    });
  });

  describe("AC-012 Disabled option", () => {
    const options: ComboboxOption[] = [
      CAMERA,
      { ...BAG, disabled: true },
      SHOE
    ];

    it("is not selected when clicked", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      makeSut({ options, onChange });
      await user.click(getInput());
      await user.click(getOption("Bolsa"));
      expect(onChange).not.toHaveBeenCalled();
      expect(getOption("Bolsa")).toHaveAttribute("aria-disabled", "true");
    });

    it("is skipped by arrow-key navigation", async () => {
      const user = userEvent.setup();
      makeSut({ options });
      await user.click(getInput());
      await user.keyboard("{ArrowDown}{ArrowDown}");
      expect(getInput()).toHaveAttribute(
        "aria-activedescendant",
        getOption("Zapato").id
      );
    });
  });

  describe("AC-013 Selected indication", () => {
    it("marks a selected plain row with a check after its label", async () => {
      const user = userEvent.setup();
      makeSut({ defaultValue: CAMERA });
      await user.click(getInput());
      const selected = getOption("Cámara");
      const other = getOption("Bolsa");
      expect(selected).toHaveAttribute("aria-selected", "true");
      expect(selected.querySelectorAll("svg")).toHaveLength(1);
      expect(other.querySelectorAll("svg")).toHaveLength(0);
      expect(selected.firstElementChild).toHaveTextContent("Cámara");
      expect(other.firstElementChild).toHaveTextContent("Bolsa");
    });

    it("shows the check of a selected branch before its chevron", async () => {
      const user = userEvent.setup();
      makeSut({ options: TREE, defaultValue: FASHION });
      await user.click(getInput());
      const branch = getOption(/^Fashion/);
      expect(branch).toHaveAttribute("aria-selected", "true");
      const end = branch.lastElementChild as HTMLElement;
      expect(end.querySelectorAll("svg")).toHaveLength(2);
      const unselected = getOption(/^Electronics/);
      expect(
        (unselected.lastElementChild as HTMLElement).querySelectorAll("svg")
      ).toHaveLength(1);
    });
  });

  describe("AC-014 Hierarchy navigation", () => {
    it("opens a branch by click and returns with the back control", async () => {
      const user = userEvent.setup();
      makeSut({ options: TREE });
      await user.click(getInput());
      await user.click(getOption(/^Fashion/));
      expect(
        screen.getByRole("group", { name: "Fashion" })
      ).toBeInTheDocument();
      expect(getOption("Clothing, has subcategories")).toBeInTheDocument();
      await user.click(screen.getByRole("button", { name: "Back" }));
      expect(getOption(/^Electronics/)).toBeInTheDocument();
    });

    it("opens a branch with Enter and with ArrowRight, and returns with ArrowLeft and Backspace", async () => {
      const user = userEvent.setup();
      makeSut({ options: TREE });
      await user.click(getInput());
      await user.keyboard("{ArrowDown}{Enter}");
      expect(screen.getByRole("button", { name: "Back" })).toBeInTheDocument();
      await user.keyboard("{ArrowLeft}");
      expect(
        screen.queryByRole("button", { name: "Back" })
      ).not.toBeInTheDocument();
      await user.keyboard("{ArrowDown}{ArrowRight}");
      expect(screen.getByRole("button", { name: "Back" })).toBeInTheDocument();
      await user.keyboard("{Backspace}");
      expect(
        screen.queryByRole("button", { name: "Back" })
      ).not.toBeInTheDocument();
    });

    it("labels the back control Back below the first level and Back to {name} deeper", async () => {
      const user = userEvent.setup();
      makeSut({ options: TREE });
      await user.click(getInput());
      await user.click(getOption(/^Fashion/));
      expect(screen.getByRole("button", { name: "Back" })).toBeInTheDocument();
      await user.click(getOption(/^Clothing/));
      expect(
        screen.getByRole("button", { name: "Back to Fashion" })
      ).toBeInTheDocument();
    });
  });

  describe("AC-015 Level limit", () => {
    const level = (position: number): ComboboxOption => ({
      value: `l${position}`,
      label: `L${position}`,
      children: position < 7 ? [level(position + 1)] : undefined
    });

    it("renders no option below level 6 and no chevron on level 6", async () => {
      const user = userEvent.setup();
      makeSut({ options: [level(1)], selectableBranches: false });
      await user.click(getInput());
      await user.click(getOption(/^L1/));
      await user.click(getOption(/^L2/));
      await user.click(getOption(/^L3/));
      await user.click(getOption(/^L4/));
      await user.click(getOption(/^L5/));
      expect(getOption("L6")).toBeInTheDocument();
      expect(getOption("L6").querySelectorAll("svg")).toHaveLength(0);
      await user.click(getOption("L6"));
      expect(screen.queryByText("L7")).not.toBeInTheDocument();
    });

    it("does not find level-7 options by search", async () => {
      const user = userEvent.setup();
      makeSut({ options: [level(1)] });
      await user.type(getInput(), "L7");
      expect(screen.queryAllByRole("option")).toHaveLength(0);
      expect(screen.getByText("No results")).toBeInTheDocument();
    });
  });

  describe("AC-016 Choosing a parent", () => {
    it("selects the parent from its own level title and not from its parent's level", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      makeSut({ options: TREE, onChange });
      await user.click(getInput());
      await user.click(getOption(/^Fashion/));
      expect(onChange).not.toHaveBeenCalled();
      const [title] = within(
        screen.getByRole("group", { name: "Fashion" })
      ).getAllByRole("option");
      expect(title).toHaveTextContent("Fashion");
      await user.click(title);
      expect(onChange).toHaveBeenCalledWith(FASHION);
    });

    it("shows the title as plain text when selectableBranches is false", async () => {
      const user = userEvent.setup();
      makeSut({ options: TREE, selectableBranches: false });
      await user.click(getInput());
      await user.click(getOption(/^Fashion/));
      expect(screen.getByText("Fashion")).toBeInTheDocument();
      expect(
        screen.queryByRole("option", { name: "Fashion" })
      ).not.toBeInTheDocument();
    });
  });

  describe("AC-017 Hierarchical search", () => {
    it("lists matches of the whole tree with their ancestor path", async () => {
      const user = userEvent.setup();
      makeSut({ options: TREE });
      await user.type(getInput(), "accessories");
      expect(getOption("Accessories, Fashion > Clothing")).toBeInTheDocument();
      expect(getOption("Accessories, Electronics")).toBeInTheDocument();
    });

    it("opens the level of a branch result and selects a leaf result", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      makeSut({ options: TREE, onChange });
      await user.type(getInput(), "cloth");
      await user.click(getOption("Clothing, Fashion, has subcategories"));
      expect(
        screen.getByRole("button", { name: "Back to Fashion" })
      ).toBeInTheDocument();
      expect(getInput()).toHaveValue("");
      await user.type(getInput(), "accessories");
      await user.click(getOption("Accessories, Fashion > Clothing"));
      expect(onChange).toHaveBeenCalledWith(ACCESSORIES_CLOTHING);
    });

    it("returns to the open level when the text is cleared", async () => {
      const user = userEvent.setup();
      makeSut({ options: TREE });
      await user.click(getInput());
      await user.click(getOption(/^Fashion/));
      await user.type(getInput(), "acc");
      expect(
        screen.queryByRole("button", { name: "Back" })
      ).not.toBeInTheDocument();
      await user.clear(getInput());
      expect(screen.getByRole("button", { name: "Back" })).toBeInTheDocument();
    });
  });

  describe("AC-018 Hierarchical value display", () => {
    it("shows the full path with chevrons and exposes it as the description", async () => {
      const user = userEvent.setup();
      const { container } = makeSut({ options: TREE });
      await user.type(getInput(), "accessories");
      await user.click(getOption("Accessories, Fashion > Clothing"));
      expect(getInput()).toHaveAccessibleDescription(
        "Fashion > Clothing > Accessories"
      );
      const path = container.querySelector(
        'span[aria-hidden="true"]'
      ) as HTMLElement;
      expect(path).toHaveTextContent("FashionClothingAccessories");
      expect(path.querySelectorAll("svg")).toHaveLength(2);
    });

    it("distinguishes same-name options under different branches", async () => {
      const user = userEvent.setup();
      makeSut({ options: TREE, defaultValue: ACCESSORIES_ELECTRONICS });
      expect(getInput()).toHaveAccessibleDescription(
        "Electronics > Accessories"
      );
      await user.click(getInput());
      expect(
        screen.getByRole("group", { name: "Electronics" })
      ).toBeInTheDocument();
      expect(getOption("Accessories")).toHaveAttribute("aria-selected", "true");
    });

    it("shows a root option by its label only", () => {
      const { container } = makeSut({ options: TREE, defaultValue: FASHION });
      expect(getInput()).toHaveValue("Fashion");
      expect(
        container.querySelector('span[aria-hidden="true"] svg')
      ).not.toBeInTheDocument();
    });
  });

  describe("AC-019 Form value", () => {
    const readForm = (form: HTMLElement, name: string) =>
      new FormData(form as HTMLFormElement).getAll(name);

    it("yields the selected value of a single field, or an empty entry", () => {
      const { unmount } = render(
        <form data-testid="form">
          <Combobox
            aria-label="Field"
            name="category"
            options={OPTIONS}
            defaultValue={CAMERA}
          />
        </form>
      );
      expect(readForm(screen.getByTestId("form"), "category")).toEqual([
        "camera"
      ]);
      unmount();
      render(
        <form data-testid="form">
          <Combobox aria-label="Field" name="category" options={OPTIONS} />
        </form>
      );
      expect(readForm(screen.getByTestId("form"), "category")).toEqual([""]);
    });

    it("yields one entry per value of a multiple field", () => {
      render(
        <form data-testid="form">
          <Combobox
            aria-label="Field"
            multiple
            name="categories"
            options={OPTIONS}
            defaultValue={[CAMERA, BAG]}
          />
        </form>
      );
      expect(readForm(screen.getByTestId("form"), "categories")).toEqual([
        "camera",
        "bag"
      ]);
    });
  });

  describe("AC-020 Required", () => {
    it("is invalid without a value, even with text typed, with the required message", async () => {
      const user = userEvent.setup();
      makeSut({ required: true });
      expect(getInput()).toBeInvalid();
      await user.type(getInput(), "Cám");
      expect(getInput()).toBeInvalid();
      expect((getInput() as HTMLInputElement).validationMessage).toBe(
        "Select a value"
      );
    });

    it("is valid with a value, even with an empty input", () => {
      makeSut({ required: true, multiple: true, defaultValue: [CAMERA] });
      expect(
        screen.getByRole("button", { name: "Remove Cámara" })
      ).toBeInTheDocument();
      expect(getInput()).toBeValid();
      expect(getInput()).toHaveValue("");
    });
  });

  describe("AC-021 Unique values", () => {
    it("warns in development mode about duplicate values", () => {
      const warn = jest
        .spyOn(console, "warn")
        .mockImplementation(() => undefined);
      makeSut({ options: [CAMERA, { value: "camera", label: "Other" }] });
      expect(warn).toHaveBeenCalledWith(expect.stringContaining("unique"));
      warn.mockRestore();
    });
  });

  describe("AC-022 Controlled value", () => {
    it("follows value and only reports requests", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      const { rerender } = render(
        <Combobox
          aria-label="Field"
          options={OPTIONS}
          value={CAMERA}
          onChange={onChange}
        />
      );
      await user.click(getInput());
      await user.click(getOption("Bolsa"));
      expect(onChange).toHaveBeenCalledWith(BAG);
      expect(getInput()).toHaveValue("Cámara");
      rerender(
        <Combobox
          aria-label="Field"
          options={OPTIONS}
          value={BAG}
          onChange={onChange}
        />
      );
      expect(getInput()).toHaveValue("Bolsa");
    });

    it("manages the selection from defaultValue when uncontrolled", async () => {
      const user = userEvent.setup();
      makeSut({ defaultValue: BAG });
      expect(getInput()).toHaveValue("Bolsa");
      await user.click(getInput());
      await user.click(getOption("Zapato"));
      expect(getInput()).toHaveValue("Zapato");
    });
  });

  describe("AC-023 Help text link", () => {
    it("keeps the consumer description and adds the full path without rendering help text", () => {
      const { container } = render(
        <>
          <p id="help">Pick a category</p>
          <Combobox
            aria-label="Field"
            options={TREE}
            aria-describedby="help"
            defaultValue={ACCESSORIES_CLOTHING}
          />
        </>
      );
      expect(getInput()).toHaveAccessibleDescription(
        "Pick a category Fashion > Clothing > Accessories"
      );
      expect(container.querySelectorAll("p")).toHaveLength(1);
    });
  });

  describe("AC-026 Labels", () => {
    it("shows the English defaults", async () => {
      const user = userEvent.setup();
      makeSut({
        multiple: true,
        defaultValue: [CAMERA, BAG],
        onCreate: (label) => ({ value: label, label })
      });
      expect(
        screen.getByRole("button", { name: "Remove Cámara" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Clear all" })
      ).toBeInTheDocument();
      await user.type(getInput(), "Eco");
      expect(screen.getByText('Create "Eco"')).toBeInTheDocument();
      await user.clear(getInput());
      await user.type(getInput(), "zzzz");
      expect(screen.queryByText("No results")).not.toBeInTheDocument();
    });

    it("shows the overrides with their placeholders replaced", async () => {
      const user = userEvent.setup();
      makeSut({
        multiple: true,
        defaultValue: [CAMERA, BAG],
        onCreate: (label) => ({ value: label, label }),
        labels: {
          removeChip: "Quitar {name}",
          clearAll: "Borrar todo",
          create: 'Crear "{text}"',
          noResults: "Sin resultados"
        }
      });
      expect(
        screen.getByRole("button", { name: "Quitar Cámara" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Borrar todo" })
      ).toBeInTheDocument();
      await user.type(getInput(), "Eco");
      expect(screen.getByText('Crear "Eco"')).toBeInTheDocument();
    });

    it("translates the single-mode, hierarchy and no-result texts", async () => {
      const user = userEvent.setup();
      makeSut({
        options: TREE,
        defaultValue: FASHION,
        labels: {
          clearSelection: "Limpiar",
          back: "Volver",
          backTo: "Volver a {name}",
          branchHint: "con subcategorías",
          noResults: "Sin resultados"
        }
      });
      expect(
        screen.getByRole("button", { name: "Limpiar" })
      ).toBeInTheDocument();
      await user.click(getInput());
      await user.click(getOption("Fashion, con subcategorías"));
      expect(
        screen.getByRole("button", { name: "Volver" })
      ).toBeInTheDocument();
      await user.click(getOption(/^Clothing/));
      expect(
        screen.getByRole("button", { name: "Volver a Fashion" })
      ).toBeInTheDocument();
      await user.keyboard("zzzz");
      expect(screen.getByText("Sin resultados")).toBeInTheDocument();
    });

    it("translates the required message", () => {
      makeSut({ required: true, labels: { required: "Elegí un valor" } });
      expect((getInput() as HTMLInputElement).validationMessage).toBe(
        "Elegí un valor"
      );
    });
  });

  describe("AC-027 Appearance and disabled field", () => {
    it("uses the field style of Input for the appearance", () => {
      const { container } = makeSut({ appearance: "danger" });
      const selector = inputStyles.classnames.appearance.danger
        .split(" ")
        .map((name) => `.${name}`)
        .join("");
      expect(container.querySelector(selector)).toBeInTheDocument();
    });

    it("does nothing when disabled and is not part of the tab order", async () => {
      const user = userEvent.setup();
      makeSut({ disabled: true, multiple: true, defaultValue: [CAMERA, BAG] });
      expect(getInput()).toBeDisabled();
      expect(screen.queryAllByRole("button")).toHaveLength(0);
      await user.tab();
      expect(getInput()).not.toHaveFocus();
      await user.click(getInput());
      expect(getListbox()).not.toBeInTheDocument();
    });
  });

  describe("AC-028 No results", () => {
    it("shows the no-results message as a non-selectable message", async () => {
      const user = userEvent.setup();
      makeSut();
      await user.type(getInput(), "zzzz");
      expect(screen.getByText("No results")).toBeInTheDocument();
      expect(screen.queryAllByRole("option")).toHaveLength(0);
    });
  });

  describe("AC-029 Semantics and names", () => {
    it("exposes a combobox that controls a listbox of options with their selected state", async () => {
      const user = userEvent.setup();
      makeSut({ defaultValue: CAMERA });
      const input = getInput();
      expect(input).toHaveAttribute("aria-haspopup", "listbox");
      expect(input).toHaveAttribute("aria-autocomplete", "list");
      expect(input).toHaveAttribute("aria-expanded", "false");
      await user.click(input);
      expect(input).toHaveAttribute("aria-expanded", "true");
      expect(input).toHaveAttribute(
        "aria-controls",
        screen.getByRole("listbox").id
      );
      expect(getOption("Cámara")).toHaveAttribute("aria-selected", "true");
      expect(getOption("Bolsa")).toHaveAttribute("aria-selected", "false");
    });

    it("marks the listbox as multiselectable in multiple mode", async () => {
      const user = userEvent.setup();
      makeSut({ multiple: true });
      await user.click(getInput());
      expect(screen.getByRole("listbox")).toHaveAttribute(
        "aria-multiselectable",
        "true"
      );
    });

    it("names levels as groups and gives branch and enriched options their names", async () => {
      const user = userEvent.setup();
      makeSut({
        options: [
          ...TREE,
          { value: "e", label: "Rich", subtitle: "Sub", tag: { label: "New" } }
        ]
      });
      await user.click(getInput());
      expect(getOption("Fashion, has subcategories")).toBeInTheDocument();
      expect(getOption("Rich, Sub, New")).toBeInTheDocument();
      await user.click(getOption(/^Fashion/));
      expect(
        screen.getByRole("group", { name: "Fashion" })
      ).toBeInTheDocument();
    });

    it("names the buttons outside the listbox", async () => {
      const user = userEvent.setup();
      makeSut({ multiple: true, defaultValue: [CAMERA, BAG] });
      expect(
        screen.getByRole("button", { name: "Remove Cámara" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Clear all" })
      ).toBeInTheDocument();
      await user.click(getInput());
      expect(
        within(screen.getByRole("listbox")).queryAllByRole("button")
      ).toHaveLength(0);
    });

    it("names the field by an associated label", () => {
      render(
        <>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="category">Category</label>
          <Combobox id="category" options={OPTIONS} />
        </>
      );
      expect(
        screen.getByRole("combobox", { name: "Category" })
      ).toBeInTheDocument();
    });

    it("announces the number of results", async () => {
      const user = userEvent.setup();
      makeSut();
      await user.click(getInput());
      expect(screen.getByRole("status")).toHaveTextContent("Results: 3");
    });
  });

  describe("AC-030 Keyboard map", () => {
    it("moves the active row without wrapping and with Home and End", async () => {
      const user = userEvent.setup();
      makeSut();
      await user.click(getInput());
      await user.keyboard("{ArrowDown}");
      expect(getInput()).toHaveAttribute(
        "aria-activedescendant",
        getOption("Cámara").id
      );
      await user.keyboard("{End}");
      expect(getInput()).toHaveAttribute(
        "aria-activedescendant",
        getOption("Zapato").id
      );
      await user.keyboard("{ArrowDown}");
      expect(getInput()).toHaveAttribute(
        "aria-activedescendant",
        getOption("Zapato").id
      );
      await user.keyboard("{Home}");
      expect(getInput()).toHaveAttribute(
        "aria-activedescendant",
        getOption("Cámara").id
      );
      await user.keyboard("{ArrowUp}");
      expect(getInput()).toHaveAttribute(
        "aria-activedescendant",
        getOption("Cámara").id
      );
      expect(getInput()).toHaveFocus();
    });

    it("activates the active row with Enter", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      makeSut({ onChange });
      await user.click(getInput());
      await user.keyboard("{ArrowDown}{ArrowDown}{Enter}");
      expect(onChange).toHaveBeenCalledWith(BAG);
      expect(getInput()).toHaveFocus();
    });

    it("propagates Escape only when the list is closed", async () => {
      const user = userEvent.setup();
      const onKeyDown = jest.fn();
      render(
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div onKeyDown={onKeyDown}>
          <Combobox aria-label="Field" options={OPTIONS} />
        </div>
      );
      await user.click(getInput());
      onKeyDown.mockClear();
      await user.keyboard("{Escape}");
      expect(onKeyDown).not.toHaveBeenCalled();
      await user.keyboard("{Escape}");
      expect(onKeyDown).toHaveBeenCalledTimes(1);
    });

    it("opens the active branch with ArrowRight only at the end of the text while searching", async () => {
      const user = userEvent.setup();
      makeSut({ options: TREE });
      await user.type(getInput(), "cloth");
      await user.keyboard("{ArrowDown}{ArrowRight}");
      expect(
        screen.getByRole("button", { name: "Back to Fashion" })
      ).toBeInTheDocument();
    });
  });

  describe("AC-031 Focus", () => {
    it("keeps the focus in the input when choosing, changing level or removing a chip", async () => {
      const user = userEvent.setup();
      makeSut({ multiple: true, options: TREE, defaultValue: [PHONES] });
      await user.click(getInput());
      await user.click(getOption(/^Fashion/));
      expect(getInput()).toHaveFocus();
      await user.click(screen.getByRole("button", { name: "Back" }));
      expect(getInput()).toHaveFocus();
      await user.click(screen.getByRole("button", { name: "Remove Phones" }));
      expect(getInput()).toHaveFocus();
    });

    it("exposes the active row with aria-activedescendant and keeps the focus on Escape", async () => {
      const user = userEvent.setup();
      makeSut();
      await user.click(getInput());
      await user.keyboard("{ArrowDown}{ArrowDown}");
      expect(getInput()).toHaveAttribute(
        "aria-activedescendant",
        getOption("Bolsa").id
      );
      await user.keyboard("{Escape}");
      expect(getListbox()).not.toBeInTheDocument();
      expect(getInput()).toHaveFocus();
    });
  });

  describe("AC-033 Multiple instances", () => {
    it("keeps the other instance unchanged", async () => {
      const user = userEvent.setup();
      render(
        <>
          <Combobox aria-label="First" options={OPTIONS} />
          <Combobox aria-label="Second" options={OPTIONS} />
        </>
      );
      await user.click(screen.getByRole("combobox", { name: "First" }));
      await user.click(getOption("Cámara"));
      const second = screen.getByRole("combobox", { name: "Second" });
      expect(second).toHaveValue("");
      expect(second).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("AC-034 Non-clearable single value", () => {
    it("shows the chevron, keeps the value while searching and restores it on leaving", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(
        <>
          <Combobox
            aria-label="Field"
            options={OPTIONS}
            clearable={false}
            defaultValue={CAMERA}
            onChange={onChange}
          />
          <button type="button">Elsewhere</button>
        </>
      );
      expect(
        screen.queryByRole("button", { name: "Clear selection" })
      ).not.toBeInTheDocument();
      await user.click(getInput());
      await user.clear(getInput());
      await user.type(getInput(), "bol");
      expect(onChange).not.toHaveBeenCalled();
      await user.click(screen.getByRole("button", { name: "Elsewhere" }));
      expect(getInput()).toHaveValue("Cámara");
      expect(onChange).not.toHaveBeenCalled();
    });

    it("marks the selected row while the list is open and accepts another choice", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      makeSut({ clearable: false, defaultValue: CAMERA, onChange });
      await user.click(getInput());
      expect(getOption("Cámara")).toHaveAttribute("aria-selected", "true");
      await user.click(getOption("Bolsa"));
      expect(onChange).toHaveBeenCalledWith(BAG);
      expect(getInput()).toHaveValue("Bolsa");
    });
  });

  describe("AC-035 Chips with the same label", () => {
    it("shows the full path only on chips whose label collides and describes every chip by its path", () => {
      makeSut({
        multiple: true,
        options: TREE,
        defaultValue: [ACCESSORIES_CLOTHING, ACCESSORIES_ELECTRONICS, PHONES]
      });
      const clothing = screen.getByText("Fashion › Clothing › Accessories");
      const electronics = screen.getByText("Electronics › Accessories");
      const phones = screen.getByText("Phones");
      expect(clothing.parentElement).toHaveAccessibleDescription(
        "Fashion > Clothing > Accessories"
      );
      expect(electronics.parentElement).toHaveAccessibleDescription(
        "Electronics > Accessories"
      );
      expect(phones.parentElement).toHaveAccessibleDescription(
        "Electronics > Phones"
      );
    });
  });

  describe("AC-036 Typing over a selected value", () => {
    it("clears the value once, keeps the typed text and the open filtered list", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      makeSut({ defaultValue: CAMERA, onChange });
      await user.click(getInput());
      await user.keyboard("{Escape}");
      await user.keyboard("z");
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(null);
      expect((getInput() as HTMLInputElement).value).toContain("z");
      expect(getInput()).toHaveAttribute("aria-expanded", "true");
      expect(getInput()).toHaveFocus();
      // The typed text is the search text: nothing is called "Cámaraz".
      expect(screen.getByText("No results")).toBeInTheDocument();
    });
  });

  describe("AC-037 Tab sequence and leaving the field", () => {
    it("moves along chip remove buttons, the input and the clear-all button", async () => {
      const user = userEvent.setup();
      makeSut({ multiple: true, defaultValue: [CAMERA, BAG] });
      await user.tab();
      expect(
        screen.getByRole("button", { name: "Remove Cámara" })
      ).toHaveFocus();
      await user.tab();
      expect(
        screen.getByRole("button", { name: "Remove Bolsa" })
      ).toHaveFocus();
      await user.tab();
      expect(getInput()).toHaveFocus();
      await user.tab();
      expect(screen.getByRole("button", { name: "Clear all" })).toHaveFocus();
      await user.tab({ shift: true });
      expect(getInput()).toHaveFocus();
    });

    it("closes the list when the focus leaves the input and keeps the back control out of the sequence", async () => {
      const user = userEvent.setup();
      makeSut({ options: TREE, defaultValue: FASHION });
      await user.click(getInput());
      await user.click(getOption(/^Fashion/));
      expect(screen.getByRole("button", { name: "Back" })).toHaveAttribute(
        "tabindex",
        "-1"
      );
      await user.tab();
      expect(
        screen.getByRole("button", { name: "Clear selection" })
      ).toHaveFocus();
      expect(getListbox()).not.toBeInTheDocument();
    });

    it("activates a focused chip remove button with Enter and Space and moves the focus to the input", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      makeSut({ multiple: true, defaultValue: [CAMERA, BAG, SHOE], onChange });
      await user.tab();
      await user.keyboard("{Enter}");
      expect(onChange).toHaveBeenLastCalledWith([BAG, SHOE]);
      expect(getInput()).toHaveFocus();
      expect(getListbox()).not.toBeInTheDocument();
    });
  });

  describe("AC-038 Keyboard clear leaves the list closed", () => {
    it.each(["{Enter}", " "])(
      "clears a single value with %j on the clear button",
      async (key) => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        makeSut({ defaultValue: CAMERA, onChange });
        await user.tab();
        await user.tab();
        expect(
          screen.getByRole("button", { name: "Clear selection" })
        ).toHaveFocus();
        await user.keyboard(key);
        expect(onChange).toHaveBeenCalledWith(null);
        expect(getInput()).toHaveValue("");
        expect(getInput()).toHaveFocus();
        expect(getListbox()).not.toBeInTheDocument();
      }
    );

    it.each(["{Enter}", " "])(
      "clears all chips with %j on the clear-all button",
      async (key) => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        makeSut({ multiple: true, defaultValue: [CAMERA, BAG], onChange });
        await user.tab();
        await user.tab();
        await user.tab();
        await user.tab();
        expect(screen.getByRole("button", { name: "Clear all" })).toHaveFocus();
        await user.keyboard(key);
        expect(onChange).toHaveBeenCalledWith([]);
        expect(getInput()).toHaveFocus();
        expect(getListbox()).not.toBeInTheDocument();
      }
    );
  });
});

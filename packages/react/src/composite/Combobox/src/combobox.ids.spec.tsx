import React from "react";
import { render, screen } from "@testing-library/react";

import { Combobox } from "./Combobox";
import type { ComboboxOption } from "./combobox.types";

// Floating UI's `useId` has no id on the first render on React 17.
jest.mock("@floating-ui/react", () => ({
  ...jest.requireActual("@floating-ui/react"),
  useId: () => undefined
}));

const LEAF: ComboboxOption = { value: "leaf", label: "Leaf" };
const TREE: ComboboxOption[] = [
  { value: "root", label: "Root", children: [LEAF] }
];

describe("GIVEN <Combobox /> without an id from Floating UI", () => {
  it("AC-023 gives every instance unique ids for the descriptions that reference each other", () => {
    render(
      <>
        <Combobox aria-label="First" options={TREE} defaultValue={LEAF} />
        <Combobox aria-label="Second" options={TREE} defaultValue={LEAF} />
        <Combobox
          aria-label="Third"
          multiple
          options={TREE}
          defaultValue={[LEAF]}
        />
        <Combobox
          aria-label="Fourth"
          multiple
          options={TREE}
          defaultValue={[LEAF]}
        />
      </>
    );
    const ids = Array.from(document.querySelectorAll("[id]")).map(
      (element) => element.id
    );
    expect(ids.length).toBeGreaterThan(4);
    expect(new Set(ids).size).toBe(ids.length);
    const first = screen.getByRole("combobox", { name: "First" });
    const second = screen.getByRole("combobox", { name: "Second" });
    expect(first.getAttribute("aria-describedby")).not.toBe(
      second.getAttribute("aria-describedby")
    );
    expect(first).toHaveAccessibleDescription("Root > Leaf");
    expect(second).toHaveAccessibleDescription("Root > Leaf");
  });
});

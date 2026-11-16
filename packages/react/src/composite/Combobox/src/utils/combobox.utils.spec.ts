import type { ComboboxOption } from "../combobox.types";
import { buildIndex, getRemoveNames } from "./combobox.utils";

const leaf = (value: string, label: string): ComboboxOption => ({
  value,
  label
});

describe("GIVEN getRemoveNames", () => {
  const first = leaf("a", "Accessories");
  const second = leaf("b", "Accessories");
  const tree: ComboboxOption[] = [
    { value: "x", label: "Fashion", children: [first] },
    { value: "y", label: "Electronics", children: [second] },
    leaf("c", "Accessories")
  ];
  const { index } = buildIndex(tree);

  it("returns the label of a unique option", () => {
    expect(getRemoveNames([first], index)).toEqual(["Accessories"]);
  });

  it("returns the parent and the label when labels repeat, and the label of a root option", () => {
    expect(getRemoveNames([first, second, tree[2]], index)).toEqual([
      "Fashion › Accessories",
      "Electronics › Accessories",
      "Accessories"
    ]);
  });
});

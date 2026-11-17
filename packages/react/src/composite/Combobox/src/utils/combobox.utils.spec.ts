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

  it("adds every level needed when the parent and the label repeat", () => {
    const fashionAccessories = leaf("fa", "Accessories");
    const electronicsAccessories = leaf("ea", "Accessories");
    const deepTree: ComboboxOption[] = [
      {
        value: "fashion",
        label: "Fashion",
        children: [
          { value: "fc", label: "Common", children: [fashionAccessories] }
        ]
      },
      {
        value: "electronics",
        label: "Electronics",
        children: [
          { value: "ec", label: "Common", children: [electronicsAccessories] }
        ]
      }
    ];
    const { index: deepIndex } = buildIndex(deepTree);
    expect(
      getRemoveNames([fashionAccessories, electronicsAccessories], deepIndex)
    ).toEqual([
      "Fashion › Common › Accessories",
      "Electronics › Common › Accessories"
    ]);
  });

  it("keeps the full path when two options have the same full label path", () => {
    const one = leaf("one", "Accessories");
    const two = leaf("two", "Accessories");
    const twinTree: ComboboxOption[] = [
      { value: "p1", label: "Fashion", children: [one] },
      { value: "p2", label: "Fashion", children: [two] }
    ];
    const { index: twinIndex } = buildIndex(twinTree);
    expect(getRemoveNames([one, two], twinIndex)).toEqual([
      "Fashion › Accessories",
      "Fashion › Accessories"
    ]);
  });
});

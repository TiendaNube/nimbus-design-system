# @nimbus-ds/combobox

The Combobox lets a person choose one value, or several, from a list of options by typing to filter the list. It can optionally create an option that does not exist yet, show options with a subtitle and a tag, and drill down through a hierarchy of up to six levels.

Use it when the list is long enough that filtering by typing helps, when the options form a hierarchy, or when the person may need several values or may need to add a value that is not in the list. For a short, fixed list use `Select`; for free text use `Input`.

## Installation

```bash
npm install @nimbus-ds/combobox
# or
yarn add @nimbus-ds/combobox
```

## Usage

```jsx
import { Combobox } from "@nimbus-ds/combobox";

const options = [
  { value: "bags", label: "Bags" },
  { value: "shoes", label: "Shoes" },
];

function App() {
  const [value, setValue] = useState(null);

  return (
    <Combobox
      aria-label="Category"
      options={options}
      value={value}
      onChange={setValue}
    />
  );
}
```

### Several values

```jsx
<Combobox multiple aria-label="Categories" options={options} onChange={console.log} />
```

`onChange` receives the full set of selected options, `[]` when empty.

### Creating an option

Creation is enabled by `onCreate` and is instant: it returns the new option, which is selected in the same interaction. The component keeps no option store, so add the returned option to the `options` you own.

```jsx
<Combobox
  aria-label="Category"
  options={options}
  onCreate={(label) => {
    const created = { value: label.toLowerCase(), label };
    setOptions((current) => [...current, created]);
    return created;
  }}
/>
```

Creation is not offered when any option has `children`.

### Hierarchy

An option with `children` is a branch. A hierarchy supports up to six levels, where the root list is level 1.

```jsx
<Combobox
  aria-label="Category"
  options={[
    {
      value: "fashion",
      label: "Fashion",
      children: [{ value: "clothing", label: "Clothing" }],
    },
  ]}
/>
```

## Props

| Prop                 | Type                                                  | Default            | Description                                                                |
| -------------------- | ----------------------------------------------------- | ------------------ | -------------------------------------------------------------------------- |
| options              | `ComboboxOption[]`                                    | -                  | The options. `value` must be unique across the whole option tree.          |
| multiple             | `boolean`                                             | `false`            | Allows several values.                                                     |
| value                | `ComboboxOption \| null` / `ComboboxOption[]`         | -                  | Controlled value.                                                          |
| defaultValue         | same as `value`                                       | none selected      | Initial value when uncontrolled.                                           |
| onChange             | `(value) => void`                                     | -                  | Receives the option or `null` (single) or the full set (multiple).         |
| onCreate             | `(label: string) => ComboboxOption`                   | -                  | Enables instant creation.                                                  |
| clearable            | `boolean`                                             | `true`             | Single mode: whether a selected value can be cleared.                      |
| filter               | `(option, query) => boolean`                          | label contains     | Replaces the default match (ignores case and diacritics, label only).      |
| selectableBranches   | `boolean`                                             | `true`             | Hierarchy: a parent can be chosen from its own level.                      |
| placeholder          | `string`                                              | -                  | Shown while the input is empty and nothing is selected.                    |
| disabled             | `boolean`                                             | `false`            | Disables the whole field.                                                  |
| appearance           | `"neutral" \| "success" \| "warning" \| "danger"`     | `"neutral"`        | Visual style of the field, as on `Input`.                                  |
| name                 | `string`                                              | -                  | Form field name; renders hidden fields with the selected values.           |
| required             | `boolean`                                             | `false`            | Requires a value; validity depends on the selected values, not on the text. |
| id                   | `string`                                              | generated          | Id of the text input, for a `<label htmlFor>`.                             |
| aria-label, aria-labelledby, aria-describedby | `string`                     | -                  | Forwarded to the text input.                                               |
| labels               | `Partial<ComboboxLabels>`                             | English defaults   | Translatable texts.                                                        |
| data-testid          | `string`                                              | -                  | Test identifier, set on the text input.                                    |

`ComboboxOption` is `{ value: string; label: string; subtitle?: string; tag?: { label: string; appearance?: "primary" | "success" | "warning" | "danger" | "neutral" }; disabled?: boolean; children?: ComboboxOption[] }`.

The Combobox renders no label, help text or error message of its own: compose it with a `<label htmlFor>` and link help text through `aria-describedby`.

## Labels

Every text the component provides can be translated through `labels`: `back`, `backTo` (`{name}`), `branchHint`, `clearSelection`, `clearAll`, `removeChip` (`{name}`), `noResults`, `listbox`, `results`, `create` (`{text}`) and `required`.

## Keyboard

All keys are handled by the text input.

| Key                | Behavior                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------- |
| ArrowDown / ArrowUp | Opens the list if closed; moves the active row, without wrapping.                        |
| Home / End         | Moves the active row to the first / last selectable row.                                  |
| Enter              | Activates the active row.                                                                 |
| Escape             | Closes the list and keeps the focus; does nothing, and propagates, when it is closed.     |
| ArrowRight         | Hierarchy: opens the active branch (while searching, only at the end of the text).        |
| ArrowLeft          | Hierarchy: returns one level (empty text).                                                |
| Backspace          | Empty text: returns one level in a hierarchy, otherwise removes the last chip.            |
| Tab / Shift+Tab    | Moves along the chip remove buttons, the text input and the clear button.                 |

## Accessibility

- The text input is a `combobox` that controls a `listbox`; the active row is exposed with `aria-activedescendant`. The listbox is the scrolling region: it is focusable (`tabindex="0"`), named by `labels.listbox`, and never holds the focus (it goes back to the text input).
- Rows are `option`s with `aria-selected`; a hierarchy level is a `group` named by its title.
- The chip remove, clear and clear-all buttons are real buttons outside the listbox, named through `labels`.
- Selection is shown by fill and a check, not by color alone.

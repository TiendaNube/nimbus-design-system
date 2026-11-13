import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Button } from "@nimbus-ds/button";
import { Modal } from "@nimbus-ds/modal";
import { Text } from "@nimbus-ds/text";

import { Combobox } from "./Combobox";
import type { ComboboxOption } from "./combobox.types";

const CATEGORIES: ComboboxOption[] = [
  { value: "bags", label: "Bags" },
  { value: "camera", label: "Cámara" },
  { value: "shoes", label: "Shoes" },
  { value: "watches", label: "Watches" },
  { value: "hats", label: "Hats" },
  { value: "belts", label: "Belts" },
  { value: "scarves", label: "Scarves" },
  { value: "gloves", label: "Gloves" },
  { value: "socks", label: "Socks" },
  { value: "jackets", label: "Jackets" },
  { value: "dresses", label: "Dresses" },
  { value: "jewelry", label: "Jewelry" }
];

const SHIPPING: ComboboxOption[] = [
  {
    value: "standard",
    label: "Standard",
    subtitle: "Arrives in 5 to 7 days",
    tag: { label: "Free", appearance: "success" }
  },
  {
    value: "express",
    label: "Express",
    subtitle: "Arrives tomorrow",
    tag: { label: "Paid", appearance: "primary" }
  },
  {
    value: "pickup",
    label: "Pickup in store",
    subtitle: "Ready in 2 hours"
  },
  {
    value: "international",
    label: "International",
    subtitle: "Not available for your address",
    disabled: true
  }
];

const HIERARCHY: ComboboxOption[] = [
  {
    value: "fashion",
    label: "Fashion",
    children: [
      {
        value: "clothing",
        label: "Clothing",
        children: [
          { value: "fashion-accessories", label: "Accessories" },
          { value: "shirts", label: "Shirts" },
          { value: "pants", label: "Pants" }
        ]
      },
      { value: "footwear", label: "Footwear" }
    ]
  },
  {
    value: "electronics",
    label: "Electronics",
    children: [
      { value: "electronics-accessories", label: "Accessories" },
      { value: "phones", label: "Phones" },
      { value: "computers", label: "Computers" }
    ]
  },
  { value: "toys", label: "Toys" }
];

/** Instant creation: adds the new option to the list the story owns. */
const createCategory =
  (setOptions: React.Dispatch<React.SetStateAction<ComboboxOption[]>>) =>
  (label: string): ComboboxOption => {
    const created = { value: label.toLowerCase(), label };
    setOptions((current) => [...current, created]);
    return created;
  };

const buildDeepTree = (level: number): ComboboxOption => ({
  value: `level-${level}`,
  label: `Level ${level} category`,
  children: level < 7 ? [buildDeepTree(level + 1)] : undefined
});

const LONG_PATH: ComboboxOption[] = [
  {
    value: "long-root",
    label: "Home appliances and household electronics",
    children: [
      {
        value: "long-middle",
        label: "Kitchen appliances for professional use",
        children: [
          {
            value: "long-leaf",
            label: "Programmable countertop espresso machines"
          }
        ]
      }
    ]
  }
];

const meta: Meta<typeof Combobox> = {
  title: "Composite/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <Box width="100%" maxWidth="360px" minHeight="320px">
        <Story />
      </Box>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof Combobox>;

const Selected: React.FC<{ text: string }> = ({ text }) => (
  <Box marginTop="2">
    <Text fontSize="caption" color="neutral-textLow">
      {text}
    </Text>
  </Box>
);

export const Single: Story = {
  render: () => {
    const [value, setValue] = useState<ComboboxOption | null>(null);
    return (
      <>
        <Combobox
          aria-label="Category"
          placeholder="Search a category"
          options={CATEGORIES}
          value={value}
          onChange={setValue}
        />
        <Selected text={`Selected: ${value?.label ?? "none"}`} />
      </>
    );
  }
};

export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState<ComboboxOption[]>([
      CATEGORIES[0],
      CATEGORIES[2]
    ]);
    return (
      <>
        <Combobox
          multiple
          aria-label="Categories"
          placeholder="Search categories"
          options={CATEGORIES}
          value={value}
          onChange={setValue}
        />
        <Selected
          text={`Selected: ${
            value.map((option) => option.label).join(", ") || "none"
          }`}
        />
      </>
    );
  }
};

export const MultipleWithManyChips: Story = {
  render: () => {
    const [value, setValue] = useState<ComboboxOption[]>(
      CATEGORIES.slice(0, 7)
    );
    return (
      <Combobox
        multiple
        aria-label="Categories"
        options={CATEGORIES}
        value={value}
        onChange={setValue}
      />
    );
  }
};

export const Creatable: Story = {
  render: () => {
    const [options, setOptions] = useState<ComboboxOption[]>(
      CATEGORIES.slice(0, 5)
    );
    const [value, setValue] = useState<ComboboxOption | null>(null);
    return (
      <>
        <Combobox
          aria-label="Category"
          placeholder="Search or create a category"
          options={options}
          value={value}
          onChange={setValue}
          onCreate={createCategory(setOptions)}
        />
        <Selected text={`Selected: ${value?.label ?? "none"}`} />
      </>
    );
  }
};

export const CreatableMultiple: Story = {
  render: () => {
    const [options, setOptions] = useState<ComboboxOption[]>(
      CATEGORIES.slice(0, 5)
    );
    const [value, setValue] = useState<ComboboxOption[]>([]);
    return (
      <Combobox
        multiple
        aria-label="Tags"
        placeholder="Search or create tags"
        options={options}
        value={value}
        onChange={setValue}
        onCreate={createCategory(setOptions)}
      />
    );
  }
};

export const NotClearable: Story = {
  render: () => {
    const [value, setValue] = useState<ComboboxOption | null>(CATEGORIES[1]);
    return (
      <Combobox
        aria-label="Category"
        clearable={false}
        options={CATEGORIES}
        value={value}
        onChange={setValue}
      />
    );
  }
};

export const EnrichedOptions: Story = {
  render: () => {
    const [value, setValue] = useState<ComboboxOption | null>(SHIPPING[0]);
    return (
      <Combobox
        aria-label="Shipping method"
        options={SHIPPING}
        value={value}
        onChange={setValue}
      />
    );
  }
};

export const EnrichedNotClearable: Story = {
  render: () => {
    const [value, setValue] = useState<ComboboxOption | null>(SHIPPING[1]);
    return (
      <Combobox
        aria-label="Shipping method"
        clearable={false}
        options={SHIPPING}
        value={value}
        onChange={setValue}
      />
    );
  }
};

export const Hierarchical: Story = {
  render: () => {
    const [value, setValue] = useState<ComboboxOption | null>(null);
    return (
      <>
        <Combobox
          aria-label="Category"
          placeholder="Search or browse categories"
          options={HIERARCHY}
          value={value}
          onChange={setValue}
        />
        <Selected text={`Selected: ${value?.label ?? "none"}`} />
      </>
    );
  }
};

export const HierarchicalWithValue: Story = {
  render: () => {
    const [value, setValue] = useState<ComboboxOption | null>({
      value: "fashion-accessories",
      label: "Accessories"
    });
    return (
      <Combobox
        aria-label="Category"
        options={HIERARCHY}
        value={value}
        onChange={setValue}
      />
    );
  }
};

export const HierarchicalMultiple: Story = {
  render: () => {
    const [value, setValue] = useState<ComboboxOption[]>([
      { value: "fashion-accessories", label: "Accessories" },
      { value: "electronics-accessories", label: "Accessories" },
      { value: "phones", label: "Phones" }
    ]);
    return (
      <Combobox
        multiple
        aria-label="Categories"
        options={HIERARCHY}
        value={value}
        onChange={setValue}
      />
    );
  }
};

export const HierarchicalParentsNotSelectable: Story = {
  render: () => (
    <Combobox
      aria-label="Category"
      selectableBranches={false}
      options={HIERARCHY}
    />
  )
};

export const SixLevels: Story = {
  render: () => (
    <Combobox
      aria-label="Category"
      options={[buildDeepTree(1)]}
      selectableBranches={false}
    />
  )
};

export const LongPathValue: Story = {
  render: () => {
    const [value, setValue] = useState<ComboboxOption | null>(
      LONG_PATH[0].children?.[0].children?.[0] ?? null
    );
    return (
      <Combobox
        aria-label="Category"
        options={LONG_PATH}
        value={value}
        onChange={setValue}
      />
    );
  }
};

export const Disabled: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="2">
      <Combobox
        aria-label="Category"
        disabled
        defaultValue={CATEGORIES[1]}
        options={CATEGORIES}
      />
      <Combobox
        multiple
        aria-label="Categories"
        disabled
        defaultValue={CATEGORIES.slice(0, 2)}
        options={CATEGORIES}
      />
    </Box>
  )
};

export const Appearances: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="2">
      {(["neutral", "success", "warning", "danger"] as const).map(
        (appearance) => (
          <Combobox
            key={appearance}
            aria-label={appearance}
            appearance={appearance}
            placeholder={appearance}
            options={CATEGORIES}
          />
        )
      )}
    </Box>
  )
};

export const WithLabelAndHelpText: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="1">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="combobox-field">
        <Text fontSize="caption" color="neutral-textHigh">
          Category
        </Text>
      </label>
      <Combobox
        id="combobox-field"
        aria-describedby="combobox-field-help"
        options={CATEGORIES}
      />
      <Text id="combobox-field-help" fontSize="caption" color="neutral-textLow">
        The help text belongs to the surrounding form field, not to the
        Combobox.
      </Text>
    </Box>
  )
};

export const InForm: Story = {
  render: () => {
    const [submitted, setSubmitted] = useState("");
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          setSubmitted(
            `category=${data.getAll("category").join("|")} tags=${data
              .getAll("tags")
              .join("|")}`
          );
        }}
      >
        <Box display="flex" flexDirection="column" gap="2">
          <Combobox
            aria-label="Category"
            name="category"
            required
            options={CATEGORIES}
          />
          <Combobox
            multiple
            aria-label="Tags"
            name="tags"
            required
            options={CATEGORIES}
          />
          <Button type="submit">Submit</Button>
          <Text fontSize="caption" color="neutral-textLow">
            {submitted || "Nothing submitted yet"}
          </Text>
        </Box>
      </form>
    );
  }
};

export const TranslatedLabels: Story = {
  render: () => (
    <Combobox
      multiple
      aria-label="Categorías"
      placeholder="Buscar categorías"
      options={HIERARCHY}
      defaultValue={[
        { value: "phones", label: "Phones" },
        { value: "toys", label: "Toys" }
      ]}
      labels={{
        back: "Volver",
        backTo: "Volver a {name}",
        branchHint: "tiene subcategorías",
        clearAll: "Borrar todo",
        removeChip: "Quitar {name}",
        noResults: "Sin resultados",
        results: "Resultados",
        create: 'Crear "{text}"',
        required: "Elegí un valor"
      }}
    />
  )
};

export const InsideModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal open={open} onDismiss={() => setOpen(false)}>
          <Modal.Header title="Pick a category" />
          <Modal.Body>
            <Combobox
              aria-label="Category"
              placeholder="Search a category"
              options={HIERARCHY}
            />
            <Box height="220px" />
          </Modal.Body>
        </Modal>
      </>
    );
  }
};

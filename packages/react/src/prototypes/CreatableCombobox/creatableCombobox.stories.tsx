import React, { useId, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { Title } from "@nimbus-ds/title";
import { Button } from "@nimbus-ds/button";

import { CreatableCombobox } from "./CreatableCombobox";
import { ENRICHED_OPTIONS, TREE_OPTIONS } from "./useSharedOptions";

const STORAGE_KEY = "nimbus-prototype:creatable-combobox:options";

/**
 * Help text lives outside the combobox, as with Nimbus's other form controls
 * (`Input`, `Select`, `MultiSelect` have no help-text prop; the patterns'
 * `FormField` renders a caption `Text` below them). The control is described
 * by it through the standard `aria-describedby` pass-through.
 */
const WithHelpText = ({
  text,
  children,
}: {
  text?: React.ReactNode;
  children: (describedBy: string | undefined) => React.ReactNode;
}) => {
  const helpId = useId();
  return (
    <Box display="flex" flexDirection="column" gap="1" width="100%">
      {children(text ? helpId : undefined)}
      {text && (
        <Text id={helpId} fontSize="caption" color="neutral-textLow">
          {text}
        </Text>
      )}
    </Box>
  );
};

const meta: Meta<typeof CreatableCombobox> = {
  title: "Prototypes/CreatableCombobox",
  component: CreatableCombobox,
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    allowCreate: { control: "boolean" },
    name: { control: "text" },
    required: { control: "boolean" },
    multiple: { control: "boolean" },
    options: { control: false },
  },
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CreatableCombobox>;
// The Playground adds story-only controls on top of the component props
// (`helperText` is rendered by the story, not by the component):
// `hierarchical` swaps it to the 5-level drill-down tree (Figma node
// 72:16583); `enriched` swaps the field to a fixed list of options that carry a
// subtitle and/or a tag (Figma node 149:11359).
type PlaygroundStory = StoryObj<
  React.ComponentProps<typeof CreatableCombobox> & {
    enriched?: boolean;
    hierarchical?: boolean;
    helperText?: string;
  }
>;

/**
 * Internal working view — use the controls to explore props and states.
 * Deliberately has no "Selected: …" readout: an earlier iteration had one
 * here, and it read as the field's helper text changing on selection —
 * exactly the thing help text is supposed to never do. The selected
 * value is already visible in the field itself.
 *
 * Try the keyboard here: ArrowDown/ArrowUp move the active (highlighted)
 * option without touching the mouse-hover highlight, Home/End jump to the
 * first/last option, Enter activates whatever is currently active — not
 * just the first match — and Escape closes the list.
 */
export const Playground: PlaygroundStory = {
  argTypes: {
    enriched: { control: "boolean" },
    hierarchical: { control: "boolean" },
    helperText: { control: "text" },
  },
  args: {
    placeholder: "Search or create a tag",
    disabled: false,
    // Deliberately unrelated to any selection — the help text is an
    // independent, optional caption rendered by the story. Try changing it in the controls, then
    // select or create a tag: it stays exactly as you left it.
    helperText: "Existing tags only — new ones need approval.",
    allowCreate: true,
    name: "",
    required: false,
    multiple: false,
    enriched: false,
    hierarchical: false,
  },
  render: ({ enriched, hierarchical, helperText, ...args }) => {
    return (
      <Box
        display="flex"
        flexDirection="column"
        gap="4"
        width="100%"
        maxWidth="320px"
      >
        <WithHelpText text={helperText}>
          {(describedBy) => (
            <CreatableCombobox
              {...args}
              options={
                hierarchical
                  ? TREE_OPTIONS
                  : enriched
                  ? ENRICHED_OPTIONS
                  : undefined
              }
              selectableBranches={hierarchical}
              aria-describedby={describedBy}
              data-testid="playground-combobox"
            />
          )}
        </WithHelpText>
        <Button
          appearance="neutral"
          onClick={() => {
            try {
              window.localStorage.removeItem(STORAGE_KEY);
              window.location.reload();
            } catch {
              // storage may be unavailable — nothing to reset then
            }
          }}
        >
          Reset shared options (mocked store)
        </Button>
      </Box>
    );
  },
};

/**
 * The shareable, no-chrome experience — this is the direct preview link
 * handed out for feedback.
 */
export const FullScreen: Story = {
  name: "Full screen",
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
  },
  render: () => {
    const [submitted, setSubmitted] = useState<Record<
      string,
      string | string[]
    > | null>(null);

    return (
      <Box padding="8" display="flex" flexDirection="column" gap="8">
        <Box display="flex" flexDirection="column" gap="2">
          <Title as="h3">Creatable tag field (prototype)</Title>
          <Text color="neutral-textLow">
            Type to filter existing tags. If nothing matches, choose
            &quot;Create&quot; to add and select a brand-new one. Once a tag is
            selected, use the × button to clear it and search again. The
            selected value shows in the field itself — the caption below each
            field is independent helper text, not an echo of it.
          </Text>
          <Text color="neutral-textLow">
            Keyboard: ArrowDown/ArrowUp move the active (highlighted) option —
            distinct from mouse hover — Home/End jump to the first/last option,
            Enter activates whichever is active, Escape closes.
          </Text>
        </Box>

        {/* A real <form>: Field A and B contribute to its FormData through
            their hidden inputs (`name="tagA"`/`name="tagB"`), and Field A's
            `required` blocks submission — with the browser's own native
            validation bubble — until something is selected or created. */}
        <Box
          as="form"
          display="flex"
          flexDirection="column"
          gap="6"
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            // tagsD (multiselect) contributes one entry per selected chip,
            // all sharing the same `name` — getAll collects every value,
            // where a plain entries() would silently keep only the last one.
            const result: Record<string, string | string[]> = {};
            for (const key of new Set(data.keys())) {
              const values = data.getAll(key) as string[];
              result[key] = values.length > 1 ? values : values[0];
            }
            setSubmitted(result);
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            gap="2"
            width="100%"
            maxWidth="360px"
          >
            <label htmlFor="field-a-input">
              <Text fontWeight="bold">Field A (required)</Text>
            </label>
            <WithHelpText text="Existing tags are shared with Field B.">
              {(describedBy) => (
                <CreatableCombobox
                  data-testid="field-a"
                  id="field-a-input"
                  placeholder="Search or create a tag"
                  name="tagA"
                  required
                  aria-describedby={describedBy}
                />
              )}
            </WithHelpText>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            gap="2"
            width="100%"
            maxWidth="360px"
          >
            <label htmlFor="field-b-input">
              <Text fontWeight="bold">
                Field B (shares the same option list)
              </Text>
            </label>
            <WithHelpText text="A tag created here appears in Field A too.">
              {(describedBy) => (
                <CreatableCombobox
                  data-testid="field-b"
                  id="field-b-input"
                  placeholder="Search or create a tag"
                  name="tagB"
                  aria-describedby={describedBy}
                />
              )}
            </WithHelpText>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            gap="2"
            width="100%"
            maxWidth="360px"
          >
            <label htmlFor="field-c-input">
              <Text fontWeight="bold">Field C (existing tags only)</Text>
            </label>
            <WithHelpText text="This field can't create new tags — allowCreate is false.">
              {(describedBy) => (
                <CreatableCombobox
                  data-testid="field-c"
                  id="field-c-input"
                  placeholder="Search a tag"
                  allowCreate={false}
                  name="tagC"
                  aria-describedby={describedBy}
                />
              )}
            </WithHelpText>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            gap="2"
            width="100%"
            maxWidth="360px"
          >
            <label htmlFor="field-d-input">
              <Text fontWeight="bold">Field D (multiselect)</Text>
            </label>
            <WithHelpText text="Pick as many as you like — the list stays open, and Backspace on an empty query drops the last tag.">
              {(describedBy) => (
                <CreatableCombobox
                  data-testid="field-d"
                  id="field-d-input"
                  placeholder="Search or create tags"
                  name="tagsD"
                  multiple
                  aria-describedby={describedBy}
                />
              )}
            </WithHelpText>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            gap="2"
            width="100%"
            maxWidth="360px"
          >
            <label htmlFor="field-e-input">
              <Text fontWeight="bold">Field E (enriched options, single)</Text>
            </label>
            <WithHelpText text="Title + subtitle + tag per row; the tag also shows in the field once picked. Filtering is by title only.">
              {(describedBy) => (
                <CreatableCombobox
                  data-testid="field-e"
                  id="field-e-input"
                  placeholder="Search a customer"
                  options={ENRICHED_OPTIONS}
                  name="customerE"
                  aria-describedby={describedBy}
                />
              )}
            </WithHelpText>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            gap="2"
            width="100%"
            maxWidth="360px"
          >
            <label htmlFor="field-f-input">
              <Text fontWeight="bold">
                Field F (enriched options, multiselect)
              </Text>
            </label>
            <WithHelpText text="Same enriched rows; picked options become title-only chips.">
              {(describedBy) => (
                <CreatableCombobox
                  data-testid="field-f"
                  id="field-f-input"
                  placeholder="Search customers"
                  options={ENRICHED_OPTIONS}
                  name="customersF"
                  multiple
                  aria-describedby={describedBy}
                />
              )}
            </WithHelpText>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            gap="2"
            width="100%"
            maxWidth="480px"
          >
            <label htmlFor="field-g-input">
              <Text fontWeight="bold">
                Field G (hierarchical, up to 5 levels)
              </Text>
            </label>
            <WithHelpText text="Esta categoría es solo visible para Google, no para tus clientes.">
              {(describedBy) => (
                <CreatableCombobox
                  data-testid="field-g"
                  id="field-g-input"
                  placeholder="Buscar categoría"
                  options={TREE_OPTIONS}
                  selectableBranches
                  labels={{
                    back: "Volver",
                    backTo: "Volver a {name}",
                    in: "en",
                    branchHint: "tiene subcategorías",
                    noResults: "Sin resultados",
                    results: "Resultados",
                  }}
                  name="categoryG"
                  aria-describedby={describedBy}
                />
              )}
            </WithHelpText>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            gap="2"
            width="100%"
            maxWidth="480px"
          >
            <label htmlFor="field-h-input">
              <Text fontWeight="bold">
                H — Multi-select hierarchical categories
              </Text>
            </label>
            <WithHelpText text="Elegí varias: cada categoría padre se selecciona desde su propia sección.">
              {(describedBy) => (
                <CreatableCombobox
                  data-testid="field-h"
                  id="field-h-input"
                  placeholder="Buscar categorías"
                  options={TREE_OPTIONS}
                  selectableBranches
                  multiple
                  labels={{
                    back: "Volver",
                    backTo: "Volver a {name}",
                    in: "en",
                    branchHint: "tiene subcategorías",
                    noResults: "Sin resultados",
                    results: "Resultados",
                    clearAll: "Limpiar selección",
                  }}
                  name="categoriesH"
                  aria-describedby={describedBy}
                />
              )}
            </WithHelpText>
          </Box>

          <Box>
            <Button type="submit">Submit</Button>
          </Box>

          {submitted && (
            <Box padding="2" backgroundColor="neutral-surface" borderRadius="2">
              <Text fontSize="caption" color="neutral-textLow">
                Submitted FormData: {JSON.stringify(submitted)}
              </Text>
            </Box>
          )}
        </Box>

        <Text fontSize="caption" color="neutral-textLow">
          Try creating a new tag in Field A, then open Field B — the new tag is
          already there. This is a mocked, browser-local stand-in for a real
          shared backend; see the pull request for details.
        </Text>
      </Box>
    );
  },
};

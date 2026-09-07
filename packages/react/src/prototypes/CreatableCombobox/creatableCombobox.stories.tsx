import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { Title } from "@nimbus-ds/title";
import { Button } from "@nimbus-ds/button";

import { CreatableCombobox } from "./CreatableCombobox";
import type { ComboboxOption } from "./useSharedOptions";

const STORAGE_KEY = "nimbus-prototype:creatable-combobox:options";

const meta: Meta<typeof CreatableCombobox> = {
  title: "Prototypes/CreatableCombobox",
  component: CreatableCombobox,
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    helperText: { control: "text" },
  },
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CreatableCombobox>;

/** Internal working view — use the controls to explore props and states. */
export const Playground: Story = {
  args: {
    placeholder: "Search or create a tag",
    disabled: false,
    // Deliberately unrelated to any selection — helperText is an
    // independent, optional caption. Try changing it in the controls, then
    // select or create a tag: it stays exactly as you left it.
    helperText: "Existing tags only — new ones need approval.",
  },
  render: (args) => {
    const [selected, setSelected] = useState<ComboboxOption | null>(null);

    return (
      <Box display="flex" flexDirection="column" gap="4" width="320px">
        <CreatableCombobox
          {...args}
          data-testid="playground-combobox"
          onChange={setSelected}
        />
        {/* A debug readout for exploring the story, not the field's own
            helper text (see the `helperText` control above) — kept
            visually separate on purpose. */}
        <Box padding="2" backgroundColor="neutral-surface" borderRadius="2">
          <Text fontSize="caption" color="neutral-textLow">
            Debug — selected: <strong>{selected ? selected.label : "None"}</strong>
          </Text>
        </Box>
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
    return (
      <Box padding="8" display="flex" flexDirection="column" gap="8">
        <Box display="flex" flexDirection="column" gap="2">
          <Title as="h3">Creatable tag field (prototype)</Title>
          <Text color="neutral-textLow">
            Type to filter existing tags. If nothing matches, choose
            &quot;Create&quot; to add and select a brand-new one. Once a tag
            is selected, use the × button to clear it and search again. The
            selected value shows in the field itself — the caption below
            each field is independent helper text, not an echo of it.
          </Text>
        </Box>

        <Box display="flex" flexDirection="column" gap="2" width="360px">
          <Text fontWeight="bold">Field A</Text>
          <CreatableCombobox
            data-testid="field-a"
            placeholder="Search or create a tag"
            helperText="Existing tags are shared with Field B."
          />
        </Box>

        <Box display="flex" flexDirection="column" gap="2" width="360px">
          <Text fontWeight="bold">Field B (shares the same option list)</Text>
          <CreatableCombobox
            data-testid="field-b"
            placeholder="Search or create a tag"
            helperText="A tag created here appears in Field A too."
          />
        </Box>

        <Text fontSize="caption" color="neutral-textLow">
          Try creating a new tag in Field A, then open Field B — the new tag
          is already there. This is a mocked, browser-local stand-in for a
          real shared backend; see the pull request for details.
        </Text>
      </Box>
    );
  },
};

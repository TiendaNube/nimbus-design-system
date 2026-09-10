import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { Title } from "@nimbus-ds/title";
import { Button } from "@nimbus-ds/button";

import { CreatableCombobox } from "./CreatableCombobox";

const STORAGE_KEY = "nimbus-prototype:creatable-combobox:options";

const meta: Meta<typeof CreatableCombobox> = {
  title: "Prototypes/CreatableCombobox",
  component: CreatableCombobox,
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    helperText: { control: "text" },
    allowCreate: { control: "boolean" },
    name: { control: "text" },
    required: { control: "boolean" },
  },
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CreatableCombobox>;

/**
 * Internal working view — use the controls to explore props and states.
 * Deliberately has no "Selected: …" readout: an earlier iteration had one
 * here, and it read as the field's helper text changing on selection —
 * exactly the thing `helperText` is supposed to never do. The selected
 * value is already visible in the field itself.
 *
 * Try the keyboard here: ArrowDown/ArrowUp move the active (highlighted)
 * option without touching the mouse-hover highlight, Home/End jump to the
 * first/last option, Enter activates whatever is currently active — not
 * just the first match — and Escape closes the list.
 */
export const Playground: Story = {
  args: {
    placeholder: "Search or create a tag",
    disabled: false,
    // Deliberately unrelated to any selection — helperText is an
    // independent, optional caption. Try changing it in the controls, then
    // select or create a tag: it stays exactly as you left it.
    helperText: "Existing tags only — new ones need approval.",
    allowCreate: true,
    name: "",
    required: false,
  },
  render: (args) => {
    return (
      <Box display="flex" flexDirection="column" gap="4" width="320px">
        <CreatableCombobox {...args} data-testid="playground-combobox" />
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
    const [submitted, setSubmitted] = useState<Record<string, string> | null>(
      null
    );

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
          <Text color="neutral-textLow">
            Keyboard: ArrowDown/ArrowUp move the active (highlighted) option
            — distinct from mouse hover — Home/End jump to the first/last
            option, Enter activates whichever is active, Escape closes.
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
            setSubmitted(Object.fromEntries(data.entries()) as Record<
              string,
              string
            >);
          }}
        >
          <Box display="flex" flexDirection="column" gap="2" width="360px">
            <Text fontWeight="bold">Field A (required)</Text>
            <CreatableCombobox
              data-testid="field-a"
              placeholder="Search or create a tag"
              helperText="Existing tags are shared with Field B."
              name="tagA"
              required
            />
          </Box>

          <Box display="flex" flexDirection="column" gap="2" width="360px">
            <Text fontWeight="bold">
              Field B (shares the same option list)
            </Text>
            <CreatableCombobox
              data-testid="field-b"
              placeholder="Search or create a tag"
              helperText="A tag created here appears in Field A too."
              name="tagB"
            />
          </Box>

          <Box display="flex" flexDirection="column" gap="2" width="360px">
            <Text fontWeight="bold">Field C (existing tags only)</Text>
            <CreatableCombobox
              data-testid="field-c"
              placeholder="Search a tag"
              helperText="This field can't create new tags — allowCreate is false."
              allowCreate={false}
              name="tagC"
            />
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
          Try creating a new tag in Field A, then open Field B — the new tag
          is already there. This is a mocked, browser-local stand-in for a
          real shared backend; see the pull request for details.
        </Text>
      </Box>
    );
  },
};

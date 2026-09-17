import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Atomic/Select",
  component: Select,
  argTypes: {
    name: {
      control: { type: "text" },
      description: "Name of the native select element.",
      table: { type: { summary: "string" } },
    },
    id: {
      control: { type: "text" },
      description: "Unique identifier of the native select element.",
      table: { type: { summary: "string" } },
    },
    children: {
      control: { disable: true },
      description: "Options or option groups rendered inside the select.",
      table: { type: { summary: "React.ReactNode" } },
    },
    appearance: {
      control: { type: "select" },
      options: [
        "neutral",
        "success",
        "warning",
        "danger",
        "ai-generative",
      ],
      description: "Controls the visual appearance of the select.",
      table: {
        type: {
          summary:
            '"neutral" | "success" | "warning" | "danger" | "ai-generative"',
        },
        defaultValue: { summary: '"neutral"' },
      },
    },
    aiGenerated: {
      control: { type: "boolean" },
      description:
        "Applies the AI-generated appearance and active AI focus shadow, taking precedence over `appearance`.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["medium", "small"],
      description:
        "Controls the visual size with `medium` or `small`. Numeric values are forwarded to the native `size` attribute and keep the medium visual style.",
      table: {
        type: { summary: '"medium" | "small" | number' },
        defaultValue: { summary: '"medium"' },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disables the select and prevents user interaction.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select>;

const basicOptions = (
  <>
    <Select.Option label="Option 1" value="Option 1" />
    <Select.Option label="Option 2" value="Option 2" />
    <Select.Option label="Option 3" value="Option 3" />
  </>
);

export const basic: Story = {
  args: {
    name: "Name",
    id: "Id",
    appearance: "neutral",
    disabled: false,
    children: basicOptions,
  },
};

export const medium: Story = {
  args: {
    ...basic.args,
    size: "medium",
  },
};

export const small: Story = {
  args: {
    ...basic.args,
    size: "small",
  },
};

export const withGroups: Story = {
  args: {
    name: "Name",
    id: "Id",
    appearance: "neutral",
    disabled: false,
    children: (
      <>
        <Select.Group label="Group 1">
          <Select.Option
            label="This option is selected"
            selected
            value="Option 1"
          />
          <Select.Option
            label="This option is disabled"
            disabled
            value="Option 2"
          />
          <Select.Option label="Option 3" value="Option 3" />
        </Select.Group>
        <Select.Group label="Group 2">
          <Select.Option label="Option 4" value="Option 4" />
          <Select.Option label="Option 5" value="Option 5" />
          <Select.Option label="Option 6" value="Option 6" />
        </Select.Group>
      </>
    ),
  },
};

export const withoutGroups: Story = {
  args: {
    name: "Name",
    id: "Id",
    appearance: "neutral",
    children: (
      <>
        <Select.Option
          label="This option is selected"
          selected
          value="Option 1"
        />
        <Select.Option
          label="This option is disabled"
          disabled
          value="Option 2"
        />
        <Select.Option label="Option 3" value="Option 3" />
        <Select.Option label="Option 4" value="Option 4" />
        <Select.Option label="Option 5" value="Option 5" />
        <Select.Option label="Option 6" value="Option 6" />
      </>
    ),
  },
};

export const withPlaceholderOption: Story = {
  args: {
    name: "Name",
    id: "Id",
    appearance: "neutral",
    children: (
      <>
        <Select.Option
          label="This option is a placeholder"
          value="Option 1"
          disabled
          selected
        />
        <Select.Option label="Option 2" value="Option 2" />
        <Select.Option label="Option 3" value="Option 3" />
        <Select.Option label="Option 4" value="Option 4" />
        <Select.Option label="Option 5" value="Option 5" />
        <Select.Option label="Option 6" value="Option 6" />
      </>
    ),
  },
};

export const aiGenerative: Story = {
  args: {
    name: "Name",
    id: "Id",
    appearance: "ai-generative",
    children: (
      <>
        <Select.Option label="AI generated option 1" value="Option 1" />
        <Select.Option label="AI generated option 2" value="Option 2" />
        <Select.Option label="AI generated option 3" value="Option 3" />
      </>
    ),
  },
};

export const aiGenerated: Story = {
  args: {
    name: "Name",
    id: "Id",
    aiGenerated: true,
    children: (
      <>
        <Select.Option label="AI-generated content option 1" value="Option 1" />
        <Select.Option label="AI-generated content option 2" value="Option 2" />
        <Select.Option label="AI-generated content option 3" value="Option 3" />
        <Select.Option label="AI-generated content option 4" value="Option 4" />
      </>
    ),
  },
};

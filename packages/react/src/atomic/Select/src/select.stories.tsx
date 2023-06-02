import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Atomic/Select",
  component: Select,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const basic: Story = {
  args: {
    name: "Name",
    id: "Id",
    appearance: "neutral",
    disabled: false,
    children: (
      <>
        <Select.Option label="Option 1" value="Option 1" />
        <Select.Option label="Option 2" value="Option 2" />
        <Select.Option label="Option 3" value="Option 3" />
      </>
    ),
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

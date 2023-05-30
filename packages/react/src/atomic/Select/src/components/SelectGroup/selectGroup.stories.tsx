import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Select } from "../../Select";

const meta: Meta<typeof Select.Group> = {
  title: "Atomic/Select/Select.Group",
  component: Select.Group,
  render: (args) => (
    <Select name="Name" id="Id" appearance="neutral">
      <Select.Group {...args} />
    </Select>
  ),
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select.Group>;

export const basic: Story = {
  args: {
    label: "Group 1",
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
      </>
    ),
  },
};

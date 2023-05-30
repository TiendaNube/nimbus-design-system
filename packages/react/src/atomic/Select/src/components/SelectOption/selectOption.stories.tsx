import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Select } from "../../Select";

const meta: Meta<typeof Select.Option> = {
  title: "Atomic/Select/Select.Option",
  component: Select.Option,
  render: (args) => (
    <Select name="Name" id="Id" appearance="neutral">
      <Select.Option {...args} />
    </Select>
  ),
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select.Option>;

export const basic: Story = {
  args: {
    label: "This option is selected",
    value: "Option 1",
  },
};

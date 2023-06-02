import type { Meta, StoryObj } from "@storybook/react";

import { Radio } from "./Radio";

const meta: Meta<typeof Radio> = {
  title: "Atomic/Radio",
  component: Radio,
  argTypes: {
    children: { label: { type: "text" } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const basic: Story = {
  args: { label: "Label" },
};

export const disabled: Story = {
  args: {
    disabled: true,
    label: "Disabled",
  },
};

export const button: Story = {
  args: {
    as: "button",
    label: "Button",
  },
};

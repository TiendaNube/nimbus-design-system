import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Atomic/Toggle",
  component: Toggle,
  argTypes: {
    children: { control: { type: "text" } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const basic: Story = {
  args: {},
};

export const active: Story = {
  args: {
    active: true,
  },
};

export const label: Story = {
  args: {
    label: "Label",
  },
};

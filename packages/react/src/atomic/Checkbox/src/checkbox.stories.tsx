import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Atomic/Checkbox/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const basic: Story = {
  args: {
    label: "Label",
  },
};

export const indeterminate: Story = {
  args: {
    indeterminate: true,
    label: "Indeterminate",
  },
};

export const disabled: Story = {
  args: {
    checked: true,
    disabled: true,
    label: "Disabled",
  },
};

export const danger: Story = {
  args: {
    appearance: "danger",
    label: "Danger",
  },
};

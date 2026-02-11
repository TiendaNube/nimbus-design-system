import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { MultiSelect } from "./MultiSelect";

const meta: Meta<typeof MultiSelect> = {
  title: "Atomic/MultiSelect",
  component: MultiSelect,
  args: {
    onChange: fn(),
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const basic: Story = {
  args: {
    appearance: "neutral",
    disabled: false,
    placeholder: "Placeholder",
    value: [
      {
        label: "Option 1",
        value: "option-1",
      },
    ],
    options: [
      {
        label: "Option 1",
        value: "option-1",
      },
      {
        label: "Option 2",
        value: "option-2",
      },
      {
        label: "Option 3",
        value: "option-3",
      },
    ],
  },
};

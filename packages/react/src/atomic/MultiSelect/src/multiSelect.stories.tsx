import type { Meta, StoryObj } from "@storybook/react";

import { MultiSelect } from "./MultiSelect";

const meta: Meta<typeof MultiSelect> = {
  title: "Atomic/MultiSelect",
  component: MultiSelect,

  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const basic: Story = {
  args: {
    appearance: "neutral",
    disabled: false,
    placeholder: "Placeholder",
    options: [
      {
        label: "Option 1",
        value: "Option 1",
      },
      {
        label: "Option 2",
        value: "Option 2",
      },
      {
        label: "Option 3",
        value: "Option 3",
      },
    ],
  },
};

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { ProgressBar } from "./ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  title: "Atomic/ProgressBar",
  component: ProgressBar,
  parameters: {
    docs: {
      description: {
        component:
          "The ProgressBar component is used to display the progress of an operation or task in a visual format.",
      },
    },
  },
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "The progression value between 0 and 100.",
    },
    appearance: {
      control: { type: "select" },
      options: ["neutral", "primary", "success", "warning", "danger", "ai-interactive"],
      description: "Change the visual style of the progress bar.",
    },
  },
  render: (args) => <Box maxWidth="250px"><ProgressBar {...args} /></Box>,  
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    value: 50,
    appearance: "neutral",
  },
};

export const Primary: Story = {
  args: {
    value: 75,
    appearance: "primary",
  },
};

export const Success: Story = {
  args: {
    value: 100,
    appearance: "success",
  },
};

export const Warning: Story = {
  args: {
    value: 30,
    appearance: "warning",
  },
};

export const Danger: Story = {
  args: {
    value: 15,
    appearance: "danger",
  },
};

export const AIInteractive: Story = {
  args: {
    value: 60,
    appearance: "ai-interactive",
  },
};

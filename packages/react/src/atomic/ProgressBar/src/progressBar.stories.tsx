import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
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
      options: [
        "neutral",
        "primary",
        "success",
        "warning",
        "danger",
        "ai-gradient",
      ],
      description: "Change the visual style of the progress bar.",
    },
  },
  render: (args) => (
    <Box maxWidth="250px">
      <ProgressBar {...args} />
    </Box>
  ),
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    value: 50,
    appearance: "neutral",
  },
};

export const AllVariants: Story = {
  argTypes: {
    appearance: {
      control: { disable: true },
    },
  },
  render: ({ value }) => (
    <Box display="flex" flexDirection="column" gap="4" maxWidth="300px">
      <Box>
        <Text>Primary</Text>
        <ProgressBar value={value} appearance="primary" />
      </Box>
      <Box>
        <Text>Success</Text>
        <ProgressBar value={value} appearance="success" />
      </Box>
      <Box>
        <Text>Warning</Text>
        <ProgressBar value={value} appearance="warning" />
      </Box>
      <Box>
        <Text>Danger</Text>
        <ProgressBar value={value} appearance="danger" />
      </Box>
      <Box>
        <Text>Neutral</Text>
        <ProgressBar value={value} appearance="neutral" />
      </Box>
      <Box>
        <Text>AI Gradient</Text>
        <ProgressBar value={value} appearance="ai-gradient" />
      </Box>
    </Box>
  ),
};

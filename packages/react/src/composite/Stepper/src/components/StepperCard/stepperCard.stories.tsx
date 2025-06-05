import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { StepperCard } from "./StepperCard";
import { Text } from "@nimbus-ds/text";
import { Box } from "@nimbus-ds/box";

const meta: Meta<typeof StepperCard> = {
  title: "Composite/Stepper/StepperCard",
  component: StepperCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof StepperCard>;

export const Basic: Story = {
  render: () => (
    <StepperCard>
      <Text>This content is wrapped in a Card with small padding</Text>
    </StepperCard>
  ),
};

export const WithMultipleElements: Story = {
  render: () => (
    <StepperCard>
      <Box display="flex" flexDirection="column" gap="2">
        <Text fontSize="base" fontWeight="medium">
          Card Container Example
        </Text>
        <Text fontSize="caption" color="neutral-textLow">
          This demonstrates the StepperCard component wrapping multiple elements.
        </Text>
      </Box>
    </StepperCard>
  ),
}; 

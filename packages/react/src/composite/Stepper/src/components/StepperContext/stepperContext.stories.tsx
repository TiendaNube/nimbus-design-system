import React, { useContext } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { StepperContext } from "./StepperContext";

// Demo component to show context usage
const ContextConsumer = () => {
  const { totalSteps } = useContext(StepperContext);
  return (
    <Box padding="4" borderWidth="1" borderStyle="solid" borderColor="neutral-interactive">
      <Text>Total steps from context: {totalSteps}</Text>
    </Box>
  );
};

const meta: Meta<typeof StepperContext.Provider> = {
  title: "Composite/Stepper/StepperContext",
  component: StepperContext.Provider,
  render: (args) => (
    <StepperContext.Provider {...args}>
      <ContextConsumer />
    </StepperContext.Provider>
  ),
  argTypes: {
    value: {
      control: { disable: true },
      description: "The context value to provide to child components",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StepperContext.Provider>;

export const Default: Story = {
  args: {
    value: {
      totalSteps: 5,
      activeStep: 1,
      selectedStep: 1,
    },
  },
};

export const SingleStep: Story = {
  args: {
    value: {
      totalSteps: 1,
      activeStep: 1,
      selectedStep: 1,
    },
  },
};

export const ManySteps: Story = {
  args: {
    value: {
      totalSteps: 10,
      activeStep: 1,
      selectedStep: 1,
    },
  },
}; 
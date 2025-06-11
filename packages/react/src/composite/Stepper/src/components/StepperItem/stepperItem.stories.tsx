import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Stepper } from "../../Stepper";

const currentStep = 0;

const meta: Meta<
  typeof Stepper.Item & { currentStep: number; totalSteps: number }
> = {
  title: "Composite/Stepper/Stepper.Item",
  component: Stepper.Item,
  render: (args) => (
    <Stepper activeStep={currentStep}>
      <Stepper.Item {...args} />
    </Stepper>
  ),
  argTypes: {
    label: {
      control: "text",
      description: "The label text for the step",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Stepper.Item>;

export const Selected: Story = {
  args: {
    label: "Selected step",
  },
  render: (args) => (
    <Stepper activeStep={0}>
      <Stepper.Item {...args} />
    </Stepper>
  ),
};

export const Completed: Story = {
  args: {
    label: "Completed step",
  },
  render: (args) => (
    <Stepper activeStep={1} onSelectStep={() => undefined} selectedStep={1}>
      <Stepper.Item {...args} />
    </Stepper>
  ),
};

export const Pending: Story = {
  args: {
    label: "Pending step",
  },
  render: (args) => (
    <Stepper activeStep={-1}>
      <Stepper.Item {...args} />  
    </Stepper>
  ),
};

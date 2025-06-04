import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Stepper } from "../../Stepper";

const currentStep = 1;

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

export const Default: Story = {
  args: {
    label: "Step label",
  },
  render: (args) => (
    <Stepper activeStep={currentStep}>
      <Stepper.Item {...args} />
    </Stepper>
  ),
};

export const Selected: Story = {
  args: {
    label: "Selected step",
  },
  render: (args) => (
    <Stepper activeStep={currentStep} selectedStep={1}>
      <Stepper.Item {...args} />
    </Stepper>
  ),
};

export const Pending: Story = {
  args: {
    label: "Pending step",
  },
  render: (args) => (
    <Stepper activeStep={currentStep}>
      <Stepper.Item {...args} />
    </Stepper>
  ),
};
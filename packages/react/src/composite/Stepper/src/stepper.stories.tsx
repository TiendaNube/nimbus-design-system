import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import { Button } from "@nimbus-ds/button";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { Stepper } from "./Stepper";

const meta: Meta<typeof Stepper> = {
  title: "Composite/Stepper",
  component: Stepper,
  argTypes: {
    activeStep: {
      control: { type: "number", min: 1, max: 5 },
      description: "The currently active step (1-based index)",
    },
    selectedStep: {
      control: { type: "number", min: 1, max: 5 },
      description: "The currently selected step (1-based index)",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Stepper>;

const labels = [
  "Select audience",
  "Create content",
  "Define budget",
  "Review",
  "Publish",
];

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState(0);
    const [activeStep, setActiveStep] = useState(0);

    return (
      <Box display="flex" flexDirection="column" gap="3">
        <Text>Selected step: {selected + 1}</Text>
        <Stepper
          activeStep={activeStep}
          selectedStep={selected}
          onSelectStep={(step: number) => setSelected(step)}
          justifyContent="flex-start"
        >
          {labels.map((label) => (
            <Stepper.Item key={label} label={label} />
          ))}
        </Stepper>
        <Button
          onClick={() => {
            setActiveStep(activeStep + 1);
            setSelected(activeStep + 1);
          }}
          disabled={activeStep === labels.length - 1}
        >
          Next
        </Button>
      </Box>
    );
  },
};

export const Uncontrolled: Story = {
  render: () => {
    const [activeStep, setActiveStep] = useState(0);

    return (
      <Box display="flex" flexDirection="column" gap="3">
        <Stepper activeStep={activeStep} justifyContent="flex-start">
          {labels.map((label) => (
            <Stepper.Item key={label} label={label} />
          ))}
        </Stepper>
        <Button
          onClick={() => setActiveStep(activeStep + 1)}
          disabled={activeStep === labels.length - 1}
        >
          Next
        </Button>
      </Box>
    );
  },
};

export const WithCard: Story = {
  render: () => (
    <Stepper.Card>
      <Stepper activeStep={3}>
        <Stepper.Item label="Setup" />
        <Stepper.Item label="Configuration" />
        <Stepper.Item label="Review" />
        <Stepper.Item label="Deploy" />
      </Stepper>
    </Stepper.Card>
  ),
};

export const Mobile: Story = {
  render: () => {
    const [activeStep, setActiveStep] = useState(0);
    const [selected, setSelected] = useState(0);

    return (
      <Box display="flex" flexDirection="column" gap="3">
        <Text>Step {selected + 1}: Description</Text>
        <Stepper
          activeStep={activeStep}
          selectedStep={selected}
          onSelectStep={setSelected}
          justifyContent="flex-start"
        >
          <Stepper.Item />
          <Stepper.Item />
          <Stepper.Item />
          <Stepper.Item />
          <Stepper.Item />
        </Stepper>
        <Button
          onClick={() => {
            setActiveStep(activeStep + 1);
            setSelected(activeStep + 1);
          }}
          disabled={activeStep === 4}
        >
          Next
        </Button>
      </Box>
    );
  },
};

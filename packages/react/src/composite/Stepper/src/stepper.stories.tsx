import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import { Stepper } from "./Stepper";
import { Button } from "@nimbus-ds/button";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";

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

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState(1);
    const [activeStep, setActiveStep] = useState(1);

    const labels = [
      "Select audience",
      "Create content",
      "Define budget",
      "Review",
      "Publish",
    ];

    return (
      <Box display="flex" flexDirection="column" gap="2">
        <Text>Selected step: {selected}</Text>
        <Stepper
          activeStep={activeStep}
          selectedStep={selected}
          onSelectStep={(step: number) => setSelected(step)}
          justifyContent="flex-start"
        >
          {labels.map((label, index) => (
            <Stepper.Item key={index} label={label} />
          ))}
        </Stepper>
        <Button
          onClick={() => {
            setActiveStep(activeStep + 1);
            setSelected(activeStep + 1);
          }}
          disabled={activeStep === labels.length + 1}
        >
          Next
        </Button>
      </Box>
    );
  },
};

export const Uncontrolled: Story = {
  render: () => (
    <Stepper activeStep={2} justifyContent="flex-start">
      <Stepper.Item label="Select audience" />
      <Stepper.Item label="Create content" />
      <Stepper.Item label="Define budget" />
      <Stepper.Item label="Review" />
      <Stepper.Item label="Publish" />
    </Stepper>
  ),
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
    const [activeStep, setActiveStep] = useState(1);
    const [selected, setSelected] = useState(1);

    return (
      <Box display="flex" flexDirection="column" gap="2">
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
          disabled={activeStep === 6}
        >
          Next
        </Button>
      </Box>
    );
  },
};

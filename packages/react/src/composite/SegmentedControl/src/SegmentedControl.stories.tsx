import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { SegmentedControl } from "./SegmentedControl";
import { ControlledSegmentedControlProperties } from "./SegmentedControl.types";

const meta: Meta<typeof SegmentedControl> = {
  title: "Composite/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: "The content of the segmented control",
      control: { disable: true },
    },
    preSelectedSegment: {
      description: "The pre-selected segment index for uncontrolled mode",
      control: "number",
    },
    selected: {
      description: "The selected segment index for controlled mode",
      control: "number",
    },
    onSegmentSelect: {
      description: "Callback when a segment is selected",
      action: "segment selected",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "SegmentedControl is a UI control that lets users choose between multiple exclusive options.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

/**
 * Basic (uncontrolled) usage example of the SegmentedControl component.
 */
export const Basic: Story = {
  render: (args) => (
    <SegmentedControl {...args}>
      {["First", "Second", "Third"].map((label) => (
        <SegmentedControl.Item key={label} label={label}>
          <Box
            borderColor="neutral-interactive"
            borderStyle="dashed"
            borderWidth="1"
            padding="2"
            marginTop="2"
          >
            <Text fontSize="base" textAlign="center">
              Content for {label} segment
            </Text>
          </Box>
        </SegmentedControl.Item>
      ))}
    </SegmentedControl>
  ),
};

/**
 * Example of a SegmentedControl with a pre-selected segment.
 */
export const PreSelected: Story = {
  render: (args) => (
    <SegmentedControl {...args} preSelectedSegment={1}>
      {["Option 1", "Option 2", "Option 3"].map((label) => (
        <SegmentedControl.Item key={label} label={label}>
          <Box
            borderColor="neutral-interactive"
            borderStyle="dashed"
            borderWidth="1"
            padding="2"
            marginTop="2"
          >
            <Text fontSize="base" textAlign="center">
              Preselected content for {label}
            </Text>
          </Box>
        </SegmentedControl.Item>
      ))}
    </SegmentedControl>
  ),
};

/**
 * Example of a controlled SegmentedControl with state management.
 */
export const Controlled: Story = {
  render: (args) => {
    const [selectedSegment, setSelectedSegment] = useState<number>(
      (args as ControlledSegmentedControlProperties).selected || 0
    );

    return (
      <div>
        <div style={{ marginBottom: "16px" }}>
          <Text fontSize="base">Currently selected: {selectedSegment + 1}</Text>
        </div>

        <SegmentedControl
          selected={selectedSegment}
          onSegmentSelect={setSelectedSegment}
        >
          {["First", "Second", "Third"].map((label) => (
            <SegmentedControl.Item key={label} label={label}>
              <Box
                borderColor="neutral-interactive"
                borderStyle="dashed"
                borderWidth="1"
                padding="2"
                marginTop="2"
              >
                <Text fontSize="base" textAlign="center">
                  Controlled content for {label} segment
                </Text>
              </Box>
            </SegmentedControl.Item>
          ))}
        </SegmentedControl>

        <div style={{ marginTop: "16px" }}>
          <Text fontSize="base">
            Try selecting a different segment to see the state update!
          </Text>
        </div>
      </div>
    );
  },
};

/**
 * Example of multiple SegmentedControls working together.
 */
export const Group = () => {
  const options = ["Option 1", "Option 2", "Option 3"];

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <SegmentedControl>
        {options.map((option) => (
          <SegmentedControl.Item key={option} label={option}>
            <Box padding="2" marginTop="2">
              <Text fontSize="base" textAlign="center">
                {option} content
              </Text>
            </Box>
          </SegmentedControl.Item>
        ))}
      </SegmentedControl>
    </div>
  );
};

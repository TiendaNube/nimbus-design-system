import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
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
    selectedSegments: {
      description: "The selected segment index for controlled mode",
      control: "number",
    },
    onSegmentsSelect: {
      description: "Callback when a segment is selected",
      action: "segment selected",
    },
    fullWidth: {
      description: "Whether the segments should span the full width",
      control: "boolean",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "SegmentedControl is a UI control that lets users choose between multiple options. It is a horizontal control that displays a series of segments, each representing a different option. The user can select one or more segments by clicking on them.",
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
      {["First", "Second", "Third"].map((name) => (
        <SegmentedControl.Button key={name} label={name}>
          {name}
        </SegmentedControl.Button>
      ))}
    </SegmentedControl>
  ),
};

/**
 * Example of an uncontrolled SegmentedControl with all segments initially selected.
 * This demonstrates how to create pre-selected segments without using controlled state.
 */
export const UncontrolledAllSelected: Story = {
  render: (args) => (
    <SegmentedControl {...args}>
      {["First", "Second", "Third"].map((name) => (
        <SegmentedControl.Button key={name} label={name} selected>
          {name}
        </SegmentedControl.Button>
      ))}
    </SegmentedControl>
  ),
};

/**
 * Example of a controlled SegmentedControl with state management.
 */
export const Controlled: Story = {
  render: (args) => {
    const [selectedSegment, setSelectedSegment] = useState<number[]>(
      (args as ControlledSegmentedControlProperties).selectedSegments || [0]
    );

    return (
      <div>
        <div style={{ marginBottom: "16px" }}>
          <Text fontSize="base">
            Currently selected: {selectedSegment.join(", ")}
          </Text>
        </div>

        <SegmentedControl
          selectedSegments={selectedSegment}
          onSegmentsSelect={setSelectedSegment}
        >
          {["First", "Second", "Third"].map((name) => (
            <SegmentedControl.Button key={name} label={name}>
              {name}
            </SegmentedControl.Button>
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
export const Group = () => (
  <SegmentedControl>
    <SegmentedControl.Button key="Option 1" label="Option 1">
      Option 1
    </SegmentedControl.Button>
    <SegmentedControl.Button key="Option 2" label="Option 2">
      Option 2
    </SegmentedControl.Button>
    <SegmentedControl.Button key="Option 3" label="Option 3">
      Option 3
    </SegmentedControl.Button>
    <SegmentedControl.Button key="Option 4" label="Option 4" disabled>
      Option 4
    </SegmentedControl.Button>
  </SegmentedControl>
);

export const SkeletonGroup = () => (
  <SegmentedControl>
    <SegmentedControl.ButtonSkeleton width="50px" height="2rem" />
    <SegmentedControl.ButtonSkeleton width="50px" height="2rem" />
    <SegmentedControl.ButtonSkeleton width="50px" height="2rem" />
  </SegmentedControl>
);

/**
 * Example of a SegmentedControl with fullWidth buttons.
 */
export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
  render: (args) => (
    <div style={{ width: "100%" }}>
      <SegmentedControl {...args} flexWrap="nowrap">
        {["First", "Second", "Third"].map((name) => (
          <SegmentedControl.Button key={name} label={name}>
            {name}
          </SegmentedControl.Button>
        ))}
      </SegmentedControl>
    </div>
  ),
};

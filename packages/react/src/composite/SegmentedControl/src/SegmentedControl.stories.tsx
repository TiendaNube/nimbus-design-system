import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Text } from "@nimbus-ds/text";
import { Box } from "@nimbus-ds/box";
import { ScrollPane } from "@nimbus-ds/scroll-pane";
import { SegmentedControl } from "./SegmentedControl";
import { ControlledSegmentedControlProperties } from "./SegmentedControl.types";

// Helper function to render segmented control buttons
const renderSegmentButtons = (names: string[]) =>
  names.map((name) => (
    <SegmentedControl.Button key={name} label={name} id={name}>
      {name}
    </SegmentedControl.Button>
  ));

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
      {renderSegmentButtons(["First", "Second", "Third"])}
    </SegmentedControl>
  ),
};

/**
 * Example of a controlled SegmentedControl with state management.
 */
export const Controlled: Story = {
  render: (args) => {
    const [selectedSegment, setSelectedSegment] = useState<string[]>(
      (args as ControlledSegmentedControlProperties).selectedSegments || [
        "First",
      ]
    );

    return (
      <Box display="flex" flexDirection="column" gap="3">
        <Box mb="3">
          <Text fontSize="base">
            Currently selected: {selectedSegment.join(", ")}
          </Text>
        </Box>

        <ScrollPane display="grid" contentContainerProps={{ flexShrink: "0" }}>
          <SegmentedControl
            selectedSegments={selectedSegment}
            onSegmentsSelect={setSelectedSegment}
            flexWrap="wrap"
          >
            {[
              "First",
              "Second",
              "Third",
              "Fourth",
              "Fifth",
              "Sixth",
              "Seventh",
              "Eighth",
              "Ninth",
              "Tenth",
            ].map((name) => (
              <ScrollPane.Item key={name}>
                <SegmentedControl.Button key={name} label={name} id={name}>
                  {name}
                </SegmentedControl.Button>
              </ScrollPane.Item>
            ))}
          </SegmentedControl>
        </ScrollPane>

        <Box mt="3">
          <Text fontSize="base">
            Try selecting a different segment to see the state update!
          </Text>
        </Box>
      </Box>
    );
  },
};

/**
 * Example of multiple SegmentedControls working together.
 */
export const Group = () => (
  <SegmentedControl>
    <SegmentedControl.Button key="Option 1" label="Option 1" id="Option 1">
      Option 1
    </SegmentedControl.Button>
    <SegmentedControl.Button key="Option 2" label="Option 2" id="Option 2">
      Option 2
    </SegmentedControl.Button>
    <SegmentedControl.Button key="Option 3" label="Option 3" id="Option 3">
      Option 3
    </SegmentedControl.Button>
    <SegmentedControl.Button
      key="Option 4"
      label="Option 4"
      id="Option 4"
      disabled
    >
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
  render: () => (
    <div style={{ width: "100%" }}>
      <SegmentedControl fullWidth flexWrap="nowrap">
        {["First", "Second", "Third"].map((name) => (
          <SegmentedControl.Button key={name} label={name} id={name}>
            {name}
          </SegmentedControl.Button>
        ))}
      </SegmentedControl>
    </div>
  ),
};

/**
 * Example of a SegmentedControl with responsive wrap. Useful for desktop or where we don't want overflow.
 */
export const ResponsiveWrap: Story = {
  render: () => (
    <SegmentedControl flexWrap="wrap">
      {renderSegmentButtons([
        "First",
        "Second",
        "Third",
        "Fourth",
        "Fifth",
        "Sixth",
      ])}
    </SegmentedControl>
  ),
};

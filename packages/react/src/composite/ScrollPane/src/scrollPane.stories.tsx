import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Box } from "@nimbus-ds/box";
import { Card } from "@nimbus-ds/card";
import { Text } from "@nimbus-ds/text";
import { Button } from "@nimbus-ds/button";

import { ScrollPane } from "./ScrollPane";
import { SegmentedControl } from "@nimbus-ds/segmented-control";

const meta: Meta<typeof ScrollPane> = {
  title: "Composite/ScrollPane",
  component: ScrollPane,
  argTypes: {
    showGradients: {
      control: { type: "boolean" },
      description: "Whether to show gradient overlays when content overflows",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    showArrows: {
      control: { type: "boolean" },
      description: "Whether to show navigation arrows for scrolling",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    showScrollbar: {
      control: { type: "boolean" },
      description: "Whether to show the scrollbar",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    direction: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: "The direction of the scroll",
      table: {
        defaultValue: { summary: "horizontal" },
      },
    },
    scrollToItemOnClick: {
      control: { type: "boolean" },
      description: "Whether items should scroll into view when clicked",
      table: {
        defaultValue: { summary: "true" },
      },
    },
  },
  decorators: [
    (Story) => (
      <Box padding="4">
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ScrollPane>;

// Default story with basic functionality
export const Default: Story = {
  args: {
    showGradients: true,
    showArrows: false,
    showScrollbar: false,
    direction: "horizontal",
    scrollToItemOnClick: true,
  },
  render: (args) => {
    const [selected, setSelected] = useState([0]);

    return (
      <Box width="400px">
        <ScrollPane {...args} height="100%" padding="2">
          <SegmentedControl
            selectedSegments={selected}
            onSegmentsSelect={setSelected}
          >
            {Array.from({ length: 8 }, (_, i) => (
              <ScrollPane.Item key={i} padding="1">
                <SegmentedControl.Button key={i} label={`Item ${i + 1}`}>
                  Item {i + 1}
                </SegmentedControl.Button>
              </ScrollPane.Item>
            ))}
          </SegmentedControl>
        </ScrollPane>
      </Box>
    );
  },
};

// Playground for interactive testing
export const Playground: Story = {
  args: {
    showGradients: true,
    showArrows: true,
    showScrollbar: true,
    direction: "horizontal",
    scrollToItemOnClick: true,
  },
  render: (args) => (
    <Box width="500px" height="300px">
      <ScrollPane {...args}>
        {Array.from({ length: 10 }, (_, i) => (
          <ScrollPane.Item key={i} minWidth="150px" padding="2">
            <Card padding="base">
              <Text fontSize="base" fontWeight="bold">
                Card {i + 1}
              </Text>
              <Text fontSize="caption" color="neutral-textLow">
                This is a sample card with some content that demonstrates the
                scroll functionality.
              </Text>
              <Button>Action</Button>
            </Card>
          </ScrollPane.Item>
        ))}
      </ScrollPane>
    </Box>
  ),
};

// Horizontal scroll with arrows
export const HorizontalWithArrows: Story = {
  args: {
    showGradients: true,
    showArrows: true,
    showScrollbar: false,
    direction: "horizontal",
    scrollToItemOnClick: false,
  },
  render: (args) => (
    <Box width="600px">
      <ScrollPane {...args}>
        {Array.from({ length: 12 }, (_, i) => (
          <ScrollPane.Item key={i} minWidth="140px" padding="2">
            <Card padding="small" backgroundColor="primary-surface">
              <Text color="primary-textHigh">Product {i + 1}</Text>
              <Text fontSize="caption" color="primary-textLow">
                $99.{String(i).padStart(2, "0")}
              </Text>
            </Card>
          </ScrollPane.Item>
        ))}
      </ScrollPane>
    </Box>
  ),
};

// Vertical scroll example
export const VerticalScroll: Story = {
  args: {
    showGradients: true,
    showArrows: true,
    showScrollbar: true,
    direction: "vertical",
  },
  render: (args) => (
    <Box height="300px" width="250px">
      <ScrollPane {...args}>
        {Array.from({ length: 8 }, (_, i) => (
          <ScrollPane.Item key={i} padding="2">
            <Card padding="base">
              <Text fontWeight="bold">Notification {i + 1}</Text>
              <Text fontSize="caption" color="neutral-textLow">
                This is a sample notification message that shows how vertical
                scrolling works in the ScrollPane component.
              </Text>
            </Card>
          </ScrollPane.Item>
        ))}
      </ScrollPane>
    </Box>
  ),
};

// Without gradients
export const WithoutGradients: Story = {
  args: {
    showGradients: false,
    showArrows: true,
    showScrollbar: true,
    direction: "horizontal",
  },
  render: (args) => (
    <Box width="400px">
      <ScrollPane {...args}>
        {Array.from({ length: 6 }, (_, i) => (
          <ScrollPane.Item key={i} minWidth="120px" padding="2">
            <Card padding="small" backgroundColor="success-surface">
              <Text color="success-textHigh">Success {i + 1}</Text>
            </Card>
          </ScrollPane.Item>
        ))}
      </ScrollPane>
    </Box>
  ),
};

// Hidden scrollbar
export const HiddenScrollbar: Story = {
  args: {
    showGradients: true,
    showArrows: false,
    showScrollbar: false,
    direction: "horizontal",
  },
  render: (args) => (
    <Box width="350px">
      <ScrollPane {...args}>
        {Array.from({ length: 7 }, (_, i) => (
          <ScrollPane.Item key={i} minWidth="100px" padding="2">
            <Card padding="small" backgroundColor="warning-surface">
              <Text color="warning-textHigh">Tag {i + 1}</Text>
            </Card>
          </ScrollPane.Item>
        ))}
      </ScrollPane>
    </Box>
  ),
};

// Large content example
export const LargeContent: Story = {
  args: {
    showGradients: true,
    showArrows: true,
    showScrollbar: false,
    direction: "vertical",
  },
  render: (args) => (
    <ScrollPane {...args} width="300px" scrollToItemOnClick={false}>
      <ScrollPane.Item padding="4" height="200px">
        <Card padding="base">
          <Text fontWeight="bold">Large Content Example</Text>
          <Text>
            This is an example of how the ScrollPane component can handle large
            content that needs to be scrolled. The component automatically
            detects when content overflows and shows the appropriate visual
            indicators.
          </Text>
          <Text>
            You can scroll through this content using the scrollbar, mouse
            wheel, touch gestures on mobile, or the navigation arrows if they
            are enabled.
          </Text>
          <Text>
            The gradient overlays provide a visual cue that there is more
            content available beyond the visible area. This helps users
            understand that they can scroll to see additional content.
          </Text>
          <Text>
            The ScrollPane component is fully responsive and works well on both
            desktop and mobile devices, adapting its behavior and visual
            elements based on the available space and user interaction
            capabilities.
          </Text>
        </Card>
      </ScrollPane.Item>
    </ScrollPane>
  ),
};

// Recipe: Navigation menu
export const NavigationMenu: Story = {
  name: "Recipe: Navigation Menu",
  args: {
    showGradients: true,
    showArrows: true,
    showScrollbar: false,
    direction: "horizontal",
  },
  render: (args) => (
    <Box width="100%" maxWidth="600px">
      <ScrollPane {...args}>
        {[
          "Dashboard",
          "Products",
          "Orders",
          "Customers",
          "Analytics",
          "Marketing",
          "Discounts",
          "Shipping",
          "Settings",
          "Apps",
          "Help",
        ].map((item, i) => (
          <ScrollPane.Item key={i} padding="1">
            <Button>{item}</Button>
          </ScrollPane.Item>
        ))}
      </ScrollPane>
    </Box>
  ),
};

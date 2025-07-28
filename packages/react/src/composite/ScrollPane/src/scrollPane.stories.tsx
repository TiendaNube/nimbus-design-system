import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Box } from "@nimbus-ds/box";
import { Card } from "@nimbus-ds/card";
import { Text } from "@nimbus-ds/text";
import { Button } from "@nimbus-ds/button";

import { IconButton } from "@nimbus-ds/icon-button";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@nimbus-ds/icons";
import { SegmentedControl } from "@nimbus-ds/segmented-control";
import { ScrollPane } from "./ScrollPane";

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
      <Box padding="4" maxWidth="450px">
        <Story />
      </Box>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ScrollPane>;

export const HorizontalCards: Story = {
  args: {
    showGradients: true,
    showArrows: true,
    showScrollbar: true,
    direction: "horizontal",
    scrollToItemOnClick: true,
    scrollPaneArrowStart: (
      <ScrollPane.ArrowHorizontalStart>
        <IconButton source={<ArrowLeftIcon />} />
      </ScrollPane.ArrowHorizontalStart>
    ),
    scrollPaneArrowEnd: (
      <ScrollPane.ArrowHorizontalEnd>
        <IconButton source={<ArrowRightIcon />} />
      </ScrollPane.ArrowHorizontalEnd>
    ),
  },
  argTypes: {
    scrollPaneArrowStart: {
      control: { disable: true },
    },
    scrollPaneArrowEnd: {
      control: { disable: true },
    },
    direction: {
      control: { disable: true },
    },
  },
  render: (args) => (
    <ScrollPane {...args}>
      {Array.from({ length: 10 }, (_, i) => (
        <ScrollPane.Item key={i} padding="2">
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
  ),
};

export const ScrollableSegmentedControls: Story = {
  args: {
    showGradients: true,
    showArrows: false,
    showScrollbar: false,
    direction: "horizontal",
    scrollPaneArrowStart: (
      <ScrollPane.ArrowHorizontalStart>
        <IconButton source={<ArrowLeftIcon />} />
      </ScrollPane.ArrowHorizontalStart>
    ),
    scrollPaneArrowEnd: (
      <ScrollPane.ArrowHorizontalEnd>
        <IconButton source={<ArrowRightIcon />} />
      </ScrollPane.ArrowHorizontalEnd>
    ),
  },
  render: (args) => (
    <ScrollPane {...args}>
      <SegmentedControl>
        {Array.from({ length: 10 }, (_, i) => (
          <ScrollPane.Item key={i}>
            <SegmentedControl.Button value={i} label={`Button ${i + 1}`}>
              Button {i + 1}
            </SegmentedControl.Button>
          </ScrollPane.Item>
        ))}
      </SegmentedControl>
    </ScrollPane>
  ),
};

export const VerticalScroll: Story = {
  args: {
    showGradients: true,
    showArrows: true,
    showScrollbar: true,
    direction: "vertical",
    scrollPaneArrowStart: (
      <ScrollPane.ArrowVerticalStart>
        <IconButton source={<ChevronUpIcon />} />
      </ScrollPane.ArrowVerticalStart>
    ),
    scrollPaneArrowEnd: (
      <ScrollPane.ArrowVerticalEnd>
        <IconButton source={<ChevronDownIcon />} />
      </ScrollPane.ArrowVerticalEnd>
    ),
  },
  argTypes: {
    scrollPaneArrowStart: {
      control: { disable: true },
    },
    scrollPaneArrowEnd: {
      control: { disable: true },
    },
    direction: {
      control: { disable: true },
    },
  },
  render: (args) => (
    <ScrollPane
      {...args}
      display="flex"
      flexDirection="column"
      maxHeight="200px"
    >
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
  ),
};

export const CardLargeContent: Story = {
  args: {
    showGradients: true,
    showArrows: false,
    showScrollbar: false,
    direction: "vertical",
  },
  argTypes: {
    scrollPaneArrowStart: {
      control: { disable: true },
    },
    scrollPaneArrowEnd: {
      control: { disable: true },
    },
    direction: {
      control: { disable: true },
    },
    showArrows: {
      control: { disable: true },
    },
  },
  render: (args) => (
    <Card padding="base">
      <ScrollPane {...args} scrollToItemOnClick={false}>
        <ScrollPane.Item padding="4" height="200px">
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
        </ScrollPane.Item>
      </ScrollPane>
    </Card>
  ),
};

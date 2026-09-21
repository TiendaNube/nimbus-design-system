import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@nimbus-ds/text";

import { Breadcrumb, type BreadcrumbItem } from "./component";

const sampleItems: BreadcrumbItem[] = [
  { label: "Store", href: "#" },
  { label: "Settings", href: "#" },
  { label: "Shipping", href: "#" },
  { label: "Carriers", href: "#" },
  { label: "Correo Argentino" },
];

const meta: Meta<typeof Breadcrumb> = {
  title: "Prototypes/Exploration553",
  component: Breadcrumb,
  args: {
    items: sampleItems,
  },
  argTypes: {
    separator: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Playground: Story = {
  args: {
    items: sampleItems,
  },
};

export const Collapsed: Story = {
  name: "Collapsed (maxVisible)",
  args: {
    items: sampleItems,
    maxVisible: 3,
  },
};

export const SlashSeparator: Story = {
  name: "Alternate separator (slash)",
  args: {
    items: sampleItems,
    separator: (
      <Text as="span" color="neutral-textDisabled">
        /
      </Text>
    ),
  },
};

export const TwoLevels: Story = {
  name: "Two levels (no separator needed for maxVisible)",
  args: {
    items: sampleItems.slice(-2),
  },
};

export const FullScreen: Story = {
  name: "Full screen",
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
  },
  args: {
    items: sampleItems,
    maxVisible: 3,
  },
};

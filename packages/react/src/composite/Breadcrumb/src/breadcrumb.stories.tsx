import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Breadcrumb } from "./Breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "Composite/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

const items = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Categories", href: "#categories" },
  { label: "Shirts", href: "#shirts" },
  { label: "Summer collection" }
];

export const Basic: Story = {
  args: {
    label: "Breadcrumb",
    hiddenLevelsLabel: "Show hidden levels",
    items
  }
};

export const Collapsed: Story = {
  render: (args) => (
    <Box width="260px">
      <Breadcrumb {...args} />
    </Box>
  ),
  args: {
    label: "Breadcrumb",
    hiddenLevelsLabel: "Show hidden levels",
    items
  }
};

export const LongCurrentLevel: Story = {
  render: (args) => (
    <Box width="180px">
      <Breadcrumb {...args} />
    </Box>
  ),
  args: {
    label: "Breadcrumb",
    hiddenLevelsLabel: "Show hidden levels",
    items: [
      ...items.slice(0, 2),
      { label: "A current level with a very long label that does not fit" }
    ]
  }
};

export const SingleLevel: Story = {
  args: {
    label: "Breadcrumb",
    hiddenLevelsLabel: "Show hidden levels",
    items: [{ label: "Home" }]
  }
};

// Stands in for a router link component such as react-router's Link.
const RouterLink = ({
  to,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) => (
  <a data-to={to} {...props}>
    {children}
  </a>
);

export const RouterLinks: Story = {
  render: (args) => (
    <Box width="260px">
      <Breadcrumb {...args} as={RouterLink} />
    </Box>
  ),
  args: {
    label: "Breadcrumb",
    hiddenLevelsLabel: "Show hidden levels",
    items: items.map((item) => ({
      ...item,
      linkProps: { to: item.href }
    }))
  }
};

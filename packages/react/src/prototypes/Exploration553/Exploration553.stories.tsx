import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Card } from "@nimbus-ds/card";
import { Title } from "@nimbus-ds/title";
import { Text } from "@nimbus-ds/text";
import { Tabs } from "@nimbus-ds/tabs";

import { Breadcrumb, type BreadcrumbItem } from "./Exploration553";

const DEEP_HIERARCHY: BreadcrumbItem[] = [
  { label: "Store", href: "#store" },
  { label: "Settings", href: "#settings" },
  { label: "Shipping", href: "#shipping" },
  { label: "Carriers", href: "#carriers" },
  { label: "Zones", href: "#zones" },
  { label: "Buenos Aires" },
];

interface PageDemoProps {
  initialItems: BreadcrumbItem[];
  maxVisible?: number;
}

const PageDemo: React.FC<PageDemoProps> = ({ initialItems, maxVisible }) => {
  const [path, setPath] = useState(initialItems);

  return (
    <Box
      padding="4"
      display="flex"
      flexDirection="column"
      gap="4"
      maxWidth="480px"
    >
      <Breadcrumb
        items={path}
        maxVisible={maxVisible}
        onNavigate={(_item, index) => setPath(initialItems.slice(0, index + 1))}
      />
      <Card>
        <Card.Header>
          <Title as="h3">{path[path.length - 1].label}</Title>
        </Card.Header>
        <Card.Body>
          <Text>
            Current position: &quot;
            {path.map((item) => item.label).join(" / ")}&quot;. Activate any
            ancestor level in the breadcrumb above to navigate back to it.
          </Text>
        </Card.Body>
      </Card>
    </Box>
  );
};

/**
 * Zone-scoped path, distinct from the peer views switched by the Nav Tabs
 * below: the breadcrumb answers "where am I in the hierarchy" (Store >
 * Settings > Shipping > Zones > Buenos Aires), the tabs answer "which view
 * of this zone am I looking at" (Coverage / Rates). Neither list repeats
 * the other's choices.
 */
const ZONE_PATH: BreadcrumbItem[] = [
  { label: "Store", href: "#store" },
  { label: "Settings", href: "#settings" },
  { label: "Shipping", href: "#shipping" },
  { label: "Zones", href: "#zones" },
  { label: "Buenos Aires" },
];

/**
 * Composition demo answering the coexistence question: Breadcrumb stacked
 * above Tabs (the Nav Tabs pattern's underlying component) with a Nimbus
 * spacing token (Box gap="4") between them. Neither component is replaced
 * by the other; each keeps its own selection state.
 */
const WithNavTabsDemo: React.FC = () => {
  const [path, setPath] = useState(ZONE_PATH);
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Box
      padding="4"
      display="flex"
      flexDirection="column"
      gap="4"
      maxWidth="480px"
    >
      <Breadcrumb
        items={path}
        onNavigate={(_item, index) => setPath(ZONE_PATH.slice(0, index + 1))}
      />
      <Tabs selected={selectedTab} onTabSelect={setSelectedTab} fullWidth>
        <Tabs.Item label="Coverage">
          <Box
            borderColor="neutral-interactive"
            borderStyle="dashed"
            borderWidth="1"
            padding="2"
          >
            <Text fontSize="base" textAlign="center">
              Coverage settings for &quot;{path[path.length - 1].label}
              &quot;.
            </Text>
          </Box>
        </Tabs.Item>
        <Tabs.Item label="Rates">
          <Box
            borderColor="neutral-interactive"
            borderStyle="dashed"
            borderWidth="1"
            padding="2"
          >
            <Text fontSize="base" textAlign="center">
              Shipping rates for this zone.
            </Text>
          </Box>
        </Tabs.Item>
      </Tabs>
    </Box>
  );
};

const meta: Meta<typeof PageDemo> = {
  title: "Prototypes/Exploration553",
  component: PageDemo,
  argTypes: {
    maxVisible: { control: { type: "number", min: 3, max: 8 } },
  },
};

export default meta;

type Story = StoryObj<typeof PageDemo>;

export const Playground: Story = {
  args: {
    initialItems: DEEP_HIERARCHY,
    maxVisible: 4,
  },
};

export const FullScreen: Story = {
  name: "Full screen",
  parameters: { layout: "fullscreen" },
  args: {
    initialItems: DEEP_HIERARCHY,
    maxVisible: 4,
  },
  argTypes: {
    maxVisible: { control: false },
  },
};

export const WithNavTabs: Story = {
  name: "With Nav Tabs",
  args: {
    initialItems: ZONE_PATH,
  },
  argTypes: {
    maxVisible: { control: false },
  },
  render: () => <WithNavTabsDemo />,
};

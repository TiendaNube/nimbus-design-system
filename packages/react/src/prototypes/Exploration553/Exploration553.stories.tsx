import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Card } from "@nimbus-ds/card";
import { Title } from "@nimbus-ds/title";
import { Text } from "@nimbus-ds/text";

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

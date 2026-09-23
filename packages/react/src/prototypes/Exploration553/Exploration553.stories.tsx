import React, { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Card } from "@nimbus-ds/card";
import { Text } from "@nimbus-ds/text";
import { Title } from "@nimbus-ds/title";

import { Breadcrumb, type BreadcrumbItemData } from "./Exploration553";

/**
 * Fixed 5-level mock hierarchy standing in for a real admin navigation tree.
 * Public-safe sample data only; no real store or customer content.
 */
const FULL_PATH: BreadcrumbItemData[] = [
  { id: "home", label: "Panel de administración" },
  { id: "catalog", label: "Catálogo" },
  { id: "products", label: "Productos" },
  { id: "product", label: "Zapatillas urbanas" },
  { id: "edit", label: "Editar producto" },
];

interface NavigationDemoProps {
  /** How many levels deep the person starts at (0 = home, 4 = deepest mock page). */
  startDepth: number;
  /** Simulated "how many crumbs fit" budget for the collapsing experiment. */
  maxVisible: number;
  /** Simulated small-viewport mode — this prototype cannot read a real breakpoint. */
  compact: boolean;
}

const NavigationDemo: React.FC<NavigationDemoProps> = ({
  startDepth,
  maxVisible,
  compact,
}) => {
  const [depth, setDepth] = useState(startDepth);

  // Re-sync when a Storybook control changes so each control combination
  // starts from its own requested depth.
  useEffect(() => {
    setDepth(startDepth);
  }, [startDepth]);

  const items = FULL_PATH.slice(0, depth + 1);
  const current = FULL_PATH[depth];

  const handleNavigate = (id: string) => {
    const index = FULL_PATH.findIndex((item) => item.id === id);
    if (index >= 0) setDepth(index);
  };

  return (
    <Box display="flex" flexDirection="column" gap="4" padding="6">
      <Breadcrumb
        items={items}
        onNavigate={handleNavigate}
        maxVisible={maxVisible}
        compact={compact}
      />
      <Card>
        <Card.Header>
          <Title as="h3">{current.label}</Title>
        </Card.Header>
        <Card.Body>
          <Text>
            Mock page content for “{current.label}”. Clicking an earlier
            crumb above simulates returning to that level; this card updates
            to show the resulting position.
          </Text>
        </Card.Body>
      </Card>
    </Box>
  );
};

NavigationDemo.displayName = "Exploration553NavigationDemo";

const meta: Meta<typeof NavigationDemo> = {
  title: "Prototypes/Exploration553",
  component: NavigationDemo,
  argTypes: {
    startDepth: {
      control: { type: "range", min: 0, max: FULL_PATH.length - 1, step: 1 },
      description:
        "Simulated starting depth in the mock hierarchy (0 = home, 4 = deepest page). Not a real prop of the experiment — a story-only way to explore path length.",
    },
    maxVisible: {
      control: { type: "range", min: 2, max: FULL_PATH.length, step: 1 },
      description:
        "Simulated 'how many crumbs fit' budget. A real component would measure this from container width; here it is a manual stand-in so the collapsing behavior can be tried at every length.",
    },
    compact: {
      control: { type: "boolean" },
      description:
        "Simulated small-viewport mode. This prototype cannot read a real CSS breakpoint, so a toggle stands in for 'on mobile'.",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NavigationDemo>;

export const Playground: Story = {
  args: {
    startDepth: FULL_PATH.length - 1,
    maxVisible: 4,
    compact: false,
  },
};

export const FullScreen: Story = {
  name: "Full screen",
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
  },
  args: {
    startDepth: FULL_PATH.length - 1,
    maxVisible: 4,
    compact: false,
  },
};

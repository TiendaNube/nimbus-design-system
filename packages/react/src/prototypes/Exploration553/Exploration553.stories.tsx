import React, { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Title } from "@nimbus-ds/title";
import { Text } from "@nimbus-ds/text";
import { Link } from "@nimbus-ds/link";

import { Breadcrumb, type BreadcrumbItem } from "./Exploration553";

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

const tree: TreeNode = {
  id: "root",
  label: "Store",
  children: [
    {
      id: "settings",
      label: "Settings",
      children: [
        {
          id: "shipping",
          label: "Shipping",
          children: [
            {
              id: "carriers",
              label: "Carriers",
              children: [
                {
                  id: "correo-ar",
                  label: "Correo Argentino",
                  children: [
                    { id: "zones", label: "Delivery zones" },
                    { id: "rates", label: "Rates" },
                  ],
                },
                { id: "oca", label: "OCA" },
              ],
            },
            { id: "pickup", label: "Pickup points" },
          ],
        },
        { id: "payments", label: "Payments" },
      ],
    },
    {
      id: "catalog",
      label: "Catalog",
      children: [
        { id: "products", label: "Products" },
        { id: "categories", label: "Categories" },
      ],
    },
  ],
};

interface FlatNode {
  id: string;
  label: string;
  parentId: string | null;
  children: TreeNode[];
}

function flatten(
  node: TreeNode,
  parentId: string | null,
  acc: Record<string, FlatNode>
): Record<string, FlatNode> {
  acc[node.id] = {
    id: node.id,
    label: node.label,
    parentId,
    children: node.children ?? [],
  };
  (node.children ?? []).forEach((child) => flatten(child, node.id, acc));
  return acc;
}

const flatTree = flatten(tree, null, {});

function ancestryOf(id: string): FlatNode[] {
  const chain: FlatNode[] = [];
  let cursor: string | null = id;
  while (cursor) {
    const node: FlatNode = flatTree[cursor];
    chain.unshift(node);
    cursor = node.parentId;
  }
  return chain;
}

interface BreadcrumbDemoProps {
  containerWidth?: number;
  fullScreen?: boolean;
}

const BreadcrumbDemo: React.FC<BreadcrumbDemoProps> = ({
  containerWidth = 360,
  fullScreen = false,
}) => {
  const [currentId, setCurrentId] = useState("zones");

  const ancestry = useMemo(() => ancestryOf(currentId), [currentId]);
  const current = flatTree[currentId];

  const items: BreadcrumbItem[] = ancestry.map((node) => ({
    id: node.id,
    label: node.label,
    onNavigate: () => setCurrentId(node.id),
  }));

  return (
    <Box
      padding={fullScreen ? "6" : "4"}
      display="flex"
      flexDirection="column"
      gap="4"
    >
      {!fullScreen && (
        <Text as="p" fontSize="caption" color="neutral-textLow">
          Simulated available width: {containerWidth}px. Use the
          "containerWidth" control to shrink it, like a narrow mobile
          viewport, and watch the path collapse to keep the breadcrumb on a
          single line with the current level always visible. Try tabbing to
          the "…" trigger and pressing Enter/Space to open the hidden-levels
          menu, then Escape to close it.
        </Text>
      )}
      <Box
        width={fullScreen ? "100%" : `${containerWidth}px`}
        maxWidth="100%"
      >
        <Breadcrumb items={items} />
      </Box>
      <Title as="h3">{current.label}</Title>
      {current.children.length > 0 ? (
        <Box display="flex" flexDirection="column" gap="2" role="list">
          {current.children.map((child) => (
            <Box key={child.id} role="listitem">
              <Link
                as="button"
                type="button"
                appearance="primary"
                textDecoration="none"
                onClick={() => setCurrentId(child.id)}
              >
                {child.label}
              </Link>
            </Box>
          ))}
        </Box>
      ) : (
        <Text color="neutral-textLow">
          This level has no further pages. Use the breadcrumb above to go
          back.
        </Text>
      )}
    </Box>
  );
};

const meta: Meta<typeof BreadcrumbDemo> = {
  title: "Prototypes/Exploration553",
  component: BreadcrumbDemo,
  args: {
    containerWidth: 360,
  },
  argTypes: {
    containerWidth: {
      control: { type: "range", min: 200, max: 900, step: 20 },
    },
    fullScreen: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof BreadcrumbDemo>;

export const Playground: Story = {};

export const FullScreen: Story = {
  name: "Full screen",
  args: {
    fullScreen: true,
  },
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
  },
};

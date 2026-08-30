import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { OrderConfirmInline } from "./OrderConfirmInline";

/**
 * DISPOSABLE NIMBUS PROTOTYPE — Prototypes/OrderConfirmInline
 *
 * Slug: order-confirm-inline · Owner: Harry Barzola
 *
 * Learning question: reviewing an order, is the inline "Confirm order"
 * action — and the outcome once it's done — clear enough to a Tiendanube
 * Admin user, without leaving the order screen?
 *
 * See packages/react/src/prototypes/README.md for the Playground's mechanics
 * and the pull request description for mocked data / simulated behavior.
 */
const meta: Meta<typeof OrderConfirmInline> = {
  title: "Prototypes/OrderConfirmInline",
  component: OrderConfirmInline,
  argTypes: {
    initialStatus: {
      control: { type: "select" },
      options: ["reviewing", "confirming", "loading", "confirmed"],
      description:
        "Jump to a later step of the flow without clicking through it.",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Disposable prototype. Order data, the confirm action, and the customer notification are all mocked/simulated — see the pull request for the full list.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof OrderConfirmInline>;

/**
 * Internal working view — use the `initialStatus` control to inspect any
 * step of the flow (pending review, the inline confirm step, the loading
 * moment, or the confirmed outcome) without re-clicking through it.
 */
export const Playground: Story = {
  args: {
    initialStatus: "reviewing",
  },
  render: (args) => (
    <Box display="flex" flexDirection="column" gap="4">
      <Box paddingX="6" paddingTop="4">
        <Text color="neutral-textLow" fontSize="caption">
          Internal Playground view — use the &quot;initialStatus&quot;
          control above to jump between steps. Mocked order data, no real
          backend call.
        </Text>
      </Box>
      <OrderConfirmInline {...args} />
    </Box>
  ),
};

/**
 * Shareable experience for the usability pilot — always starts from the
 * order review step, exactly like a Tiendanube Admin user would land on it.
 */
export const FullScreen: Story = {
  storyName: "Full screen",
  args: {
    initialStatus: "reviewing",
  },
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
  },
};

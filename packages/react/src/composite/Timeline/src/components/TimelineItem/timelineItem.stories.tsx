import type { Meta, StoryObj } from "@storybook/react";
import { Timeline, TimelineItemData } from "../..";

const dataItem: TimelineItemData = {
  happenedAt: "2024-08-20T19:50:53+00:00",
  type: "order-fulfillment",
  action: "fulfilled",
  userName: "Bárbara de Tiendanube",
};

const meta: Meta<typeof Timeline.Item> = {
  title: "Composite/Timeline/Timeline.Item",
  component: Timeline.Item,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Timeline.Item>;

export const basic: Story = {
  args: {
    ...dataItem,
  },
};

export const noIcon: Story = {
  args: {
    happenedAt: "2024-08-20T19:52:53+00:00",
    type: "transaction-event",
    action: "pending",
    userName: null,
  },
};

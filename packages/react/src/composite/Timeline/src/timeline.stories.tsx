import type { Meta, StoryObj } from "@storybook/react";
import { Timeline, TimelineItemData } from ".";

const data: TimelineItemData[] = [
  {
    happenedAt: "2024-08-20T19:50:53+00:00",
    type: "order-fulfillment",
    action: "fulfilled",
    userName: "Bárbara de Tiendanube",
  },
  {
    happenedAt: "2024-08-20T19:50:47+00:00",
    type: "order-fulfillment",
    action: "unfulfilled",
    userName: "Bárbara de Tiendanube",
  },
  {
    happenedAt: "2024-08-20T19:49:14+00:00",
    type: "order-payment",
    action: "paid",
    userName: "Bárbara de Tiendanube",
  },
  {
    happenedAt: "2024-08-20T19:49:03+00:00",
    type: "transaction-event",
    action: "pending",
    userName: null,
  },
];

const meta: Meta<typeof Timeline> = {
  title: "Composite/Timeline",
  component: Timeline,
  argTypes: {
    timelineData: data,
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Timeline>;

export const basic: Story = {
  args: {
    timelineData: data,
  },
};

export const emptyData: Story = {
  args: {},
};

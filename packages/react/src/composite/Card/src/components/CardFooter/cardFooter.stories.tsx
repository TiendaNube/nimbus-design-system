import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@nimbus-ds/button";
import { Card } from "../../Card";

const meta: Meta<typeof Card.Footer> = {
  title: "Composite/Card/Card.Footer",
  component: Card.Footer,
  render: (args) => (
    <Card>
      <Card.Header title="Title" />
      <Card.Footer {...args} />
    </Card>
  ),
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card.Body>;

export const basic: Story = {
  args: {
    children: (
      <>
        <Button appearance="neutral">Button</Button>
        <Button appearance="primary">Button</Button>
      </>
    ),
  },
};

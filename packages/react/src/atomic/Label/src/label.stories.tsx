import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BoxPackedIcon } from "@nimbus-ds/icons";
import { Icon } from "@nimbus-ds/icon";
import { Label } from "./Label";

const meta: Meta<typeof Label> = {
  title: "Atomic/Label",
  component: Label,
  argTypes: {
    children: { control: { type: "text" } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const basic: Story = {
  args: {
    children: (
      <>
        <Icon source={<BoxPackedIcon />} />
        Label text:
      </>
    ),
  },
};

export const hidden: Story = {
  args: {
    hidden: true,
    children: (
      <>
        <Icon source={<BoxPackedIcon />} />
        Label text:
      </>
    ),
  },
};

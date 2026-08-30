import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PlaygroundSmoke } from "./PlaygroundSmoke";

const meta: Meta<typeof PlaygroundSmoke> = {
  title: "Prototypes/Playground smoke",
  component: PlaygroundSmoke,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof PlaygroundSmoke>;

export const Playground: Story = {
  args: {
    initialConfirmed: false,
  },
};

export const FullScreen: Story = {
  name: "Full screen",
  args: {
    fullScreen: true,
    initialConfirmed: false,
  },
  parameters: {
    layout: "fullscreen",
    controls: {
      disable: true,
    },
  },
};

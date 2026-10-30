import type { Meta, StoryObj } from "@storybook/react";

import { Exploration553 } from "./Exploration553";

const meta: Meta<typeof Exploration553> = {
  title: "Prototypes/Exploration553",
  component: Exploration553,
};

export default meta;

type Story = StoryObj<typeof Exploration553>;

export const Playground: Story = {
  args: { narrow: false, maxVisible: 4 },
};

export const FullScreen: Story = {
  name: "Full screen",
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
  },
  args: { narrow: false, maxVisible: 4 },
};

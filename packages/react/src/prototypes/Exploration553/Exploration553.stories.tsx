import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Exploration553 } from "./Exploration553";

const sampleItems = [
  { label: "Panel de administración", href: "#" },
  { label: "Productos", href: "#" },
  { label: "Categorías", href: "#" },
  { label: "Ropa de invierno", href: "#" },
  { label: "Camperas de invierno" },
];

const meta: Meta<typeof Exploration553> = {
  title: "Prototypes/Exploration553",
  component: Exploration553,
  argTypes: {
    items: { control: false },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Exploration553>;

export const Playground: Story = {
  args: {
    items: sampleItems,
    collapseOnMobile: true,
  },
};

export const FullScreen: Story = {
  name: "Full screen",
  args: {
    items: sampleItems,
    collapseOnMobile: true,
  },
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
  },
};

import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { thumbnail } from "@nimbus-ds/styles";

import { Thumbnail } from "./Thumbnail";

export default {
  title: "Atomic/Thumbnail",
  component: Thumbnail,
  subcomponents: { "Thumbnail.Skeleton": Thumbnail.Skeleton },
  argTypes: {
    children: { control: { disable: true } },
    aspectRatio: {
      control: { type: "radio" },
      options: thumbnail.properties.aspectRatio,
    },
  },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Thumbnail>;

const Template: ComponentStory<typeof Thumbnail> = (args) => (
  <Thumbnail {...args} />
);
const SkeletonTemplate: ComponentStory<typeof Thumbnail.Skeleton> = (args) => (
  <Thumbnail.Skeleton {...args} />
);

export const base = Template.bind({});
base.args = {
  width: "104px",
  src: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=943&q=80",
};

export const emnpty = Template.bind({});
emnpty.args = {
  width: "104px",
};

export const skeleton = SkeletonTemplate.bind({});
skeleton.args = {};

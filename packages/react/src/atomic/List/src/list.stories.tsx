import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { List } from "./List";

export default {
  title: "Atomic/List",
  component: List,
  subcomponents: {
    "List.SkeletonItem": List.SkeletonItem,
    "List.Skeleton": List.Skeleton,
  },
  argTypes: {
    children: { control: { disable: true } },
  },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof List>;

const Template: ComponentStory<typeof List> = (args) => (
  <List {...args}>
    <List.Item>Aliquam vitae eleifend nulla. Duis</List.Item>
    <List.Item>Nullam malesuada sapien sit amet</List.Item>
    <List.Item>Vivamus diam eros, pretium a</List.Item>
    <List.Item>Mauris ut feugiat quam. Fusce</List.Item>
    <List.Item>Duis leo orci, consectetur pulvinar</List.Item>
  </List>
);
const SkeletonTemplate: ComponentStory<typeof List.Skeleton> = (args) => (
  <List.Skeleton>
    <List.SkeletonItem {...args} />
    <List.SkeletonItem {...args} />
    <List.SkeletonItem {...args} />
    <List.SkeletonItem {...args} />
    <List.SkeletonItem {...args} />
  </List.Skeleton>
);

export const unordered = Template.bind({});
unordered.args = {
  as: "ul",
};

export const ordered = Template.bind({});
ordered.args = {
  as: "ol",
};

export const skeleton = SkeletonTemplate.bind({});
skeleton.args = {};

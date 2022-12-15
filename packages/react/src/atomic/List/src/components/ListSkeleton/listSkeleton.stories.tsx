import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { ListSkeletonItem } from "../ListSkeletonItem";
import { ListSkeleton } from "./ListSkeleton";

export default {
  title: "Skeleton/List",
  component: ListSkeletonItem,
  ListSkeleton,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof ListSkeletonItem>;

const Template: ComponentStory<typeof ListSkeleton> = (args) => (
  <ListSkeleton>
    <ListSkeletonItem {...args} />
    <ListSkeletonItem {...args} />
    <ListSkeletonItem {...args} />
    <ListSkeletonItem {...args} />
    <ListSkeletonItem {...args} />
  </ListSkeleton>
);

export const List = Template.bind({});
List.args = {};

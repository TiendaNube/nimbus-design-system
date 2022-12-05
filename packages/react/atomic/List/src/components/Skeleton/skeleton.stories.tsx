import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { SkeletonItem } from "../SkeletonItem";
import { Skeleton } from "./Skeleton";

export default {
  title: "Skeleton/List",
  component: SkeletonItem,
  Skeleton,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof SkeletonItem>;

const Template: ComponentStory<typeof Skeleton> = (args) => (
  <Skeleton>
    <SkeletonItem {...args} />
    <SkeletonItem {...args} />
    <SkeletonItem {...args} />
    <SkeletonItem {...args} />
    <SkeletonItem {...args} />
  </Skeleton>
);

export const List = Template.bind({});
List.args = {};

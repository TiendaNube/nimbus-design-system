import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { SelectSkeleton } from "./SelectSkeleton";

export default {
  title: "Skeleton/Select",
  component: SelectSkeleton,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof SelectSkeleton>;

const Template: ComponentStory<typeof SelectSkeleton> = (args) => (
  <SelectSkeleton {...args} />
);

export const select = Template.bind({});
select.args = {};

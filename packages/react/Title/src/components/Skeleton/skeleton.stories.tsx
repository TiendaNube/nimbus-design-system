import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { Skeleton } from "./Skeleton";

export default {
  title: "Atomic/Title/Title.Skeleton",
  component: Skeleton,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => (
  <Skeleton {...args} />
);

export const h1 = Template.bind({});
h1.args = {
  as: "h1",
};

export const h2 = Template.bind({});
h2.args = {
  as: "h2",
};

export const h3 = Template.bind({});
h3.args = {
  as: "h3",
};

export const h4 = Template.bind({});
h4.args = {
  as: "h4",
};

export const h5 = Template.bind({});
h5.args = {
  as: "h5",
};

export const h6 = Template.bind({});
h6.args = {
  as: "h6",
};

import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { Title } from "@nimbus/react-title";

export default {
  title: "Atomic/Title",
  component: Title,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />;

export const h1 = Template.bind({});
h1.args = {
  as: "h1",
  children: "Lorem ipsum dolor sit amet",
};

export const h2 = Template.bind({});
h2.args = {
  as: "h2",
  children: "Lorem ipsum dolor sit amet",
};

export const h3 = Template.bind({});
h3.args = {
  as: "h3",
  children: "Lorem ipsum dolor sit amet",
};

export const h4 = Template.bind({});
h4.args = {
  as: "h4",
  children: "Lorem ipsum dolor sit amet",
};

export const h5 = Template.bind({});
h5.args = {
  as: "h5",
  children: "Lorem ipsum dolor sit amet",
};

export const h6 = Template.bind({});
h6.args = {
  as: "h6",
  children: "Lorem ipsum dolor sit amet",
};
